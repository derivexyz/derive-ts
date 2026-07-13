import { AbiCoder, getAddress, keccak256 } from 'ethers';
import { describe, expect, it } from 'vitest';
import { encodeRfqQuote, encodeRfqExecute, sortRfqLegs } from '../../src/codecs/rfq';

/**
 * No golden vector exists for RFQ, so the layout is asserted synthetically:
 * [0x20][maxFee][0x40][N] head,
 * 4 words per leg, full sign-extended int256 amounts (unlike the trade
 * codec's low-16-byte i128 words), and the taker's orderHash committing to
 * the maker's legs array only.
 */

const ETH_ASSET = '0x' + 'ab'.repeat(20);
const BTC_ASSET = '0x' + 'cd'.repeat(20);

// Deliberately unsorted: BTC-PERP must sort ahead of ETH-PERP.
const ethLeg = {
  instrumentName: 'ETH-PERP',
  assetAddress: ETH_ASSET,
  subId: '42',
  price: '2',
  amount: '3',
  direction: 'buy' as const,
};
const btcLeg = {
  instrumentName: 'BTC-PERP',
  assetAddress: BTC_ASSET,
  subId: '7',
  price: '0.5',
  amount: '4',
  direction: 'sell' as const,
};
const legs = [ethLeg, btcLeg];

const E18 = 10n ** 18n;
const word = (hex: string, i: number): string => hex.slice(2 + i * 64, 2 + (i + 1) * 64);
const uintWord = (value: bigint): string => BigInt.asUintN(256, value).toString(16).padStart(64, '0');
const addressWord = (address: string): string => '0'.repeat(24) + address.slice(2).toLowerCase();

// The maker-perspective leg tuples both sides must commit to (sorted, signed
// amounts = amount × legSign × quoteDirectionSign with quote direction 'buy').
const makerLegTuples = [
  [getAddress(BTC_ASSET), 7n, E18 / 2n, -4n * E18],
  [getAddress(ETH_ASSET), 42n, 2n * E18, 3n * E18],
];

describe('encodeRfqQuote (maker)', () => {
  const data = encodeRfqQuote({ maxFee: '1.5', direction: 'buy', legs });

  it('lays out the [0x20][maxFee][0x40][N] head with 4 words per leg', () => {
    expect(data.length).toBe(2 + (4 + 4 * 2) * 64);
    expect(word(data, 0)).toBe(uintWord(0x20n));
    expect(word(data, 1)).toBe(uintWord((15n * E18) / 10n));
    expect(word(data, 2)).toBe(uintWord(0x40n));
    expect(word(data, 3)).toBe(uintWord(2n));
  });

  it('sorts legs lexicographically by instrument name', () => {
    expect(word(data, 4)).toBe(addressWord(BTC_ASSET)); // BTC-PERP first
    expect(word(data, 5)).toBe(uintWord(7n));
    expect(word(data, 8)).toBe(addressWord(ETH_ASSET));
    expect(word(data, 9)).toBe(uintWord(42n));
  });

  it('scales prices to e18 and signs amounts as legSign × quoteDirectionSign', () => {
    expect(word(data, 6)).toBe(uintWord(E18 / 2n));
    expect(word(data, 7)).toBe(uintWord(-4n * E18)); // sell leg of a buy quote
    expect(word(data, 10)).toBe(uintWord(2n * E18));
    expect(word(data, 11)).toBe(uintWord(3n * E18));
  });

  it('sign-extends negative amounts across the high 16 bytes', () => {
    expect(word(data, 7).slice(0, 32)).toBe('f'.repeat(32));
  });

  it('flips every amount when the quote direction flips', () => {
    const sell = encodeRfqQuote({ maxFee: '1.5', direction: 'sell', legs });
    expect(word(sell, 7)).toBe(uintWord(4n * E18));
    expect(word(sell, 11)).toBe(uintWord(-3n * E18));
  });

  it('rejects negative prices, non-positive amounts, and negative maxFee', () => {
    expect(() => encodeRfqQuote({ maxFee: '-1', direction: 'buy', legs })).toThrow(/maxFee/);
    expect(() => encodeRfqQuote({ maxFee: '0', direction: 'buy', legs: [{ ...ethLeg, price: '-2' }] })).toThrow(
      /price/,
    );
    expect(() => encodeRfqQuote({ maxFee: '0', direction: 'buy', legs: [{ ...ethLeg, amount: '0' }] })).toThrow(
      /amount/,
    );
  });
});

describe('encodeRfqExecute (taker)', () => {
  // The taker trades opposite the maker's 'buy' quote; perspective −1 flips
  // the amounts back to the maker's, so both sides commit to the same bytes.
  const data = encodeRfqExecute({ maxFee: '100', direction: 'sell', legs });

  it('encodes [orderHash][maxFee] with the hand-computed legs keccak', () => {
    const expectedHash = keccak256(
      AbiCoder.defaultAbiCoder().encode(['(address,uint256,uint256,int256)[]'], [makerLegTuples]),
    );
    expect(data.length).toBe(2 + 2 * 64);
    expect(word(data, 0)).toBe(expectedHash.slice(2));
    expect(word(data, 1)).toBe(uintWord(100n * E18));
  });

  it('orderHash excludes the maker maxFee: derivable from maker bytes as keccak(0x20 ‖ legs tail)', () => {
    // Skip the first 3 words ([0x20][maxFee][0x40]), prepend a fresh 0x20
    // word, then hash.
    const makerData = encodeRfqQuote({ maxFee: '1.5', direction: 'buy', legs });
    const rebuilt = keccak256('0x' + uintWord(0x20n) + makerData.slice(2 + 3 * 64));
    expect(word(data, 0)).toBe(rebuilt.slice(2));
    // A different maker maxFee must not change the taker's commitment.
    expect(encodeRfqExecute({ maxFee: '99', direction: 'sell', legs })).not.toBe(data);
    expect(word(encodeRfqExecute({ maxFee: '99', direction: 'sell', legs }), 0)).toBe(word(data, 0));
  });
});

describe('sortRfqLegs', () => {
  it('orders by instrument name without mutating the input', () => {
    const sorted = sortRfqLegs(legs);
    expect(sorted.map((leg) => leg.instrumentName)).toEqual(['BTC-PERP', 'ETH-PERP']);
    expect(legs[0]?.instrumentName).toBe('ETH-PERP');
  });
});
