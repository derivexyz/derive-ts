import { AbiCoder, getAddress } from 'ethers';
import { nonNegativeId, unsignedE18, type DecimalLike } from '../signing/encoding';

/**
 * Spot transfer between subaccounts of the same owner, verified by the
 * transfer module. Position transfers are booked as RFQ trades — this
 * action only ever moves a single spot asset.
 */
export interface TransferFields {
  toSubaccountId: number | bigint;
  /**
   * Routing sentinel: 0 credits the existing `toSubaccountId`; non-zero
   * creates a new subaccount under this manager id instead (the
   * destination id is then ignored).
   */
  newSubaccountManager: number | bigint;
  /** Protocol spot-asset address (not the underlying ERC-20). */
  asset: string;
  subId: number | bigint;
  /** Strictly positive; signed at e18. */
  amount: DecimalLike;
  /** Maximum fee the signer authorises, in USD; signed at e18. */
  maxFeeUsd: DecimalLike;
}

const TRANSFER_ABI = ['uint256', 'uint256', 'address', 'uint256', 'uint256', 'uint256'];

/** ABI-encodes transfer action data: six static 32-byte words. */
export function encodeTransfer(fields: TransferFields): string {
  const amount = unsignedE18(fields.amount, 'amount');
  if (amount === 0n) throw new Error('transfer amount must be strictly positive');
  return AbiCoder.defaultAbiCoder().encode(TRANSFER_ABI, [
    nonNegativeId(fields.toSubaccountId, 'toSubaccountId'),
    nonNegativeId(fields.newSubaccountManager, 'newSubaccountManager'),
    getAddress(fields.asset),
    nonNegativeId(fields.subId, 'subId'),
    amount,
    unsignedE18(fields.maxFeeUsd, 'maxFeeUsd'),
  ]);
}
