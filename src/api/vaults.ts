import { formatUnits, getAddress } from 'ethers';
import {
  encodeVaultBurnShares,
  encodeVaultCancel,
  encodeVaultCreate,
  encodeVaultDeposit,
  encodeVaultMintShares,
  encodeVaultWithdraw,
} from '../codecs/vault';
import { SignedAction } from '../signing/action';
import { domainSeparator } from '../signing/eip712';
import { DEFAULT_SIGNATURE_EXPIRY_SEC, expiresIn, randomNonce, toE18, type DecimalLike } from '../signing/encoding';
import type { PerformanceResolution, VaultRequestId } from '../types';
import type { ClientContext } from './context';

/**
 * Shareholder deposits/withdrawals are queued intents settled later by
 * the curator, so their signatures default to a longer 10-minute
 * validity (the API caps it at 30 days). Curator actions execute
 * immediately and use the standard default expiry.
 */
const SHAREHOLDER_INTENT_TTL_SEC = 600;

/** Caller overrides for the signed-action envelope. */
export interface VaultActionOverrides {
  nonce?: string;
  signatureExpirySec?: number;
}

export interface VaultDepositRequest extends VaultActionOverrides {
  /** The user's source subaccount the deposited funds leave (the action is signed on it). */
  subaccountId: number;
  vaultSubaccountId: number;
  /** Must equal the vault's configured deposit asset (protocol spot-asset address). */
  depositSpotAsset: string;
  /** Amount of the deposit asset; max 12 decimal places. */
  amount: DecimalLike;
}

export interface VaultWithdrawRequest extends VaultActionOverrides {
  /** The user's destination subaccount that receives the redeemed funds. */
  subaccountId: number;
  vaultSubaccountId: number;
  /** Vault shares to redeem; max 12 decimal places. */
  sharesToBurn: DecimalLike;
}

export interface VaultCancelRequest extends VaultActionOverrides {
  /** Any subaccount the caller owns (the action is signed on it). */
  subaccountId: number;
  vaultSubaccountId: number;
}

export interface CreateVaultRequest extends VaultActionOverrides {
  /** The curator's funding subaccount the initial deposit is signed from. */
  subaccountId: number;
  managerId: number;
  depositSpotAsset: string;
  /** Initial deposit in the vault's deposit asset; max 12 decimal places. */
  initialDeposit: DecimalLike;
  managementFeeBps: number;
  performanceFeeBps: number;
  maxSlippageBps: number;
  cooldownSec: number;
  /** Maximum settlement fee authorised, in USD; max 12 decimal places. */
  maxFeeUsd: DecimalLike;
  /** Share price the vault is seeded at, in USD; must lie within the protocol's permitted range. */
  initialSharePriceUsd: DecimalLike;
  /** Spot asset to denominate the high-water mark in; omit for the feed-less USD default. */
  benchmarkAsset?: string;
}

export interface MintVaultSharesRequest extends VaultActionOverrides {
  /** The vault subaccount the curator signs the approval on. */
  vaultSubaccountId: number;
  /** Quoted share price in USD per share; max 12 decimal places. */
  sharePrice: DecimalLike;
  /** keccak256 of the user's exact encoded deposit action (0x hex, 32 bytes). */
  depositHash: string;
  /** The queued request being settled, as returned by the vault request reads. */
  requestId: VaultRequestId;
}

export interface BurnVaultSharesRequest extends VaultActionOverrides {
  /** The vault subaccount the curator signs the approval on. */
  vaultSubaccountId: number;
  /** Quoted share price in USD per share; max 12 decimal places. */
  sharePrice: DecimalLike;
  /** keccak256 of the user's exact encoded withdraw action (0x hex, 32 bytes). */
  withdrawHash: string;
  /** The queued request being settled, as returned by the vault request reads. */
  requestId: VaultRequestId;
}

export interface UpdateVaultInfoRequest {
  vaultSubaccountId: number;
  name?: string;
  description?: string;
  /** Advisory mark-to-market cap in USD. */
  mtmCap?: DecimalLike;
  whitelistOnly?: boolean;
}

