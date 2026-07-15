import { Contract, getAddress, type Signer } from 'ethers';
import { ACTION_MANAGER_ABI } from '../abis/actionManager';
import { ERC20_ABI } from '../abis/erc20';
import { DeriveTimeoutError } from '../errors';
import { toScaled, type DecimalLike } from '../signing/encoding';
import type { ClientContext } from './context';

/**
 * Deposits are NOT signed actions in v3. Funds enter through one of two
 * deliberately distinct flows — pick explicitly:
 *
 * - `deposits.contractCall.*` — self-custody: YOUR wallet sends the
 *   on-chain ActionManager transaction (approve + deposit); you provide
 *   an ethers Signer connected to the chain RPC.
 * - `deposits.depositAddress.*` — CEX-style: register a deterministic
 *   deposit address, send funds to it from anywhere, and the exchange
 *   sweeps and credits them asynchronously.
 *
 * `getHistory` and `awaitCredited` cover both flows.
 */
export class DepositsApi {
  readonly contractCall: ContractCallDeposits;
  readonly depositAddress: DepositAddressDeposits;

  constructor(private readonly ctx: ClientContext) {
    this.contractCall = new ContractCallDeposits(ctx);
    this.depositAddress = new DepositAddressDeposits(ctx);
  }

  /**
   * Deposit history rows (up to 1000), regardless of which flow funded
   * them. Scoped to one subaccount when `subaccountId` is given,
   * otherwise to the whole owner wallet. Timestamps are unix milliseconds.
   */
  async getHistory(options: { subaccountId?: number; startTimestampMs?: number; endTimestampMs?: number } = {}) {
    return this.ctx.send('private/get_deposit_history', {
      subaccount_id: options.subaccountId,
      wallet: options.subaccountId === undefined ? this.ctx.credentials().ownerAddress : undefined,
      start_timestamp: options.startTimestampMs,
      end_timestamp: options.endTimestampMs,
    });
  }

  /**
   * Polls `private/get_subaccounts` until a subaccount id outside
   * `knownSubaccountIds` appears — the signal that a deposit creating a
   * new subaccount (either flow) was credited — and returns the new id.
   * Snapshot the ids BEFORE initiating the deposit.
   */
  async awaitCredited(params: {
    knownSubaccountIds: number[];
    timeoutMs?: number;
    pollIntervalMs?: number;
  }): Promise<number> {
    const { knownSubaccountIds, timeoutMs = 120_000, pollIntervalMs = 2_000 } = params;
    const known = new Set(knownSubaccountIds);
    const wallet = this.ctx.credentials().ownerAddress;
    const deadline = Date.now() + timeoutMs;
    for (;;) {
      const { subaccount_ids } = await this.ctx.send('private/get_subaccounts', { wallet });
      const credited = subaccount_ids.find((id) => !known.has(id));
      if (credited !== undefined) return credited;
      if (Date.now() >= deadline) {
        throw new DeriveTimeoutError(`deposit not credited within ${timeoutMs}ms — no new subaccount for ${wallet}`);
      }
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }
  }
}

export interface ContractCallDepositBase {
  /** Caller-provided ethers signer connected to the chain RPC (the SDK holds no provider). */
  signer: Signer;
  /** Protocol asset label the deposit credits (see abis/actionManager.ts), NOT the ERC-20. */
  asset: string;
  /** Underlying ERC-20 to approve and pull funds from. Defaults to the network's USDC. */
  erc20?: string;
  /**
   * Amount in human units — scaled by the ERC-20's on-chain `decimals()`
   * (USDC = 6) — or a bigint of already-raw token units.
   */
  amount: DecimalLike;
}

/**
 * Self-custody deposits: the caller's wallet signs on-chain
 * ActionManager transactions directly.
 */
export class ContractCallDeposits {
  constructor(private readonly ctx: ClientContext) {}

  /**
   * Approves (if needed) and deposits into an existing subaccount.
   * `fallbackRecipient` (default: the signer) receives the funds into
   * its fallback subaccount if the deposit cannot be applied.
   * Resolves once the transaction is mined — crediting happens
   * asynchronously once the deposit is observed on-chain.
   */
  async deposit(
    params: ContractCallDepositBase & { subaccountId: number; fallbackRecipient?: string },
  ): Promise<{ txHash: string }> {
    const { actionManager, amountRaw } = await this.approveForDeposit(params);
    const fallback = getAddress(params.fallbackRecipient ?? (await params.signer.getAddress()));
    const tx = await actionManager.getFunction('deposit')(
      getAddress(params.asset),
      amountRaw,
      params.subaccountId,
      fallback,
    );
    await tx.wait();
    return { txHash: tx.hash as string };
  }

