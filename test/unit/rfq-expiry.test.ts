import { Wallet } from 'ethers';
import { describe, expect, it } from 'vitest';
import type { ClientContext } from '../../src/api/context';
import { RfqApi } from '../../src/api/rfq';
import { NETWORKS } from '../../src/config/networks';

const SIGNER = new Wallet('0x' + '11'.repeat(32));
const LEG = { instrumentName: 'ETH-PERP', amount: '1', price: '2500', direction: 'buy' as const };

/** The longest RFQ window the exchange uses. */
const RFQ_WINDOW_SEC = 30 * 60;

/** RfqApi double that returns the signature expiry of the signed request it sends. */
async function defaultExpirySec(send: (rfq: RfqApi) => Promise<unknown>): Promise<number> {
  let expirySec = NaN;
  const ctx = {
    network: NETWORKS.testnet,
    credentials: () => ({ ownerAddress: SIGNER.address, signer: SIGNER }),
    send: async (method: string, params: { signature_expiry_sec: number }) => {
      if (method === 'public/get_instrument') {
        return { base_asset_address: '0x' + 'ab'.repeat(20), base_asset_sub_id: '0' };
      }
      expirySec = params.signature_expiry_sec;
      return {};
    },
  } as unknown as ClientContext;
  await send(new RfqApi(ctx));
  return expirySec;
}

describe('RfqApi default signature expiry', () => {
  // The API rejects RFQ signatures that expire less than 60s after the
  // RFQ's valid_until, or more than one day from now.
  const createdSec = Math.floor(Date.now() / 1000);
  const minExpirySec = createdSec + RFQ_WINDOW_SEC + 60;
  const maxExpirySec = createdSec + 24 * 60 * 60;

  it('lets a taker execute a quote on a brand-new RFQ', async () => {
    const expirySec = await defaultExpirySec((rfq) =>
      rfq.executeQuote({
        subaccountId: 1,
        quote: {
          rfq_id: 'r',
          quote_id: 'q',
          direction: 'sell',
          legs: [{ instrument_name: LEG.instrumentName, amount: LEG.amount, price: LEG.price, direction: 'sell' }],
        },
        maxFee: '1',
      }),
    );
    expect(expirySec).toBeGreaterThanOrEqual(minExpirySec);
    expect(expirySec).toBeLessThanOrEqual(maxExpirySec);
  });

  it('lets a maker quote a brand-new RFQ', async () => {
    const expirySec = await defaultExpirySec((rfq) =>
      rfq.sendQuote({ subaccountId: 1, rfqId: 'r', direction: 'sell', legs: [LEG], maxFee: '1' }),
    );
    expect(expirySec).toBeGreaterThanOrEqual(minExpirySec);
    expect(expirySec).toBeLessThanOrEqual(maxExpirySec);
  });
});
