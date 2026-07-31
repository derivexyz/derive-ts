import { AbiCoder } from 'ethers';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProtocolScopeCode } from '../../src/auth/scopes';
import { encodeSetSessionKeyActionData } from '../../src/codecs/sessionKey';
import { encodeOnchainWithdrawal, type OnchainWithdrawalStruct } from '../../src/codecs/withdrawal';
import { ONCHAIN_ACTION_TYPE, OnchainActionsApi } from '../../src/api/onchainActions';

// Records every submit(actionType, data) / withdraw(params) the API drives,
// so the tests can assert the action type and calldata without a live chain.
// Real ethers is kept for getAddress / the codec's encoding helpers.
const submitCalls = vi.hoisted(() => [] as Array<{ actionType: number | bigint; data: string }>);
const withdrawCalls = vi.hoisted(() => [] as OnchainWithdrawalStruct[]);

vi.mock('ethers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('ethers')>();
  class FakeContract {
    constructor(
      readonly address: string,
      readonly abi: unknown,
      readonly runner: unknown,
    ) {}
    getFunction(name: string) {
      if (name === 'submit') {
        return async (actionType: number | bigint, data: string) => {
          submitCalls.push({ actionType, data });
          return { hash: '0xabc', wait: async () => ({}) };
        };
      }
      if (name === 'withdraw') {
        return async (params: OnchainWithdrawalStruct) => {
          withdrawCalls.push(params);
          return { hash: '0xabc', wait: async () => ({}) };
        };
      }
      throw new Error(`unexpected function ${name}`);
    }
  }
  return { ...actual, Contract: FakeContract };
});

const KEY = '0x4242424242424242424242424242424242424242';
const OWNER = '0x1111111111111111111111111111111111111111';
const ASSET = '0x2222222222222222222222222222222222222222';

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
  withdrawCalls.length = 0;
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
      encodeSetSessionKeyActionData({
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
      encodeSetSessionKeyActionData({ sessionKey: KEY, expirySec: 0, scopes: [], subaccountIds: [] }),
    );
  });

  it('withdraw drives the typed entrypoint with the scaled WithdrawalParams struct', async () => {
    const signer = { getAddress: async () => OWNER } as never;
    const { txHash } = await makeApi().withdraw({
      signer,
      subaccountId: 42,
      protocolAsset: ASSET,
      amount: '1.5',
      decimals: 6,
    });

    expect(txHash).toBe('0xabc');
    expect(submitCalls).toHaveLength(0);
    expect(withdrawCalls).toHaveLength(1);
    const params = withdrawCalls[0]!;
    expect(params).toEqual({
      subaccountId: 42n,
      protocolAsset: ASSET,
      maxFeeUsdE18: 0n,
      recipient: OWNER,
      amountInUnderlying: 1_500_000n,
      forceBatch: false,
    });

    // The typed call must carry the exact bytes the raw
    // submit(52, encodeOnchainWithdrawal(...)) path would have queued —
    // the sequencer decodes both identically.
    const flatEncoded = AbiCoder.defaultAbiCoder().encode(
      ['uint64', 'address', 'uint128', 'address', 'uint128', 'bool'],
      [
        params.subaccountId,
        params.protocolAsset,
        params.maxFeeUsdE18,
        params.recipient,
        params.amountInUnderlying,
        params.forceBatch,
      ],
    );
    expect(flatEncoded).toBe(
      encodeOnchainWithdrawal({
        subaccountId: 42,
        protocolAsset: ASSET,
        maxFeeUsd: 0,
        recipient: OWNER,
        amount: '1.5',
        decimals: 6,
        forceBatch: false,
      }),
    );
  });

  it('defaults scopes and subaccounts to empty (read-only key, all subaccounts)', async () => {
    await makeApi().setSessionKey({ signer: {} as never, sessionKey: KEY, expirySec: 123 });

    expect(submitCalls[0]!.data).toBe(
      encodeSetSessionKeyActionData({ sessionKey: KEY, expirySec: 123, scopes: [], subaccountIds: [] }),
    );
  });

  it('throws when the network has no actionManager configured', async () => {
    await expect(makeApi({}).setSessionKey({ signer: {} as never, sessionKey: KEY, expirySec: 1 })).rejects.toThrow(
      /actionManager/,
    );
  });
});
