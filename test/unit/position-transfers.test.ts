import { Wallet } from 'ethers';
import { describe, expect, it } from 'vitest';
import type { ClientContext } from '../../src/api/context';
import { PositionTransfersApi, type TransferPositionsParams } from '../../src/api/positionTransfers';
import { encodeRfqExecute, encodeRfqQuote } from '../../src/codecs/rfq';
import { NETWORKS } from '../../src/config/networks';
import { SignedAction } from '../../src/signing/action';
import { domainSeparator } from '../../src/signing/eip712';
import type { TransferPositionsEdgeRpcParams, TransferPositionsWireResponse } from '../../src/types';

const wallet = new Wallet('0x' + '11'.repeat(32));
const ETH_ASSET = '0x' + 'aa'.repeat(20);
const BTC_ASSET = '0x' + 'bb'.repeat(20);

function fixture() {
  const instrumentRequests: string[] = [];
  const submissions: TransferPositionsEdgeRpcParams[] = [];
  const response = { maker_quote: {}, taker_quote: {} } as unknown as TransferPositionsWireResponse;
  const ctx = {
    network: NETWORKS.local,
    logger: () => {},
    credentials: () => ({ ownerAddress: wallet.address, signer: wallet }),
    send: async (method: string, params: Record<string, unknown>) => {
      if (method === 'public/get_instrument') {
        const instrumentName = params.instrument_name as string;
        instrumentRequests.push(instrumentName);
        if (instrumentName === 'ETH-PERP') {
          return { base_asset_address: ETH_ASSET, base_asset_sub_id: '0' };
        }
        if (instrumentName === 'BTC-PERP') {
          return { base_asset_address: BTC_ASSET, base_asset_sub_id: '9' };
        }
        throw new Error(`unknown test instrument ${instrumentName}`);
      }
      if (method === 'private/transfer_positions') {
        submissions.push(params as unknown as TransferPositionsEdgeRpcParams);
        return response;
      }
      throw new Error(`unexpected method ${method}`);
    },
  } as unknown as ClientContext;
  return { api: new PositionTransfersApi(ctx), instrumentRequests, submissions, response };
}

function params(overrides: Partial<TransferPositionsParams> = {}): TransferPositionsParams {
  return {
    makerSubaccountId: 10,
    takerSubaccountId: 20,
    makerDirection: 'buy',
    // Deliberately unsorted: both signed and wire legs must be canonical.
    legs: [
      { instrumentName: 'ETH-PERP', amount: '3', price: '2.5', direction: 'buy' },
      { instrumentName: 'BTC-PERP', amount: '4', price: '0.5', direction: 'sell' },
    ],
    makerNonce: '111',
    takerNonce: '222',
    signatureExpirySec: 1_900_000_000,
    ...overrides,
  };
}

describe('PositionTransfersApi', () => {
  it('builds the canonical zero-fee maker/taker payload and signs both RFQ actions', async () => {
    const { api, submissions, response } = fixture();
    const result = await api.transferPositions(params());

    expect(result).toBe(response);
    expect(submissions).toHaveLength(1);
    const payload = submissions[0]!;
    expect(payload.wallet).toBe(wallet.address);
    expect(payload.maker_params).toMatchObject({
      subaccount_id: 10,
      direction: 'buy',
      max_fee: '0.0',
      nonce: '111',
      signer: wallet.address,
      signature_expiry_sec: 1_900_000_000,
    });
    expect(payload.taker_params).toMatchObject({
      subaccount_id: 20,
      direction: 'sell',
      max_fee: '0.0',
      nonce: '222',
      signer: wallet.address,
      signature_expiry_sec: 1_900_000_000,
    });
    expect(payload.maker_params.legs).toEqual([
      { instrument_name: 'BTC-PERP', amount: '4.0', price: '0.5', direction: 'sell' },
      { instrument_name: 'ETH-PERP', amount: '3.0', price: '2.5', direction: 'buy' },
    ]);
    expect(payload.taker_params.legs).toEqual(payload.maker_params.legs);

    const resolvedLegs = [
      {
        instrumentName: 'BTC-PERP',
        assetAddress: BTC_ASSET,
        subId: '9',
        amount: 4n * 10n ** 18n,
        price: 5n * 10n ** 17n,
        direction: 'sell' as const,
      },
      {
        instrumentName: 'ETH-PERP',
        assetAddress: ETH_ASSET,
        subId: '0',
        amount: 3n * 10n ** 18n,
        price: 25n * 10n ** 17n,
        direction: 'buy' as const,
      },
    ];
    const makerAction = new SignedAction(
      {
        subaccountId: 10,
        nonce: '111',
        module: NETWORKS.local.modules.rfq,
        data: encodeRfqQuote({ maxFee: 0n, direction: 'buy', legs: resolvedLegs }),
        expirySec: 1_900_000_000,
        owner: wallet.address,
        signer: wallet.address,
      },
      domainSeparator(NETWORKS.local),
    ).sign(wallet);
    const takerAction = new SignedAction(
      {
        subaccountId: 20,
        nonce: '222',
        module: NETWORKS.local.modules.rfq,
        data: encodeRfqExecute({ maxFee: 0n, direction: 'sell', legs: resolvedLegs }),
        expirySec: 1_900_000_000,
        owner: wallet.address,
        signer: wallet.address,
      },
      domainSeparator(NETWORKS.local),
    ).sign(wallet);
    expect(payload.maker_params.signature).toBe(makerAction.signature);
    expect(payload.taker_params.signature).toBe(takerAction.signature);
  });

  it('caches instrument identity across transfers', async () => {
    const { api, instrumentRequests } = fixture();
    await api.transferPositions(params());
    await api.transferPositions(params({ makerNonce: '333', takerNonce: '444' }));
    expect(instrumentRequests.sort()).toEqual(['BTC-PERP', 'ETH-PERP']);
  });

  it('rejects route-invalid subaccounts, nonces, and empty legs before sending', async () => {
    const { api, submissions } = fixture();
    await expect(api.transferPositions(params({ takerSubaccountId: 10 }))).rejects.toThrow(/different/);
    await expect(api.transferPositions(params({ makerNonce: '111', takerNonce: '111' }))).rejects.toThrow(/different/);
    await expect(api.transferPositions(params({ legs: [] }))).rejects.toThrow(/at least one leg/);
    expect(submissions).toHaveLength(0);
  });
});