function signVaultAction(
  ctx: ClientContext,
  subaccountId: number,
  data: string,
  overrides: VaultActionOverrides,
  defaultTtlSec: number,
): SignedAction {
  const { ownerAddress, signer } = ctx.credentials();
  const action = new SignedAction(
    {
      subaccountId,
      nonce: overrides.nonce ?? randomNonce(),
      module: ctx.network.modules.vault,
      data,
      expirySec: overrides.signatureExpirySec ?? expiresIn(defaultTtlSec),
      owner: ownerAddress,
      signer: signer.address,
    },
    domainSeparator(ctx.network),
  );
  return action.sign(signer);
}

/** The flattened signed-envelope fields every signed vault endpoint takes. */
function signedEnvelope(action: SignedAction) {
  return {
    subaccount_id: Number(action.fields.subaccountId),
    // The API deserializes nonce via string_or_number; nanosecond nonces
    // exceed 2^53, so send the decimal string despite the generated type.
    nonce: action.fields.nonce as unknown as number,
    signature_expiry_sec: action.fields.expirySec,
    signer: action.fields.signer,
    signature: action.signature as string, // set by sign() above
  };
}

/** The share-holding side: queued deposit/withdraw intents plus the wallet's vault reads. */
export class ShareholderVaultsApi {
  constructor(private readonly ctx: ClientContext) {}

  /** The vault subaccount ids the wallet holds shares in. */
  async getShareholderVaults() {
    return this.ctx.send('private/get_shareholder_vaults', { wallet: this.ctx.credentials().ownerAddress });
  }

  /** The wallet's share balance plus the full vault row for every vault it holds shares in. */
  async getShares() {
    return this.ctx.send('private/get_vault_shares', { wallet: this.ctx.credentials().ownerAddress });
  }

  /** The wallet's queued deposit/withdraw intents still awaiting curator settlement. */
  async getLiveRequests() {
    return this.ctx.send('private/get_live_vault_requests', { wallet: this.ctx.credentials().ownerAddress });
  }

  /** The wallet's full vault action history (every lifecycle status). */
  async getRequestHistory(options: { page?: number; pageSize?: number } = {}) {
    return this.ctx.send('private/get_vault_request_history', {
      wallet: this.ctx.credentials().ownerAddress,
      page: options.page,
      page_size: options.pageSize,
    });
  }

  /**
   * Queues a deposit into a vault. The curator later mints shares at a
   * quoted price committed to this exact signed payload; funds are held
   * from the source subaccount until then (or until cancelled).
   */
  async requestDeposit(request: VaultDepositRequest) {
    // Encode from the e18 value so the signed bytes and the wire decimal
    // string are guaranteed to describe the same amount.
    const amountE18 = toE18(request.amount);
    const data = encodeVaultDeposit({
      vaultSubaccountId: request.vaultSubaccountId,
      depositSpotAsset: request.depositSpotAsset,
      amount: amountE18,
    });
    const action = signVaultAction(this.ctx, request.subaccountId, data, request, SHAREHOLDER_INTENT_TTL_SEC);
    return this.ctx.send('private/request_vault_deposit', {
      ...signedEnvelope(action),
      vault_subaccount_id: request.vaultSubaccountId,
      deposit_spot_asset: getAddress(request.depositSpotAsset),
      amount: formatUnits(amountE18, 18),
    });
  }

  /** Queues a share redemption; the curator later burns the shares at a quoted price. */
  async requestWithdraw(request: VaultWithdrawRequest) {
    const sharesE18 = toE18(request.sharesToBurn);
    const data = encodeVaultWithdraw({
      vaultSubaccountId: request.vaultSubaccountId,
      sharesToBurn: sharesE18,
    });
    const action = signVaultAction(this.ctx, request.subaccountId, data, request, SHAREHOLDER_INTENT_TTL_SEC);
    return this.ctx.send('private/request_vault_withdraw', {
      ...signedEnvelope(action),
      vault_subaccount_id: request.vaultSubaccountId,
      shares_to_burn: formatUnits(sharesE18, 18),
    });
  }

