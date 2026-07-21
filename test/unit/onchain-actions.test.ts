import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProtocolScopeCode } from '../../src/auth/scopes';
import { encodeCreateSessionKeyActionData } from '../../src/codecs/sessionKey';
import { ONCHAIN_ACTION_TYPE, OnchainActionsApi } from '../../src/api/onchainActions';

// Records every submit(actionType, data) the API drives, so the tests can
// assert the action type and calldata without a live chain. Real ethers is
// kept for getAddress / the codec's encoding helpers.
const submitCalls = vi.hoisted(() => [] as Array<{ actionType: number | bigint; data: string }>);

vi.mock('ethers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('ethers')>();
  class FakeContract {
    constructor(
      readonly address: string,
      readonly abi: unknown,
      readonly runner: unknown,
    ) {}
    getFunction(name: string) {
      if (name !== 'submit') throw new Error(`unexpected function ${name}`);
      return async (actionType: number | bigint, data: string) => {
        submitCalls.push({ actionType, data });
        return { hash: '0xabc', wait: async () => ({}) };
      };
    }
  }
  return { ...actual, Contract: FakeContract };
});

const KEY = '0x4242424242424242424242424242424242424242';

function makeApi(
  contracts: { actionManager?: string } = { actionManager: '0x0165878A594ca255338adfa4d48449f69242Eb8F' },
) {
  const ctx = {
    network: { name: 'local', contracts },
    logger: () => {},
    send: async () => {
      throw new Error('send is unused by onchain actions');
    },
    credentials: () => {
      throw new Error('credentials are unused by onchain actions');
    },
  };
  return new OnchainActionsApi(ctx as never);
}

beforeEach(() => {
  submitCalls.length = 0;
});

describe('OnchainActionsApi', () => {
  it('setSessionKey submits action type 51 with the reused session-key encoding', async () => {
    const { txHash } = await makeApi().setSessionKey({
      signer: {} as never,
      sessionKey: KEY,
      expirySec: 1_700_000_000,
      scopes: [ProtocolScopeCode.Admin],
      subaccountIds: [1],
    });

    expect(txHash).toBe('0xabc');
    expect(submitCalls).toHaveLength(1);
    const call = submitCalls[0]!;
    expect(call.actionType).toBe(ONCHAIN_ACTION_TYPE.SetSessionKey);
    expect(call.actionType).toBe(51);
    expect(call.data).toBe(
      encodeCreateSessionKeyActionData({
        sessionKey: KEY,
        expirySec: 1_700_000_000,
        scopes: [ProtocolScopeCode.Admin],
        subaccountIds: [1],
      }),
    );
  });

  it('revokeSessionKey submits a Set Session Key action with expiry 0 (delete)', async () => {
    await makeApi().revokeSessionKey({ signer: {} as never, sessionKey: KEY });

    expect(submitCalls).toHaveLength(1);
    const call = submitCalls[0]!;
    expect(call.actionType).toBe(51);
    expect(call.data).toBe(
      encodeCreateSessionKeyActionData({ sessionKey: KEY, expirySec: 0, scopes: [], subaccountIds: [] }),
    );
  });

  it('defaults scopes and subaccounts to empty (read-only key, all subaccounts)', async () => {
    await makeApi().setSessionKey({ signer: {} as never, sessionKey: KEY, expirySec: 123 });

    expect(submitCalls[0]!.data).toBe(
      encodeCreateSessionKeyActionData({ sessionKey: KEY, expirySec: 123, scopes: [], subaccountIds: [] }),
    );
  });

  it('throws when the network has no actionManager configured', async () => {
    await expect(makeApi({}).setSessionKey({ signer: {} as never, sessionKey: KEY, expirySec: 1 })).rejects.toThrow(
      /actionManager/,
    );
  });
});
