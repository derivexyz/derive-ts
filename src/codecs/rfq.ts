import { AbiCoder, getAddress, keccak256 } from 'ethers';
import { assertE12Precision, toE18, unsignedE18, type DecimalLike } from '../signing/encoding';
import type { Direction } from '../types';

/**
 * RFQ action-data codecs.
 *
 * Maker and taker must hash byte-identical leg bundles: legs are sorted
 * lexicographically by instrument name, and each signed leg amount is
 * `amount × legDirectionSign × directionSign × perspectiveSign`. The maker
 * encodes with their own quote direction (perspective +1); the taker
 * executes with the opposite direction and perspective −1, which cancels
 * back to the maker's exact values — the server rebuilds the taker's
 * order hash from the maker's stored quote.
 */

/** A quoted leg carrying everything the signature commits to. */
export interface RfqSignedLeg {
  /** Canonical ordering key — both sides sign legs sorted by this. */
  instrumentName: string;
  /** Protocol asset contract for the instrument (option or perp). */
  assetAddress: string;
  /** Asset sub id: '0' for perps, the option's encoded sub id otherwise. */
  subId: string | bigint;
  /** Per-unit price, always positive; e18-scaled into the signed bytes. */
  price: DecimalLike;
  /** Unsigned size — direction carries the sign. */
  amount: DecimalLike;
  direction: Direction;
}

export interface RfqQuoteFields {
  /** Worst fee the signer accepts, in USD; e18 in the signed bytes. */
  maxFee: DecimalLike;
  /** The maker's quote direction (taker execute: the taker's own direction). */
  direction: Direction;
  legs: RfqSignedLeg[];
}

/** Sorts legs into the canonical order both counterparties sign and send. */
export function sortRfqLegs<T extends { instrumentName: string }>(legs: readonly T[]): T[] {
  return [...legs].sort((a, b) =>
    a.instrumentName < b.instrumentName ? -1 : a.instrumentName > b.instrumentName ? 1 : 0,
  );
}

const LEGS_ABI = '(address,uint256,uint256,int256)[]';

/**
 * Maker quote data: `abi.encode(RfqOrder{ maxFee, trades[] })` —
 * `[0x20][maxFee][0x40][N][4 words per leg]`. Unlike the trade codec's
 * low-16-byte i128 amount words, a negative leg amount here is a full
 * sign-extended int256 (high 16 bytes 0xff), which is standard AbiCoder
 * output.
 */
export function encodeRfqQuote(fields: RfqQuoteFields): string {
  return AbiCoder.defaultAbiCoder().encode(
    [`(uint256,${LEGS_ABI})`],
    [[maxFeeE18(fields.maxFee), legTuples(fields, 1n)]],
  );
}

/**
 * Taker execute data: `abi.encode(bytes32 orderHash, uint256 maxFee)` where
 * `orderHash = keccak256(abi.encode(trades[]))` — the maker's legs only,
 * maker maxFee excluded. `fields.direction` is the TAKER's direction
 * (opposite of the quote's); `fields.maxFee` is the taker's own fee cap.
 */
export function encodeRfqExecute(fields: RfqQuoteFields): string {
  const coder = AbiCoder.defaultAbiCoder();
  const orderHash = keccak256(coder.encode([LEGS_ABI], [legTuples(fields, -1n)]));
  return coder.encode(['bytes32', 'uint256'], [orderHash, maxFeeE18(fields.maxFee)]);
}

function maxFeeE18(maxFee: DecimalLike): bigint {
  return unsignedE18(maxFee, 'rfq maxFee');
}

function legTuples(
  fields: RfqQuoteFields,
  perspectiveSign: 1n | -1n,
): Array<readonly [string, bigint, bigint, bigint]> {
  const directionSign = fields.direction === 'buy' ? 1n : -1n;
  return sortRfqLegs(fields.legs).map((leg) => {
    const price = unsignedE18(leg.price, `rfq leg price (${leg.instrumentName})`);
    const amount = toE18(leg.amount);
    if (amount <= 0n)
      throw new Error(`rfq leg amount must be positive (direction carries the sign): ${leg.instrumentName}`);
    assertE12Precision(amount, `rfq leg amount (${leg.instrumentName})`);
    const legSign = leg.direction === 'buy' ? 1n : -1n;
    return [
      getAddress(leg.assetAddress),
      BigInt(leg.subId),
      price,
      amount * legSign * directionSign * perspectiveSign,
    ] as const;
  });
}
