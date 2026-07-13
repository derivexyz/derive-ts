import { parseUnits, toBeHex, zeroPadValue } from 'ethers';
import { describe, expect, it } from 'vitest';
import {
  encodeVaultBurnShares,
  encodeVaultCancel,
  encodeVaultCreate,
  encodeVaultDeposit,
  encodeVaultMintShares,
  encodeVaultWithdraw,
} from '../../src/codecs/vault';

/**
 * Synthetic byte-layout vectors built word-by-word. The golden fixture set has
 * no vault case, so these assemble the expected bytes independently of the
 * codec's own AbiCoder path. The kind word is the protocol's only discriminator
 * between vault action types, so every case pins word 0 in full — high bytes
 * must be exactly zero.
 */

const word = (value: number | bigint): string => zeroPadValue(toBeHex(value), 32).slice(2);
const addressWord = (address: string): string => zeroPadValue(address, 32).slice(2).toLowerCase();

const ASSET = '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'; // 20 bytes of 0xbb
const CREATE_DEPOSIT_ASSET = '0x' + 'aa'.repeat(20);
const BENCHMARK_ASSET = '0x' + 'bb'.repeat(20);
const HASH_D1 = '0x' + 'd1'.repeat(32);

describe('vault deposit encoding (kind = 1, 4 words)', () => {
  const expected = '0x' + word(1) + word(42) + addressWord(ASSET) + word(parseUnits('1.5', 18));

  it('lays out [kind, vaultSubaccountId, depositSpotAsset, amountE18]', () => {
    const encoded = encodeVaultDeposit({ vaultSubaccountId: 42, depositSpotAsset: ASSET, amount: '1.5' });
    expect(encoded.length).toBe(2 + 4 * 64);
    expect(encoded).toBe(expected);
  });

  it('kind word is exactly 1 with clean high bytes', () => {
    const encoded = encodeVaultDeposit({ vaultSubaccountId: 42, depositSpotAsset: ASSET, amount: '1.5' });
    expect(encoded.slice(2, 66)).toBe('00'.repeat(31) + '01');
  });

  it('accepts a pre-scaled e18 bigint amount', () => {
    expect(encodeVaultDeposit({ vaultSubaccountId: 42, depositSpotAsset: ASSET, amount: parseUnits('1.5', 18) })).toBe(
      expected,
    );
  });

  it('rejects non-positive amounts', () => {
    expect(() => encodeVaultDeposit({ vaultSubaccountId: 1, depositSpotAsset: ASSET, amount: '0' })).toThrow(
      /positive/,
    );
    expect(() => encodeVaultDeposit({ vaultSubaccountId: 1, depositSpotAsset: ASSET, amount: '-1' })).toThrow(
      /positive/,
    );
  });

  it('rejects sub-1e12 precision (the protocol rejects, not truncates, such wire words)', () => {
    expect(() =>
      encodeVaultDeposit({ vaultSubaccountId: 1, depositSpotAsset: ASSET, amount: '0.0000000000001' }),
    ).toThrow(/12 decimal places/);
  });

  it('rejects malformed asset addresses', () => {
    expect(() => encodeVaultDeposit({ vaultSubaccountId: 1, depositSpotAsset: '0x1234', amount: '1' })).toThrow();
  });
});

describe('vault withdraw encoding (kind = 2, 3 words)', () => {
  it('lays out [kind, vaultSubaccountId, sharesToBurnE18]', () => {
    // 1e-12 shares is the smallest protocol-representable value: e18 word = 1e6.
    const encoded = encodeVaultWithdraw({ vaultSubaccountId: 7, sharesToBurn: '0.000000000001' });
    expect(encoded).toBe('0x' + word(2) + word(7) + word(1_000_000n));
  });

  it('rejects sub-1e12 precision shares', () => {
    expect(() => encodeVaultWithdraw({ vaultSubaccountId: 7, sharesToBurn: '0.0000000000001' })).toThrow(
      /12 decimal places/,
    );
  });
});

describe('vault cancel encoding (kind = 3, 2 words)', () => {
  it('lays out [kind, vaultSubaccountId] and right-aligns a u64-max id', () => {
    const maxU64 = 2n ** 64n - 1n;
    expect(encodeVaultCancel(maxU64)).toBe('0x' + word(3) + word(maxU64));
  });
});

describe('cross-kind distinctness', () => {
  it('identical field values under different kinds never produce identical bytes', () => {
    // The curator settles against keccak256 of these exact encodings, so a
    // deposit commitment must never collide with a withdraw commitment.
    const withdraw = encodeVaultWithdraw({ vaultSubaccountId: 5, sharesToBurn: '1' });
    const cancelPrefix = encodeVaultCancel(5);
    expect(withdraw.startsWith(cancelPrefix)).toBe(false);
    expect(withdraw.slice(66)).toBe(cancelPrefix.slice(66) + word(parseUnits('1', 18)));
  });

  it('mint and burn approvals with identical fields differ only in the kind word', () => {
    // The layouts are identical, so the kind word is the only thing stopping a
    // signed mint decoding as a burn.
    const fields = { sharePrice: '1', depositHash: HASH_D1 };
    const mint = encodeVaultMintShares(fields);
    const burn = encodeVaultBurnShares({ sharePrice: '1', withdrawHash: HASH_D1 });
    expect(mint.slice(2, 66)).toBe(word(4));
    expect(burn.slice(2, 66)).toBe(word(5));
    expect(mint.slice(66)).toBe(burn.slice(66));
  });
});