  /**
   * Approves (if needed) and deposits into a NEW subaccount under
   * `managerId`, owned by `owner` (default: the signer). The exchange
   * assigns the subaccount id asynchronously — discover it with
   * `deposits.awaitCredited` against a pre-deposit snapshot of the
   * owner's ids.
   */
  async depositToNewSubaccount(
    params: ContractCallDepositBase & { managerId: number; owner?: string },
  ): Promise<{ txHash: string }> {
    const { actionManager, amountRaw } = await this.approveForDeposit(params);
    const owner = getAddress(params.owner ?? (await params.signer.getAddress()));
    const tx = await actionManager.getFunction('depositToNewSubaccount')(
      getAddress(params.asset),
      amountRaw,
      params.managerId,
      owner,
    );
    await tx.wait();
    return { txHash: tx.hash as string };
  }

  /** Scales the amount, then ensures the ActionManager may pull it from the ERC-20. */
  private async approveForDeposit(
    params: ContractCallDepositBase,
  ): Promise<{ actionManager: Contract; amountRaw: bigint }> {
    const managerAddress = this.ctx.network.contracts.actionManager;
    if (!managerAddress) {
      throw new Error(
        `network '${this.ctx.network.name}' has no actionManager contract configured — ` +
          'contract-call deposits need a NetworkConfig with contracts.actionManager set',
      );
    }
    const erc20Address = params.erc20 ?? this.ctx.network.contracts.usdc;
    if (!erc20Address) {
      throw new Error(`network '${this.ctx.network.name}' has no usdc contract configured — pass erc20 explicitly`);
    }

    const token = new Contract(getAddress(erc20Address), ERC20_ABI, params.signer);
    const amountRaw =
      typeof params.amount === 'bigint'
        ? params.amount
        : toScaled(params.amount, Number(await token.getFunction('decimals')()));
    if (amountRaw <= 0n) throw new Error('deposit amount must be positive');

    const holder = await params.signer.getAddress();
    const allowance: bigint = await token.getFunction('allowance')(holder, managerAddress);
    if (allowance < amountRaw) {
      this.ctx.logger('debug', `approving ${amountRaw} of ${erc20Address} to ActionManager`);
      const approval = await token.getFunction('approve')(managerAddress, amountRaw);
      await approval.wait();
    }
    return { actionManager: new Contract(managerAddress, ACTION_MANAGER_ABI, params.signer), amountRaw };
  }
}

/**
 * CEX-style deposits: send funds to a registered deterministic address
 * from any wallet or exchange; they are credited asynchronously.
 */
export class DepositAddressDeposits {
  constructor(private readonly ctx: ClientContext) {}

  /**
   * Registers (or re-fetches — the address is deterministic per wallet/
   * subaccount/manager/factory) the deposit address the exchange watches
   * and sweeps, routing funds to an existing subaccount or, with
   * `managerId`, a new one. `wallet` defaults to the client's owner.
   * `depositType` picks the flow: `slow` (swept on-chain through the
   * ActionManager) or `fast` (pooled and credited off-chain).
   */
  async register(options: {
    wallet?: string;
    subaccountId?: number;
    managerId?: number;
    depositType: 'slow' | 'fast';
  }) {
    // The address is deterministic per (wallet, subaccount, manager). The
    // server requires a non-zero managerId whenever a subaccount isn't
    // given (it would be creating one), so fail early rather than eat a
    // confusing invalid_params.
    if (!options.subaccountId && !options.managerId) {
      throw new Error('provide subaccountId (existing) or managerId (to route deposits into a new subaccount)');
    }
    return this.ctx.send('public/register_deposit_address', {
      wallet: getAddress(options.wallet ?? this.ctx.credentials().ownerAddress),
      subaccount_id: options.subaccountId,
      manager_id: options.managerId,
      deposit_type: options.depositType,
    });
  }
}
