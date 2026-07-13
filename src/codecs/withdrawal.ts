import { AbiCoder, getAddress } from 'ethers';
import { toScaled, unsignedE18, type DecimalLike } from '../signing/encoding';

/** Withdrawal to L1, verified by the withdrawal module. */
export interface WithdrawalFields {
  /** Protocol asset contract address (not the underlying ERC-20). */
  protocolAsset: string;
  /** Maximum fee the signer authorises, in USD; signed at e18 like every other action value. */
  maxFeeUsd: DecimalLike;
  /** L1 payout recipient. The exchange only constructs withdrawals paying out to the action signer. */
  recipient: string;
  /**
   * Withdrawal amount in the ERC-20's NATIVE decimals (USDC = 6) — the
   * protocol's only never-scaled amount, since it is the L1 payout value.
   */
  amount: DecimalLike;
  /** The underlying ERC-20's decimals, used to scale `amount`. */
  decimals: number;
  /** Pay a higher fee for immediate batch proving. */
  forceBatch: boolean;
}

const WITHDRAWAL_ABI = ['address', 'uint256', 'address', 'uint256', 'bool'];

/** ABI-encodes withdrawal action data: five static 32-byte words. */
export function encodeWithdrawal(fields: WithdrawalFields): string {
  if (!Number.isInteger(fields.decimals) || fields.decimals < 0 || fields.decimals > 255) {
    throw new Error('decimals must be an integer between 0 and 255');
  }
  const amount = toScaled(fields.amount, fields.decimals);
  if (amount <= 0n) throw new Error('withdrawal amount must be strictly positive');
  return AbiCoder.defaultAbiCoder().encode(WITHDRAWAL_ABI, [
    getAddress(fields.protocolAsset),
    unsignedE18(fields.maxFeeUsd, 'maxFeeUsd'),
    getAddress(fields.recipient),
    amount,
    fields.forceBatch,
  ]);
}
