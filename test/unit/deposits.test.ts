import { describe, expect, it } from 'vitest';
import type { ClientContext } from '../../src/api/context';
import { DepositsApi } from '../../src/api/deposits';
import { SubaccountsApi } from '../../src/api/subaccounts';
import { DeriveRpcError } from '../../src/errors';

const WALLET = '0x1111111111111111111111111111111111111111';

/** DepositsApi double recording every request it sends. */
function makeDeposits() {
  const calls: Array<{ method: string; params: Record<string, unknown> }> = [];
  const ctx = {
    credentials: () => ({ ownerAddress: WALLET }),
    send: async (method: string, params: Record<string, unknown>) => {
      calls.push({ method, params });
      return { wallet: WALLET, deposit_address: '0xdeadbeef' };
    },
  } as unknown as ClientContext;
  return { deposits: new DepositsApi(ctx, new SubaccountsApi(ctx)), calls };
}

describe('DepositAddressDeposits.register', () => {
  it('sends no deposit type — standard is the only registerable flow', async () => {
    const { deposits, calls } = makeDeposits();

    await deposits.depositAddress.register({ managerId: 2 });

    expect(calls).toHaveLength(1);
    const call = calls[0]!;
    expect(call.method).toBe('public/register_deposit_address');
    expect(call.params).not.toHaveProperty('deposit_type');
    expect(call.params).toMatchObject({ wallet: WALLET, manager_id: 2 });
  });

  it('rejects a registration naming neither a subaccount nor a manager', async () => {
    // Neither one means no destination: the server would answer with a
    // confusing invalid_params, so the SDK fails before sending.
    const { deposits, calls } = makeDeposits();

    await expect(deposits.depositAddress.register({})).rejects.toThrow(/subaccountId/);
    expect(calls).toHaveLength(0);
  });
});

/** DepositsApi double answering `private/get_subaccounts` from a queue of responses. */
function makePollingDeposits(responses: Array<number[] | DeriveRpcError>) {
  const ctx = {
    credentials: () => ({ ownerAddress: WALLET }),
    send: async () => {
      const next = responses.shift();
      if (next instanceof DeriveRpcError) throw next;
      return { wallet: WALLET, subaccount_ids: next };
    },
  } as unknown as ClientContext;
  return new DepositsApi(ctx, new SubaccountsApi(ctx));
}

const rpcError = (code: number, message: string) => new DeriveRpcError('private/get_subaccounts', { code, message });

describe('DepositsApi.awaitNewSubaccount', () => {
  it('keeps polling while a first deposit has not created the account yet', async () => {
    // The wallet has no account until the deposit is credited, so the
    // server answers 14000 rather than an empty list.
    const deposits = makePollingDeposits([
      rpcError(14000, 'Account not found'),
      rpcError(14000, 'Account not found'),
      [7],
    ]);

    await expect(deposits.awaitNewSubaccount({ knownSubaccountIds: [], pollIntervalMs: 0 })).resolves.toBe(7);
  });

  it('propagates any other RPC error instead of polling until timeout', async () => {
    const deposits = makePollingDeposits([rpcError(14014, 'Signature invalid for message or transaction'), [7]]);

    await expect(deposits.awaitNewSubaccount({ knownSubaccountIds: [], pollIntervalMs: 0 })).rejects.toMatchObject({
      code: 14014,
    });
  });
});
