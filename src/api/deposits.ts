import { Contract, getAddress, type Signer } from 'ethers';
import { ONCHAIN_ACTION_MANAGER_ABI } from '../abis/onchainActionManager';
import { ERC20_ABI } from '../abis/erc20';
import { DeriveTimeoutError } from '../errors';
import { toScaled, type DecimalLike } from '../signing/encoding';
import type { PendingDepositEntry } from '../types';
import type { ClientContext } from './context';

/**
 * Deposits are NOT signed actions in v3. Funds enter through one of three
 * deliberately distinct flows — pick explicitly:
 *
 * - `deposits.contractCall.*` — self-custody (Direct): YOUR wallet sends
 *   the on-chain ActionManager transaction (approve + deposit); you
 *   provide an ethers Signer connected to the chain RPC.
 * - `deposits.depositAddress.register({ depositType: 'standard' })` — CEX-style
 *   (Standard): register a deterministic deposit address, send funds to it
 *   from anywhere, and the exchange sweeps and credits them asynchronously.
 * - `deposits.depositAddress.register({ depositType: 'instant' })` — CEX-style
 *   (Instant): same address mechanism, but the deposit is pooled and
 *   credited off-chain near-instantly up to a per-currency cap (larger
 *   amounts are credited in capped chunks).
 *
 * Tracking: `getPending` gives the first feedback for every method — an
 * entry appears the moment the exchange picks the deposit up. From there,
 * instant deposits are processed straight off that feed (`awaitFastDeposit`
 * polls it to completion), while contract-call and standard deposits wait
 * ~2 minutes of confirmations before entering exchange state — poll
 * `awaitNewSubaccount` (or the subaccount balance) for those. `getHistory`
 * records credited contract-call and standard deposits only; instant deposits
 * are credited as transfers and never appear there.
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
   * Every deposit the exchange has picked up but not yet applied
   * (`public/get_pending_deposits`) — the first feedback any deposit
   * method gives. Contract-call and slow deposits appear as soon as
   * their action lands in the OnchainActionManager (for slow, when the
   * keeper sweeps the deposit address); fast deposits as soon as the
   * keeper indexes the transfer, moving through the crediting lifecycle
   * from there. Public call — usable before the account exists. `wallet`
   * defaults to the client's owner. A fast deposit above the instant cap
   * appears as several entries — one per credit chunk — summing to the
   * on-chain amount.
   */
  async getPending(options: { wallet?: string } = {}) {
    return this.ctx.send('public/get_pending_deposits', {
      wallet: getAddress(options.wallet ?? this.ctx.credentials().ownerAddress),
    });
  }

  /**
   * Polls `public/get_pending_deposits` until the fast deposit funded by
   * `txHash` (the transfer into the fast deposit address) is fully paid
   * out — every entry `credited` — and returns the entries. Throws a
   * plain Error if the deposit reverts, or `DeriveTimeoutError` on the
   * deadline (chunked payouts of large deposits take multiple ticks, so
   * the default timeout is generous).
   */
  async awaitFastDeposit(params: {
    txHash: string;
    wallet?: string;
    timeoutMs?: number;
    pollIntervalMs?: number;
  }): Promise<PendingDepositEntry[]> {
    const { txHash, wallet, timeoutMs = 300_000, pollIntervalMs = 2_000 } = params;
    const target = txHash.toLowerCase();
    const deadline = Date.now() + timeoutMs;
    for (;;) {
      const { pending_deposits } = await this.getPending({ wallet });
      const entries = pending_deposits.filter((e) => e.tx_hash.toLowerCase() === target);
      if (entries.some((e) => e.status === 'reverted' || e.status === 'partial_revert')) {
        const statuses = entries.map((e) => `${e.amount} ${e.status}`).join(', ');
        throw new Error(`fast deposit ${txHash} reverted (${statuses})`);
      }
      if (entries.length > 0 && entries.every((e) => e.status === 'credited')) return entries;
      if (Date.now() >= deadline) {
        throw new DeriveTimeoutError(`fast deposit ${txHash} not fully credited within ${timeoutMs}ms`);
      }
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }
  }

  /**
   * Polls `private/get_subaccounts` until a subaccount id outside
   * `knownSubaccountIds` appears — the signal that a deposit creating a
   * new subaccount (any method) was credited — and returns the new id.
   * Snapshot the ids BEFORE initiating the deposit. For deposits into an
   * EXISTING subaccount, watch its balance via `subaccounts.get` instead.
   */
  async awaitNewSubaccount(params: {
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
  /** Protocol asset label the deposit credits (see abis/onchainActionManager.ts), NOT the ERC-20. */
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
   * `deposits.awaitNewSubaccount` against a pre-deposit snapshot of the
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
    return { actionManager: new Contract(managerAddress, ONCHAIN_ACTION_MANAGER_ABI, params.signer), amountRaw };
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
   * `depositType` picks the flow, and each type has its own distinct
   * address for the same identity:
   * - `standard`: swept on-chain through the ActionManager.
   * - `instant`: pooled and credited off-chain near-instantly up
   *   to a per-currency cap; larger amounts are credited in capped
   *   chunks. Track progress with `deposits.getPending` /
   *   `deposits.awaitFastDeposit`.
   */
  async register(options: {
    wallet?: string;
    subaccountId?: number;
    managerId?: number;
    depositType: 'standard' | 'instant';
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
