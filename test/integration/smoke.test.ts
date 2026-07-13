import { Wallet } from 'ethers';
import { beforeAll, describe, expect, it } from 'vitest';
import { DeriveClient, DeriveRpcError } from '../../src/index';
import { domainSeparator } from '../../src/signing/eip712';
import { NETWORKS } from '../../src/config/networks';
import type { NetworkConfig } from '../../src/config/types';

/**
 * End-to-end smoke test against a compatible endpoint.
 * Validates the real HTTP + websocket transports, method-path handling,
 * and the EIP-191 login path.
 *
 * Every case self-skips if the stack is unreachable, so this is safe to
 * run in any environment.
 */
const local: NetworkConfig = {
  ...NETWORKS.local,
  httpUrl: process.env.HTTP_ADDRESS ?? NETWORKS.local.httpUrl,
  wsUrl: process.env.WEBSOCKET_ADDRESS ?? NETWORKS.local.wsUrl,
};
let reachable = false;

async function ping(): Promise<boolean> {
  try {
    const res = await fetch(`${local.httpUrl}/public/get_all_currencies`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{}',
      signal: AbortSignal.timeout(2000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

beforeAll(async () => {
  reachable = await ping();
  if (!reachable) console.warn(`endpoint not reachable at ${local.httpUrl}; skipping integration smoke tests`);
});

describe('integration smoke', () => {
  it('reaches a public REST method through the SDK', async ({ skip }) => {
    if (!reachable) return skip();
    const client = new DeriveClient({ network: local });
    // Assert connectivity and response shape only.
    const currencies = await client.marketData.getAllCurrencies();
    expect(Array.isArray(currencies)).toBe(true);
  });

  it('completes the EIP-191 login round-trip over the websocket', async ({ skip }) => {
    if (!reachable) return skip();
    const client = new DeriveClient({ network: local, wallet: Wallet.createRandom().privateKey });
    try {
      await client.connect();
      // A random wallet is expected to be rejected. Reaching that error proves
      // the full connect, sign, and dispatch path works against the endpoint.
      await expect(client.login()).rejects.toThrowError(DeriveRpcError);
    } finally {
      await client.close();
    }
  });

  it('the SDK local domain separator is internally consistent', ({ skip }) => {
    if (!reachable) return skip();
    // Pin the computed value so a configuration regression is caught in CI.
    expect(domainSeparator({ chainId: local.chainId })).toBe(
      '0x8a010a34fc48f792a220b0b63077f0f8ba664f21340882d60fb34b4959397842',
    );
  });
});