  /** Cancels ALL of the wallet's pending intents for a vault (deposits and withdrawals). */
  async cancelAllRequests(request: VaultCancelRequest) {
    const data = encodeVaultCancel(request.vaultSubaccountId);
    const action = signVaultAction(this.ctx, request.subaccountId, data, request, SHAREHOLDER_INTENT_TTL_SEC);
    return this.ctx.send('private/cancel_all_vault_requests', {
      ...signedEnvelope(action),
      vault_subaccount_id: request.vaultSubaccountId,
    });
  }
}

/**
 * The curating side — open to any wallet in v3 (curating is not a
 * privileged role): vault creation, metadata updates, and the settle
 * approvals that execute queued shareholder intents at a quoted price.
 */
export class CuratorVaultsApi {
  constructor(private readonly ctx: ClientContext) {}

  /** The vault subaccount ids this wallet curates. */
  async getCuratedVaults() {
    return this.ctx.send('private/get_curated_vaults', { wallet: this.ctx.credentials().ownerAddress });
  }

  /**
   * Creates a vault funded from the signer's subaccount; the signer
   * becomes its curator. Fee rates and max slippage are immutable
   * afterwards.
   */
  async createVault(request: CreateVaultRequest) {
    const initialDepositE18 = toE18(request.initialDeposit);
    const maxFeeUsdE18 = toE18(request.maxFeeUsd);
    const sharePriceUsdE18 = toE18(request.initialSharePriceUsd);
    const benchmarkAsset = request.benchmarkAsset === undefined ? undefined : getAddress(request.benchmarkAsset);
    const data = encodeVaultCreate({
      managerId: request.managerId,
      depositSpotAsset: request.depositSpotAsset,
      initialDeposit: initialDepositE18,
      managementFeeBps: request.managementFeeBps,
      performanceFeeBps: request.performanceFeeBps,
      maxSlippageBps: request.maxSlippageBps,
      cooldownSec: request.cooldownSec,
      maxFeeUsd: maxFeeUsdE18,
      initialSharePriceUsd: sharePriceUsdE18,
      benchmarkAsset,
    });
    const action = signVaultAction(this.ctx, request.subaccountId, data, request, DEFAULT_SIGNATURE_EXPIRY_SEC);
    return this.ctx.send('private/create_vault', {
      ...signedEnvelope(action),
      manager_id: request.managerId,
      deposit_spot_asset: getAddress(request.depositSpotAsset),
      initial_deposit: formatUnits(initialDepositE18, 18),
      management_fee_bps: request.managementFeeBps,
      performance_fee_bps: request.performanceFeeBps,
      max_slippage_bps: request.maxSlippageBps,
      cooldown_sec: request.cooldownSec,
      max_fee_usd: formatUnits(maxFeeUsdE18, 18),
      initial_share_price_usd: formatUnits(sharePriceUsdE18, 18),
      // Presence drives the signed hasBenchmark flag; the exchange derives it the same way.
      benchmark_asset: benchmarkAsset ?? null,
    });
  }

  /** Settles one queued shareholder deposit, minting shares at the quoted price. */
  async mintShares(request: MintVaultSharesRequest) {
    const sharePriceE18 = toE18(request.sharePrice);
    const data = encodeVaultMintShares({ sharePrice: sharePriceE18, depositHash: request.depositHash });
    const action = signVaultAction(this.ctx, request.vaultSubaccountId, data, request, DEFAULT_SIGNATURE_EXPIRY_SEC);
    return this.ctx.send('private/mint_vault_shares', {
      ...signedEnvelope(action),
      share_price: formatUnits(sharePriceE18, 18),
      deposit_hash: request.depositHash,
      request_id: request.requestId,
    });
  }

