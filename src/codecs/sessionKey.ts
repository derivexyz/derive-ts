import { AbiCoder, getAddress } from 'ethers';
import type { ProtocolScopeCode } from '../auth/scopes';

export interface SetSessionKeyData {
  /** Address of the key being authorized. */
  sessionKey: string;
  /**
   * The KEY's lifetime as a unix-seconds timestamp — distinct from the
   * envelope's signature expiry. The key stops working once `expirySec <= now`.
   *
   * Over `private/set_session_key` this must be at least 5 minutes in the
   * future (error 14039): order and quote entry require the signing key to
   * outlive the signature, so a shorter-lived key could leave orders resting
   * that nothing has time to clear. Consequently retiring a key by re-writing
   * a nearer expiry takes at least that long to take effect, and `0` is
   * rejected rather than deactivating the key immediately.
   *
   * The L1 `SetSessionKey` action has no such floor — there, a past expiry
   * (including 0) deletes the key outright.
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
 * Encodes the set-session-key action data: canonical
 * `abi.encode(address sessionKey, uint256 expirySec, uint256[] scopes,
 * uint256[] subaccountIds)`.
 */
export function encodeSetSessionKeyActionData(data: SetSessionKeyData): string {
  if (!Number.isInteger(data.expirySec) || data.expirySec < 0) {
    throw new Error(`session key expirySec must be a non-negative unix-seconds integer, got ${data.expirySec}`);
  }
  return AbiCoder.defaultAbiCoder().encode(
    ['address', 'uint256', 'uint256[]', 'uint256[]'],
    [getAddress(data.sessionKey), data.expirySec, [...data.scopes], [...data.subaccountIds]],
  );
}
