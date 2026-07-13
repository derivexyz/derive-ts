import { AbiCoder, Wallet } from 'ethers';
import { describe, expect, it } from 'vitest';
import { encodeTradeData } from '../../src/codecs/trade';
import { SignedAction } from '../../src/signing/action';
import vectors from './fixtures/golden-vectors.json';

/** The i-th 32-byte word of a 0x-hex buffer, as 64 lowercase hex chars. */
function word(hex: string, i: number): string {
  return hex.slice(2 + i * 64, 2 + (i + 1) * 64);
}

const goldenCase = vectors.cases.find((c) => c.name === 'trade');
if (!goldenCase) throw new Error('golden-vectors.json lost its trade case');
const golden = goldenCase.inputs as {
  asset_address: string;
  sub_id: string;
  limit_price: string;
  amount: string;
  max_fee: string;
  recipient_subaccount_id: number;
  is_bid: boolean;
  subaccount_id: number;
  nonce: string;
  signature_expiry_sec: number;
  module: string;
  owner: string;
  signer: string;
};

describe('trade codec', () => {
  it('reproduces the golden trade dataHex byte-for-byte', () => {
    const data = encodeTradeData({
      assetAddress: golden.asset_address,
      subId: golden.sub_id,
      limitPrice: golden.limit_price,
      amount: golden.amount,
      maxFee: golden.max_fee,
      recipientSubaccountId: golden.recipient_subaccount_id,
      isBid: golden.is_bid,
    });
    expect(data).toBe(goldenCase.dataHex);
  });

  it('signs the golden trade action to the recorded signature', () => {
    const action = new SignedAction(
      {
        subaccountId: golden.subaccount_id,
        nonce: golden.nonce,
        module: golden.module,
        data: encodeTradeData({
          assetAddress: golden.asset_address,
          subId: golden.sub_id,
          limitPrice: golden.limit_price,
          amount: golden.amount,
          maxFee: golden.max_fee,
          recipientSubaccountId: golden.recipient_subaccount_id,
          isBid: golden.is_bid,
        }),
        expirySec: golden.signature_expiry_sec,
        owner: golden.owner,
        signer: golden.signer,
      },
      vectors.domainSeparator,
    );
    expect(action.sign(new Wallet(vectors.signerPrivateKey)).signature).toBe(goldenCase.signature);
  });

  const sample = {
    assetAddress: `0x${'ab'.repeat(20)}`,
    subId: 42,
    limitPrice: '2.5',
    amount: '-3',
    maxFee: '1',
    recipientSubaccountId: 7,
    isBid: false,
  };

  it('writes negative values as i128 in the low 16 bytes with a ZERO high half (no sign extension)', () => {
    const data = encodeTradeData({ ...sample, limitPrice: '-1.5' });
    // -1.5e18 as 16-byte two's complement, high 16 bytes untouched.
    expect(word(data, 2)).toBe('00000000000000000000000000000000ffffffffffffffffeb2eedf284ea0000');
    // -3e18 amount likewise (computed: 2^128 + (-3e18)).
    const amountTwosComplement = ((1n << 128n) - 3_000_000_000_000_000_000n).toString(16);
    expect(word(data, 3)).toBe(`${'0'.repeat(32)}${amountTwosComplement}`);

    // Standard ABI int256 encoding sign-extends the high half — the exchange rejects those bytes.
    const int256 = AbiCoder.defaultAbiCoder().encode(['int256'], [-1_500_000_000_000_000_000n]).slice(2);
    expect(word(data, 2)).not.toBe(int256);
    expect(word(data, 2).slice(32)).toBe(int256.slice(32));
  });

  it('lays out all seven words in wire order', () => {
    const data = encodeTradeData(sample);
    expect(data.length).toBe(2 + 7 * 64);
    expect(word(data, 0)).toBe(`${'0'.repeat(24)}${'ab'.repeat(20)}`);
    expect(word(data, 1)).toBe(`${'0'.repeat(62)}2a`);
    expect(BigInt(`0x${word(data, 2)}`)).toBe(2_500_000_000_000_000_000n); // 2.5 at e18
    expect(BigInt(`0x${word(data, 4)}`)).toBe(1_000_000_000_000_000_000n); // 1.0 at e18
    expect(word(data, 5)).toBe(`${'0'.repeat(62)}07`);
    expect(word(data, 6)).toBe('0'.repeat(64)); // isBid=false leaves the word zero
  });

  it('sets only byte 223 for isBid', () => {
    const data = encodeTradeData({ ...sample, isBid: true });
    expect(word(data, 6)).toBe(`${'0'.repeat(62)}01`);
  });

  it('rejects e18 values outside the i128 range', () => {
    // 1e39 > i128 max (~1.7e38) and stays multiple of 1e6, isolating the range check.
    expect(() => encodeTradeData({ ...sample, limitPrice: 10n ** 39n })).toThrow(/limitPrice out of range/);
    expect(() => encodeTradeData({ ...sample, amount: -(10n ** 39n) })).toThrow(/amount out of range/);
  });

  it('rejects values with sub-1e12 precision (13+ decimal places)', () => {
    expect(() => encodeTradeData({ ...sample, limitPrice: '0.0000000000001' })).toThrow(/1e12 precision/);
  });

  it('rejects a negative maxFee and an oversized recipient id', () => {
    expect(() => encodeTradeData({ ...sample, maxFee: '-1' })).toThrow(/maxFee out of range/);
    expect(() => encodeTradeData({ ...sample, recipientSubaccountId: 1n << 64n })).toThrow(
      /recipientSubaccountId out of range/,
    );
  });
});