  /** Settles one queued shareholder withdrawal, burning shares at the quoted price. */
  async burnShares(request: BurnVaultSharesRequest) {
    const sharePriceE18 = toE18(request.sharePrice);
    const data = encodeVaultBurnShares({ sharePrice: sharePriceE18, withdrawHash: request.withdrawHash });
    const action = signVaultAction(this.ctx, request.vaultSubaccountId, data, request, DEFAULT_SIGNATURE_EXPIRY_SEC);
    return this.ctx.send('private/burn_vault_shares', {
      ...signedEnvelope(action),
      share_price: formatUnits(sharePriceE18, 18),
      withdraw_hash: request.withdrawHash,
      request_id: request.requestId,
    });
  }

  /** Updates the vault's advisory metadata (unsigned; an ownership check gates it to the curator). */
  async updateInfo(request: UpdateVaultInfoRequest) {
    return this.ctx.send('private/update_vault_info', {
      subaccount_id: request.vaultSubaccountId,
      name: request.name,
      description: request.description,
      mtm_cap: request.mtmCap === undefined ? undefined : formatUnits(toE18(request.mtmCap), 18),
      whitelist_only: request.whitelistOnly,
    });
  }

  /** The vault's queued deposit intents awaiting a `mintShares` settlement, FIFO-ordered with the queue total. */
  async getLiveMintRequests(vaultSubaccountId: number, limit = 100) {
    return this.ctx.send('private/get_live_mint_requests', { subaccount_id: vaultSubaccountId, limit });
  }

  /** The vault's queued withdraw intents awaiting a `burnShares` settlement, FIFO-ordered with the queue total. */
  async getLiveBurnRequests(vaultSubaccountId: number, limit = 100) {
    return this.ctx.send('private/get_live_burn_requests', { subaccount_id: vaultSubaccountId, limit });
  }

  /** Rejects a queued deposit intent, releasing the holder's funds without minting shares. */
  async rejectDepositRequest(requestId: VaultRequestId, reason?: string) {
    // The API auth layer binds the call to the caller via a top-level `wallet`
    // (the handler itself only reads request_id/reason); it is absent from the
    // generated params type, so attach it explicitly.
    return this.ctx.send('private/reject_deposit_request', {
      request_id: requestId,
      reason,
      wallet: this.ctx.credentials().ownerAddress,
    } as { request_id: VaultRequestId; reason?: string });
  }

  /**
   * Force-exits a holder at mark-to-market with no curator price quote (unsigned;
   * an ownership check gates it to the curator of `vaultSubaccountId`).
   */
  async forceBurn(vaultSubaccountId: number, holder: string) {
    return this.ctx.send('private/force_burn', { subaccount_id: vaultSubaccountId, holder });
  }
}

/** Vault discovery and stats, plus the role-scoped `shareholder` and `curator` flows. */
export class VaultsApi {
  readonly shareholder: ShareholderVaultsApi;
  readonly curator: CuratorVaultsApi;

  constructor(private readonly ctx: ClientContext) {
    this.shareholder = new ShareholderVaultsApi(ctx);
    this.curator = new CuratorVaultsApi(ctx);
  }

  async getVault(vaultSubaccountId: number) {
    return this.ctx.send('public/get_vault', { subaccount_id: vaultSubaccountId });
  }

  async listVaults(options: { page?: number; pageSize?: number } = {}) {
    return this.ctx.send('public/get_vaults', { page: options.page, page_size: options.pageSize });
  }

  async getActionHistory(
    vaultSubaccountId: number,
    options: { eventType?: string; page?: number; pageSize?: number } = {},
  ) {
    return this.ctx.send('public/get_vault_action_history', {
      subaccount_id: vaultSubaccountId,
      event_type: options.eventType,
      page: options.page,
      page_size: options.pageSize,
    });
  }

  async getPerformanceHistory(
    vaultSubaccountId: number,
    resolution: PerformanceResolution,
    options: { from?: number; to?: number; limit?: number } = {},
  ) {
    return this.ctx.send('public/get_vault_performance_history', {
      subaccount_id: vaultSubaccountId,
      resolution,
      ...options,
    });
  }
}
