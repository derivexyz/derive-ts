import type { BaseWallet } from 'ethers';

/**
 * The minimal signer the auth flow needs: anything that can EIP-191
 * `signMessage` (an ethers Wallet, an HD wallet, a provider-backed
 * signer, a hardware-wallet adapter…). Kept structural so any
 * ethers-compatible signer works, not just this SDK's `ethers` instance.
 */
export interface AuthSigner {
  signMessage(message: string): Promise<string>;
}

/**
 * Who a request acts as: the account owner's address plus the wallet
 * that actually signs (the owner itself, or a registered session key).
 */
export interface AuthCredentials {
  ownerAddress: string;
  signer: BaseWallet;
}

/**
 * The exchange authenticates requests with an EIP-191 personal_sign
 * over the current unix-millisecond timestamp as a decimal string.
 * Owner-wallet signatures must be fresh; session-key signatures skip
 * the freshness window but the key must be registered and unexpired.
 *
 * Note: header names use the `X-Derive*` prefix on the wire.
 */
export async function authHeaders(credentials: {
  ownerAddress: string;
  signer: AuthSigner;
}): Promise<Record<string, string>> {
  const timestamp = Date.now().toString();
  const signature = await credentials.signer.signMessage(timestamp);
  return {
    'X-DeriveWallet': credentials.ownerAddress,
    'X-DeriveTimestamp': timestamp,
    'X-DeriveSignature': signature,
  };
}

/** `public/login` takes the same wallet/timestamp/signature triple as the REST headers. */
export async function loginParams(credentials: {
  ownerAddress: string;
  signer: AuthSigner;
}): Promise<{ wallet: string; timestamp: number; signature: string }> {
  // Timestamp travels as a JSON number in the WS body (REST headers carry it as
  // a string); the EIP-191 signature is over its decimal-string form either way.
  const timestamp = Date.now();
  return {
    wallet: credentials.ownerAddress,
    timestamp,
    signature: await credentials.signer.signMessage(String(timestamp)),
  };
}
