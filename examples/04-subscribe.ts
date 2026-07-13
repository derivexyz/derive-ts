import { channel, DeriveClient } from '@derivexyz/derive-ts';
import { network, run } from './shared/env';

/**
 * 04 — Websocket subscriptions: two consumption styles over one socket.
 *
 * Shows:
 *   1. Callback style: subscribe() to the ETH-PERP orderbook and handle
 *      each snapshot in a handler, then unsubscribe().
 *   2. Iterator style: for-await over stream() of the public trades feed,
 *      with a timeout guard so a quiet market doesn't hang the example.
 *
 * Both channels here are PUBLIC market data, so no PRIVATE_KEY and no
 * login() is needed — connect() alone opens the socket. Private channels
 * (e.g. `{subaccount_id}.orders`) additionally require login().
 *
 * Run: DERIVE_NETWORK=testnet npx tsx examples/04-subscribe.ts
 */

// A well-known instrument. Discover others with client.marketData.getInstruments().
const INSTRUMENT = 'ETH-PERP';
const UPDATES_TO_SHOW = 3;

run(async () => {
  const client = new DeriveClient({ network: network() });
  // Subscriptions live on the websocket; connect() must come first.
  await client.connect();

  // --- Style 1: callback handler -----------------------------------------
  // channel() builds the concrete channel name from its template and params,
  // and carries the payload type — the handler below is fully typed with no
  // casts. Params are wire strings: group = price grouping, depth = levels.
  const bookChannel = channel('orderbook.{instrument_name}.{group}.{depth}', {
    instrument_name: INSTRUMENT,
    group: '1',
    depth: '10',
  });

  console.log(`Subscribing to ${bookChannel.name} ...`);
  let updates = 0;
  let resolveDone: () => void = () => {};
  const sawEnoughUpdates = new Promise<void>((resolve) => {
    resolveDone = resolve;
  });

  const subscription = await client.subscriptions.subscribe(bookChannel, (snapshot) => {
    // Each notification is a full top-of-book snapshot, not a diff.
    // Prices/amounts are decimal strings; the book can be one-sided on
    // a quiet testnet market, hence the fallbacks.
    const bestBid = snapshot.bids[0];
    const bestAsk = snapshot.asks[0];
    console.log(
      `book #${snapshot.publish_id}: ` +
        `bid ${bestBid ? `${bestBid.amount} @ ${bestBid.price}` : '(empty)'} | ` +
        `ask ${bestAsk ? `${bestAsk.amount} @ ${bestAsk.price}` : '(empty)'}`,
    );
    updates += 1;
    if (updates >= UPDATES_TO_SHOW) resolveDone();
  });

  await sawEnoughUpdates;
  // Handlers on a channel share one wire subscription; this removes ours
  // and, as the last handler, sends the actual unsubscribe RPC.
  await subscription.unsubscribe();
  console.log(`Unsubscribed from ${bookChannel.name}.`);

  // --- Style 2: async iterator --------------------------------------------
  // stream() wraps the same pub/sub as an AsyncIterableIterator: it
  // subscribes on the first next() and unsubscribes when the loop ends —
  // `break` (or return()/throw()) is the cleanup, no handle to keep.
  const tradesChannel = channel('trades.{instrument_name}', { instrument_name: INSTRUMENT });
  console.log(`Streaming ${tradesChannel.name} (up to ${UPDATES_TO_SHOW} batches, 30s max) ...`);

  const trades = client.subscriptions.stream(tradesChannel);
  // Trades only arrive when someone trades. Ending the iterator from the
  // outside (return()) makes the for-await exit cleanly on a quiet market.
  const quietMarketGuard = setTimeout(() => void trades.return?.(), 30_000);

  let batches = 0;
  for await (const batch of trades) {
    // Each notification is a batch of one or more public trades.
    for (const trade of batch) {
      console.log(`trade: ${trade.direction} ${trade.trade_amount} ${trade.instrument_name} @ ${trade.trade_price}`);
    }
    batches += 1;
    if (batches >= UPDATES_TO_SHOW) break; // break unsubscribes for us
  }
  clearTimeout(quietMarketGuard);
  if (batches === 0) console.log('No trades within 30s — quiet market, moving on.');

  // Close the socket so the process can exit.
  await client.close();
});
