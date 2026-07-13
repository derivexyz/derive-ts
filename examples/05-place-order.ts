/**
 * 05 — Order lifecycle: place, inspect, cancel.
 *
 * Places a limit BUY on ETH-PERP priced well below the mark so it rests on
 * the book (nothing fills), lists it via getOpenOrders, then cancels it.
 *
 * The mental model to take away:
 *  - Orders are EIP-712 "signed actions": place() encodes the trade, signs it
 *    locally with your key, and sends params + signature. The exchange can
 *    only settle exactly what you signed — it never holds your key.
 *  - Every decimal on the wire is a STRING ("2500.5", never 2500.5). The SDK
 *    accepts string | number | bigint and converts to 18-decimal fixed point
 *    before signing, so no float rounding ever reaches the signature.
 *
 * Prerequisites: a wallet with a funded subaccount (see the deposit example).
 * Run: DERIVE_NETWORK=testnet PRIVATE_KEY=0x... npx tsx examples/05-place-order.ts
 */
import { ownerClient, run } from './shared/env';

run(async () => {
  const client = ownerClient();
  await client.connect(); // open the websocket...
  await client.login(); // ...and authenticate it — required for all private/* methods

  try {
    const [subaccountId] = await client.subaccounts.list();
    if (subaccountId === undefined) throw new Error('No subaccounts — fund the wallet first.');

    // ETH-PERP exists on every network so it makes a safe default; in general
    // discover live names via marketData.getInstruments() instead of hardcoding.
    const instrumentName = 'ETH-PERP';
    const [instrument, ticker] = await Promise.all([
      client.marketData.getInstrument(instrumentName),
      client.marketData.getTicker(instrumentName),
    ]);

    // Bid 20% under the mark (ticker.M) so the order rests instead of filling,
    // snapped down onto the instrument's tick grid — off-tick prices are rejected.
    const tick = Number(instrument.tick_size);
    const tickDecimals = instrument.tick_size.split('.')[1]?.length ?? 0;
    const limitPrice = (Math.floor((Number(ticker.M) * 0.8) / tick) * tick).toFixed(tickDecimals);
    console.log(`mark ${ticker.M} → bidding ${limitPrice} for ${instrument.minimum_amount} ${instrumentName}`);

    // maxFee is the fee cap baked into the signature: the exchange charges its
    // normal taker/maker fee regardless, but can never take more than you signed.
    // Left unset it defaults to 3x the current taker cost — fine headroom for a
    // one-off order; market makers should pass it explicitly.
    const { order } = await client.orders.place({
      subaccountId,
      instrumentName,
      direction: 'buy',
      amount: instrument.minimum_amount, // smallest size the instrument allows
      limitPrice,
      // timeInForce: 'post_only' would reject (not fill) if the price ever crossed
    });
    console.log(`placed ${order.order_id}: ${order.order_status}, ${order.amount} @ ${order.limit_price}`);

    const open = await client.orders.getOpenOrders(subaccountId);
    for (const o of open) {
      console.log(`open: ${o.order_id} ${o.direction} ${o.amount} ${o.instrument_name} @ ${o.limit_price}`);
    }

    // Cancelling needs only the authenticated session, not a signature — the
    // signed action authorizes a trade; withdrawing it is a plain private call.
    const cancelled = await client.orders.cancel({ subaccountId, orderId: order.order_id, instrumentName });
    console.log(`cancelled ${cancelled.order_id}: ${cancelled.order_status}`);
  } finally {
    await client.close(); // always release the websocket so the process can exit
  }
});
