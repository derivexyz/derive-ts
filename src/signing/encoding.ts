import { parseUnits } from 'ethers';

/**
 * A decimal value accepted from callers: a decimal string ("1500.5"),
 * a safe number, or a bigint already at the target field's wire scale
 * (e18 for most values; the ERC-20's native decimals for withdrawal
 * amounts).
 */
export type DecimalLike = string | number | bigint;

/**
 * Converts a decimal value to the protocol's e18 wire scale. Signed
 * actions ABI-encode all prices/amounts/fees at 1e18 and signatures
 * commit to those exact bytes. (Withdrawal amounts are the exception —
 * they stay in the ERC-20's native decimals; see codecs/withdrawal.)
 */
export function toE18(value: DecimalLike): bigint {
  return toScaled(value, 18);
}

/**
 * The exchange holds decimals at 1e12 and REJECTS (does not truncate) e18
 * words carrying sub-1e12 precision, so more than 12 decimal places can
 * never produce a valid signature. Holds for negative words too.
 */
export function assertE12Precision(e18: bigint, field: string): void {
  if (e18 % 1_000_000n !== 0n) {
    throw new Error(`${field} has more than 12 decimal places — the protocol runs at 1e12 precision`);
  }
}

/** Scales to e18, rejecting negatives and sub-1e12 precision. Shared by the value-bearing codecs. */
export function unsignedE18(value: DecimalLike, field: string): bigint {
  const scaled = toE18(value);
  if (scaled < 0n) throw new Error(`${field} must not be negative`);
  assertE12Precision(scaled, field);
  return scaled;
}

export function nonNegativeId(value: number | bigint, field: string): number | bigint {
  const valid = typeof value === 'bigint' ? value >= 0n : Number.isSafeInteger(value) && value >= 0;
  if (!valid) throw new Error(`${field} must be a non-negative integer`);
  return value;
}

/** Default envelope validity for signed actions; comfortably above the API's minimum. */
export const DEFAULT_SIGNATURE_EXPIRY_SEC = 300;

export function toScaled(value: DecimalLike, decimals: number): bigint {
  if (typeof value === 'bigint') return value;
  const text = typeof value === 'number' ? String(value) : value.trim();
  if (!/^-?\d+(\.\d+)?$/.test(text)) {
    throw new Error(
      `invalid decimal value: ${JSON.stringify(value)} (scientific notation and empty strings are not accepted)`,
    );
  }
  return parseUnits(text, decimals);
}

/**
 * Action nonces are UTC-nanosecond timestamps (the API accepts a
 * ±5-minute intake window), with sub-millisecond digits randomized so
 * concurrent actions never collide.
 */
export function randomNonce(now: number = Date.now()): string {
  const nanos = BigInt(now) * 1_000_000n + BigInt(Math.floor(Math.random() * 1_000_000));
  return nanos.toString();
}

/** Signature expiry as a unix-seconds timestamp, `seconds` from now. */
export function expiresIn(seconds: number, now: number = Date.now()): number {
  return Math.floor(now / 1000) + seconds;
}
