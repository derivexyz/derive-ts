import { concat, getAddress, toBeHex, zeroPadValue } from 'ethers';
import { toE18, type DecimalLike } from '../signing/encoding';

/**
 * Inputs to the trade (order) action payload, verified by the trade
 * module (`network.modules.trade`).
 */
export interface TradeActionFields {
  /** Protocol asset contract of the instrument (`base_asset_address`). */
  assetAddress: string;
  /** Asset sub id (`base_asset_sub_id`): 0 for perps/spot, the option id for options. */
  subId: string | number | bigint;
  limitPrice: DecimalLike;
  amount: DecimalLike;
  /** Worst acceptable fee per unit traded the signature allows. */
  maxFee: DecimalLike;
  /** Subaccount credited with the fill — the trading subaccount itself. */
  recipientSubaccountId: number | bigint;
  isBid: boolean;
}

const I128_MIN = -(2n ** 127n);
const I128_MAX = 2n ** 127n - 1n;
const U64_MAX = 2n ** 64n - 1n;
const U128_MAX = 2n ** 128n - 1n;

/**
 * The exchange holds decimals at 1e12 and rejects (not truncates) signed
 * e18 words with sub-1e12 precision, so more than 12 decimal places can
 * never produce a valid signature.
 */
function assertE12Precision(e18: bigint, field: string): void {
  if (e18 % 1_000_000n !== 0n) {
    throw new Error(`${field} has more than 12 decimal places — the protocol runs at 1e12 precision`);
  }
}

/**
 * Canonical int256 word (full 32-byte two's complement, sign-extended).
 * The exchange stores these values as i128, so anything outside that
 * range can never produce a valid signature and is rejected here.
 */
function int256Word(e18: bigint, field: string): string {
  if (e18 < I128_MIN || e18 > I128_MAX) {
    throw new Error(`${field} out of range: e18-scaled value must fit in an i128`);
  }
  return toBeHex(BigInt.asUintN(256, e18), 32);
}

function uintWord(value: bigint, max: bigint, field: string): string {
  if (value < 0n || value > max) {
    throw new Error(`${field} out of range: must be an unsigned integer <= ${max}`);
  }
  return zeroPadValue(toBeHex(value), 32);
}

/**
 * Encodes the order action data: seven static words — asset, subId,
 * limitPrice, amount, maxFee, recipientId, isBid — with
 * prices/amounts/fee e18-scaled.
 */
export function encodeTradeData(fields: TradeActionFields): string {
  const limitPrice = toE18(fields.limitPrice);
  const amount = toE18(fields.amount);
  const maxFee = toE18(fields.maxFee);
  assertE12Precision(limitPrice, 'limitPrice');
  assertE12Precision(amount, 'amount');
  assertE12Precision(maxFee, 'maxFee');
  return concat([
    zeroPadValue(getAddress(fields.assetAddress), 32),
    uintWord(BigInt(fields.subId), U128_MAX, 'subId'),
    int256Word(limitPrice, 'limitPrice'),
    int256Word(amount, 'amount'),
    uintWord(maxFee, U128_MAX, 'maxFee'),
    uintWord(BigInt(fields.recipientSubaccountId), U64_MAX, 'recipientSubaccountId'),
    zeroPadValue(fields.isBid ? '0x01' : '0x00', 32),
  ]);
}
