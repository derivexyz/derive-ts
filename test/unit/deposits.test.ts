import { describe, expect, it } from 'vitest';
import type { ClientContext } from '../../src/api/context';
import { DepositsApi } from '../../src/api/deposits';
import { DeriveTimeoutError } from '../../src/errors';
import type { PendingDepositEntry } from '../../src/types';

const WALLET = '0x1111111111111111111111111111111111111111';
const TX = '0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

function entry(overrides: Partial<PendingDepositEntry>): PendingDepositEntry {
  return {
    action_id: 0,
    action_type: 'FastDeposit',
    asset: 'USDC',
    amount: '400',
    subaccount_id: 7,
    manager_id: 0,
    tx_hash: TX.toLowerCase(),
    log_index: 3,
    block_number: 100,
    status: 'pending',
    deposit_type: 'instant',
    timestamp: 1,
    updated_at_ms: 1,
    ...overrides,
  };
}

/**
 * DepositsApi double: `send` serves one canned get_pending_deposits
 * response per poll (repeating the last one when exhausted).
 */
function makeDeposits(responses: PendingDepositEntry[][]) {
  const calls: Array<{ method: string; params: unknown }> = [];
  let poll = 0;
  const ctx = {
    credentials: () => ({ ownerAddress: WALLET }),
    send: async (method: string, params: unknown) => {
      calls.push({ method, params });
      const pending_deposits = responses[Math.min(poll, responses.length - 1)];
      poll += 1;
      return { wallet: WALLET, pending_deposits };
    },
  } as unknown as ClientContext;
  return { deposits: new DepositsApi(ctx), calls };
}

describe('DepositsApi.awaitFastDeposit', () => {
  it('resolves only once every entry — including the chunked remainder — is credited', async () => {
    // A deposit above the instant cap explodes into chunk entries; the
    // remainder entry keeps a non-credited status until fully paid out.
    const { deposits, calls } = makeDeposits([
      [entry({ status: 'pending', amount: '1000' })],
      [
        entry({ status: 'credited', amount: '400', credit_nonce: '1' }),
        entry({ status: 'crediting', amount: '400', credit_nonce: '2' }),
        entry({ status: 'pending', amount: '200' }),
      ],
      [
        entry({ status: 'credited', amount: '400', credit_nonce: '1' }),
        entry({ status: 'credited', amount: '400', credit_nonce: '2' }),
        entry({ status: 'credited', amount: '200', credit_nonce: '3' }),
      ],
    ]);
    const credited = await deposits.awaitFastDeposit({ txHash: TX, pollIntervalMs: 1 });
    expect(calls.map((c) => c.method)).toEqual(Array(3).fill('public/get_pending_deposits'));
    expect(credited.map((e) => e.amount)).toEqual(['400', '400', '200']);
  });

  it('matches the tx hash case-insensitively and ignores other deposits', async () => {
    const { deposits } = makeDeposits([
      [entry({ status: 'credited' }), entry({ tx_hash: '0xother', status: 'pending' })],
    ]);
    const credited = await deposits.awaitFastDeposit({ txHash: TX.toUpperCase().replace('0X', '0x') });
    expect(credited).toHaveLength(1);
  });

  it('throws when the deposit reverts instead of waiting out the timeout', async () => {
    const { deposits } = makeDeposits([
      [entry({ status: 'credited', amount: '400' }), entry({ status: 'reverted', amount: '600' })],
    ]);
    await expect(deposits.awaitFastDeposit({ txHash: TX, pollIntervalMs: 1 })).rejects.toThrow(/reverted/);
  });

  it('times out while no matching entry has appeared — absence is not success', async () => {
    const { deposits } = makeDeposits([[]]);
    await expect(deposits.awaitFastDeposit({ txHash: TX, timeoutMs: 20, pollIntervalMs: 1 })).rejects.toThrow(
      DeriveTimeoutError,
    );
  });
});