describe('vault create encoding (kind = 0, 12 words)', () => {
  // Values are expressed as decimals (10_000e12 → "10000").
  const sample = () =>
    encodeVaultCreate({
      managerId: 7,
      depositSpotAsset: CREATE_DEPOSIT_ASSET,
      initialDeposit: '10000',
      managementFeeBps: 100,
      performanceFeeBps: 2_000,
      maxSlippageBps: 50,
      cooldownSec: 10_800,
      maxFeeUsd: '1',
      initialSharePriceUsd: '1',
      benchmarkAsset: BENCHMARK_ASSET,
    });

  it('reproduces the expected bytes (e18 wire words, integer bps/cooldown)', () => {
    const expected =
      '0x' +
      word(0) + // kind = CreateVault
      word(7) + // manager_id
      addressWord(CREATE_DEPOSIT_ASSET) +
      word(parseUnits('10000', 18)) + // initial_deposit, e18
      word(100) + // management_fee_bps, plain integer
      word(2_000) + // performance_fee_bps, plain integer
      word(50) + // max_slippage_bps, plain integer
      word(10_800) + // cooldown_sec, plain integer
      word(parseUnits('1', 18)) + // max_fee_usd, e18
      word(parseUnits('1', 18)) + // initial_share_price_usd, e18
      addressWord(BENCHMARK_ASSET) +
      word(1); // has_benchmark
    const encoded = sample();
    expect(encoded.length).toBe(2 + 12 * 64);
    expect(encoded).toBe(expected);
  });

  it('kind word is exactly 0 with clean high bytes', () => {
    expect(sample().slice(2, 66)).toBe('00'.repeat(32));
  });

  it('an omitted benchmark encodes the zero address and has_benchmark = 0, as the exchange derives it', () => {
    const encoded = encodeVaultCreate({
      managerId: 7,
      depositSpotAsset: CREATE_DEPOSIT_ASSET,
      initialDeposit: '10000',
      managementFeeBps: 100,
      performanceFeeBps: 2_000,
      maxSlippageBps: 50,
      cooldownSec: 10_800,
      maxFeeUsd: '1',
      initialSharePriceUsd: '1',
    });
    expect(encoded.slice(2 + 10 * 64)).toBe(word(0) + word(0));
  });

  it('rejects sub-1e12 precision on scaled fields', () => {
    expect(() =>
      encodeVaultCreate({
        managerId: 7,
        depositSpotAsset: CREATE_DEPOSIT_ASSET,
        initialDeposit: '0.0000000000001',
        managementFeeBps: 100,
        performanceFeeBps: 2_000,
        maxSlippageBps: 50,
        cooldownSec: 10_800,
        maxFeeUsd: '1',
        initialSharePriceUsd: '1',
      }),
    ).toThrow(/12 decimal places/);
  });
});

describe('vault mint-shares encoding (kind = 4, 3 words)', () => {
  // share_price_e12 = 1_388_000_000_000 (= 1.388), deposit_hash = 0xD1 × 32.
  it('lays out [kind, sharePriceE18, depositHash]', () => {
    const encoded = encodeVaultMintShares({ sharePrice: '1.388', depositHash: HASH_D1 });
    expect(encoded).toBe('0x' + word(4) + word(parseUnits('1.388', 18)) + 'd1'.repeat(32));
  });

  it('kind word is exactly 4 with clean high bytes', () => {
    const encoded = encodeVaultMintShares({ sharePrice: '1.388', depositHash: HASH_D1 });
    expect(encoded.slice(2, 66)).toBe('00'.repeat(31) + '04');
  });

  it('rejects a deposit hash that is not 32 bytes', () => {
    expect(() => encodeVaultMintShares({ sharePrice: '1', depositHash: '0xd1d1' })).toThrow(/32-byte/);
  });

  it('rejects sub-1e12 precision share prices', () => {
    expect(() => encodeVaultMintShares({ sharePrice: '0.0000000000001', depositHash: HASH_D1 })).toThrow(
      /12 decimal places/,
    );
  });
});

describe('vault burn-shares encoding (kind = 5, 3 words)', () => {
  // share_price_e12 = u128::MAX / 1e6 (pre-scaled e18 bigint here), withdraw_hash = zeros.
  const maxSharePriceE18 = ((2n ** 128n - 1n) / 1_000_000n) * 1_000_000n;
  const zeroHash = '0x' + '00'.repeat(32);

  it('lays out [kind, sharePriceE18, withdrawHash]', () => {
    const encoded = encodeVaultBurnShares({ sharePrice: maxSharePriceE18, withdrawHash: zeroHash });
    expect(encoded).toBe('0x' + word(5) + word(maxSharePriceE18) + '00'.repeat(32));
  });

  it('kind word is exactly 5 with clean high bytes', () => {
    const encoded = encodeVaultBurnShares({ sharePrice: '1', withdrawHash: zeroHash });
    expect(encoded.slice(2, 66)).toBe('00'.repeat(31) + '05');
  });

  it('rejects a withdraw hash that is not 32 bytes', () => {
    expect(() => encodeVaultBurnShares({ sharePrice: '1', withdrawHash: '0x00' })).toThrow(/32-byte/);
  });
});
