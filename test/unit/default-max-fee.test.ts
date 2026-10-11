import { Wallet } from 'ethers';
import { describe, expect, it } from 'vitest';
import type { ClientContext } from '../../src/api/context';
import type { MarketDataApi } from '../../src/api/marketData';
import { OrdersApi, type PlaceOrderParams } from '../../src/api/orders';
import { NETWORKS } from '../../src/config/networks';

const SIGNER = new Wallet('0x' + '11'.repeat(32));

interface Market {
  takerFeeRate: number;
  baseFee: number;
  amountStep: number;
  index: number;
}

// Testnet values for 2026-10 ETH options and BTC perps.
const ETH_OPTION: Market = { takerFeeRate: 0.0003, baseFee: 0.5, amountStep: 0.01, index: 2553.5 };
const BTC_PERP: Market = { takerFeeRate: 0.0003, baseFee: 0.01, amountStep: 0.0001, index: 60_000 };

/** OrdersApi double that returns the per-unit max fee `place` signs when the caller omits it. */
async function defaultMaxFee(market: Market, order: Partial<PlaceOrderParams>): Promise<number> {
  let signedMaxFee = NaN;
  const ctx = {
    network: NETWORKS.testnet,
    credentials: () => ({ ownerAddress: SIGNER.address, signer: SIGNER }),
    send: async (_method: string, params: { max_fee: string }) => {
      signedMaxFee = Number(params.max_fee);
      return {};
    },
  } as unknown as ClientContext;
  const marketData = {
    getInstrument: async () => ({
      base_asset_address: '0x' + 'ab'.repeat(20),
      base_asset_sub_id: '1',
      taker_fee_rate: String(market.takerFeeRate),
      base_fee: String(market.baseFee),
      amount_step: String(market.amountStep),
    }),
    getTicker: async () => ({ I: String(market.index) }),
  } as unknown as MarketDataApi;

  await new OrdersApi(ctx, marketData).place({
    subaccountId: 1,
    instrumentName: 'X',
    direction: 'buy',
    amount: '1',
    limitPrice: '30',
    ...order,
  });
  return signedMaxFee;
}

/**
 * The exchange's taker-side check: the signed per-unit max fee must cover
 * 2x the rate fee on the index, the base fee spread over the filled amount,
 * and the extra fee spread over the order amount.
 */
function requiredMaxFee(market: Market, order: { filled: number; amount: number; extraFee?: number }): number {
  return (
    2 * market.takerFeeRate * market.index +
    market.baseFee / Math.max(order.filled, market.amountStep) +
    (order.extraFee ?? 0) / order.amount
  );
}

describe('OrdersApi default max fee', () => {
  it('covers the base fee on a minimum-size option order', async () => {
    // The base fee is charged once per match, so a 0.1 option order owes 5 per unit of it.
    const maxFee = await defaultMaxFee(ETH_OPTION, { amount: '0.1' });
    expect(maxFee).toBeGreaterThanOrEqual(requiredMaxFee(ETH_OPTION, { filled: 0.1, amount: 0.1 }));
  });

  it('covers a taker fill of 1/1000 of the order', async () => {
    // A crossing order matches only the liquidity resting inside its limit.
    const maxFee = await defaultMaxFee(ETH_OPTION, { amount: '100' });
    expect(maxFee).toBeGreaterThanOrEqual(requiredMaxFee(ETH_OPTION, { filled: 0.1, amount: 100 }));
  });

  it('covers the extra fee', async () => {
    const maxFee = await defaultMaxFee(BTC_PERP, { amount: '1', limitPrice: '60000', extraFee: '50' });
    expect(maxFee).toBeGreaterThanOrEqual(requiredMaxFee(BTC_PERP, { filled: 1, amount: 1, extraFee: 50 }));
  });

  it.each(['1', '10000'])('caps the base fee headroom at 1000 base fees for a %s BTC order', async (amount) => {
    // Spreading the base fee over one amount step instead would let the
    // signature allow ~$1M of base fees on a max-size BTC perp order.
    const maxFee = await defaultMaxFee(BTC_PERP, { amount, limitPrice: '60000' });
    const rateHeadroom = 3 * BTC_PERP.takerFeeRate * BTC_PERP.index;
    const baseFeeAllowance = (maxFee - rateHeadroom) * Number(amount);
    expect(baseFeeAllowance).toBeLessThanOrEqual(1000 * BTC_PERP.baseFee + 0.01);
  });

  it('reads a bigint limit price at e18 scale', async () => {
    // A raw Number(bigint) would sign a ~1e18 USD fee cap, which removes the cap.
    const fromString = await defaultMaxFee(BTC_PERP, { limitPrice: '70000' });
    const fromBigint = await defaultMaxFee(BTC_PERP, { limitPrice: 70_000n * 10n ** 18n });
    expect(fromBigint).toBe(fromString);
  });
});
