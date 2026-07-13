import { concat, getAddress, toBeHex, zeroPadValue } from 'ethers';
import type { ProtocolScopeCode } from '../auth/scopes';

export interface CreateSessionKeyData {
  /** Address of the key being authorized. */
  sessionKey: string;
  /**
   * The KEY's lifetime as a unix-seconds timestamp — distinct from the
   * envelope's signature expiry. The key stops working once `expirySec <= now`;
   * pass 0 to deactivate an existing key of this address.
   */
  expirySec: number;
  /**
   * Scope codes granted to the key (auth/scopes.ts). Typed as `number` at
   * this low level so raw codes pass through — the typed
   * `ProtocolScopeCode` enum guides callers, and the server is the
   * authority on which codes are valid.
   */
  scopes: readonly (ProtocolScopeCode | number)[];
  /** Subaccounts the key may act on; empty = ALL current and future subaccounts. */
  subaccountIds: readonly (number | bigint)[];
}

/**
 * Encodes the create-session-key action data.
 *
 * Hand-packed 32-byte words — NOT standard dynamic ABI (no offset or
 * length-prefix head): `[session_key][expiry_sec][S][A][scope codes…]
 * [subaccount ids…]`, every value right-aligned in its word.
 */
export function encodeCreateSessionKeyActionData(data: CreateSessionKeyData): string {
  if (!Number.isInteger(data.expirySec) || data.expirySec < 0) {
    throw new Error(`session key expirySec must be a non-negative unix-seconds integer, got ${data.expirySec}`);
  }
  return concat([
    zeroPadValue(getAddress(data.sessionKey), 32),
    uintWord(data.expirySec),
    uintWord(data.scopes.length),
    uintWord(data.subaccountIds.length),
    ...data.scopes.map((code) => uintWord(code)),
    ...data.subaccountIds.map((id) => uintWord(id)),
  ]);
}

function uintWord(value: number | bigint): string {
  const valid = typeof value === 'bigint' ? value >= 0n : Number.isSafeInteger(value) && value >= 0;
  if (!valid) throw new Error(`expected a non-negative integer, got ${value}`);
  return zeroPadValue(toBeHex(value), 32);
}
