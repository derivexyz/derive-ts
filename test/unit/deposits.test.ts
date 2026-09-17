import { describe, expect, it } from 'vitest';
import type { ClientContext } from '../../src/api/context';
import { DepositsApi } from '../../src/api/deposits';

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
  return { deposits: new DepositsApi(ctx), calls };
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
