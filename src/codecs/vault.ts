import { AbiCoder, ZeroAddress, getAddress, isHexString } from 'ethers';
import { assertE12Precision, toE18, unsignedE18, type DecimalLike } from '../signing/encoding';

/**
 * Vault action encodings — shareholder intents (deposit/withdraw/cancel)
 * and curator actions (create, and the mint/burn settle approvals; in v3
 * anyone can curate a vault). Every vault action is signed under the
 * single vault module; word 0 is a uint256 kind word — the protocol's
 * ONLY discriminator between vault action types, so its high bytes must
 * be exactly zero. Deposits and withdrawals are queued intents the
 * curator later settles at a quoted share price committed to the
 * keccak256 of these exact bytes.
 */

const abi = AbiCoder.defaultAbiCoder();

/** Word-0 kind discriminators. */
export const VAULT_ACTION_KIND = {
  create: 0,
  deposit: 1,
  withdraw: 2,
  cancel: 3,
  mintShares: 4,
  burnShares: 5,
} as const;

/**
 * Vault amounts are signed at e18 but held at e12 by the protocol,
 * which rejects (not truncates) sub-1e12 precision, and requires
 * strictly positive values.
 */
function positiveE18(label: string, value: DecimalLike): bigint {
  const e18 = toE18(value);
  if (e18 <= 0n) throw new Error(`${label} must be positive`);
  assertE12Precision(e18, label);
  return e18;
}

export interface VaultDepositFields {
  vaultSubaccountId: number | bigint;
  /** Must equal the vault's configured deposit asset (protocol spot-asset address). */
  depositSpotAsset: string;
  /** Deposit amount in the deposit asset's units; max 12 decimal places. */
  amount: DecimalLike;
}

/** VaultDepositData (kind = 1, 4 words): [kind, vaultSubaccountId, depositSpotAsset, amountE18]. */
export function encodeVaultDeposit(fields: VaultDepositFields): string {
  return abi.encode(
    ['uint256', 'uint256', 'address', 'uint256'],
    [
      VAULT_ACTION_KIND.deposit,
      fields.vaultSubaccountId,
      getAddress(fields.depositSpotAsset),
      positiveE18('amount', fields.amount),
    ],
  );
}

export interface VaultWithdrawFields {
  vaultSubaccountId: number | bigint;
  /** Vault shares to redeem; max 12 decimal places. */
  sharesToBurn: DecimalLike;
}

/** VaultWithdrawData (kind = 2, 3 words): [kind, vaultSubaccountId, sharesToBurnE18]. */
export function encodeVaultWithdraw(fields: VaultWithdrawFields): string {
  return abi.encode(
    ['uint256', 'uint256', 'uint256'],
    [VAULT_ACTION_KIND.withdraw, fields.vaultSubaccountId, positiveE18('sharesToBurn', fields.sharesToBurn)],
  );
}

/**
 * VaultCancelData (kind = 3, 2 words): [kind, vaultSubaccountId].
 * Invalidates ALL of the signer's pending intents for the vault by
 * bumping their per-(vault, holder) nonce to the envelope's nonce.
 */
export function encodeVaultCancel(vaultSubaccountId: number | bigint): string {
  return abi.encode(['uint256', 'uint256'], [VAULT_ACTION_KIND.cancel, vaultSubaccountId]);
}

export interface VaultCreateFields {
  managerId: number;
  depositSpotAsset: string;
  /** Initial deposit moved funding subaccount → vault; max 12 decimal places. */
  initialDeposit: DecimalLike;
  managementFeeBps: number;
  performanceFeeBps: number;
  maxSlippageBps: number;
  cooldownSec: number | bigint;
  /** Maximum settlement fee authorised, in USD; max 12 decimal places. */
  maxFeeUsd: DecimalLike;
  /** Share price the vault is seeded at, in USD; max 12 decimal places. */
  initialSharePriceUsd: DecimalLike;
  /**
   * Spot asset the high-water mark is denominated in. Omit for the
   * feed-less USD default — presence drives the encoded hasBenchmark
   * flag, exactly as the exchange derives it from the wire param.
   */
  benchmarkAsset?: string;
}

/**
 * Create-vault action data (kind = 0, 12 words):
 * [kind, managerId, depositSpotAsset, initialDepositE18,
 *  managementFeeBps, performanceFeeBps, maxSlippageBps, cooldownSec,
 *  maxFeeUsdE18, initialSharePriceUsdE18, benchmarkAsset, hasBenchmark].
 * bps rates and cooldownSec are plain integers, not e18.
 */
export function encodeVaultCreate(fields: VaultCreateFields): string {
  const benchmark = fields.benchmarkAsset;
  return abi.encode(
    // prettier-ignore
    ['uint256', 'uint256', 'address', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'address', 'bool'],
    [
      VAULT_ACTION_KIND.create,
      fields.managerId,
      getAddress(fields.depositSpotAsset),
      unsignedE18(fields.initialDeposit, 'initialDeposit'),
      fields.managementFeeBps,
      fields.performanceFeeBps,
      fields.maxSlippageBps,
      fields.cooldownSec,
      unsignedE18(fields.maxFeeUsd, 'maxFeeUsd'),
      unsignedE18(fields.initialSharePriceUsd, 'initialSharePriceUsd'),
      benchmark === undefined ? ZeroAddress : getAddress(benchmark),
      benchmark !== undefined,
    ],
  );
}

export interface VaultMintSharesFields {
  /** Quoted share price in USD per share; max 12 decimal places. */
  sharePrice: DecimalLike;
  /** keccak256 of the user's exact encoded deposit action (0x hex, 32 bytes). */
  depositHash: string;
}

/** MintSharesActionData (kind = 4): the curator's approval to settle one queued deposit. */
export function encodeVaultMintShares(fields: VaultMintSharesFields): string {
  return encodeSettleApproval(VAULT_ACTION_KIND.mintShares, fields.sharePrice, 'depositHash', fields.depositHash);
}

export interface VaultBurnSharesFields {
  /** Quoted share price in USD per share; max 12 decimal places. */
  sharePrice: DecimalLike;
  /** keccak256 of the user's exact encoded withdraw action (0x hex, 32 bytes). */
  withdrawHash: string;
}

/** BurnSharesActionData (kind = 5): the curator's approval to settle one queued withdrawal. */
export function encodeVaultBurnShares(fields: VaultBurnSharesFields): string {
  return encodeSettleApproval(VAULT_ACTION_KIND.burnShares, fields.sharePrice, 'withdrawHash', fields.withdrawHash);
}

/**
 * Shared mint/burn layout (3 words): [kind, sharePriceE18, userActionHash].
 * The hash commits the quoted price to one exact user action, so the
 * exchange cannot pair it with a different deposit/withdrawal.
 */
function encodeSettleApproval(kind: number, sharePrice: DecimalLike, hashLabel: string, hash: string): string {
  if (!isHexString(hash, 32)) throw new Error(`${hashLabel} must be a 0x-prefixed 32-byte hex string`);
  return abi.encode(['uint256', 'uint256', 'bytes32'], [kind, unsignedE18(sharePrice, 'sharePrice'), hash]);
}
