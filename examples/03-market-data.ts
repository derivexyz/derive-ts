import { DeriveClient } from '@derivexyz/derive-ts';
import { network, run } from './shared/env';

/**
 * 03 — Public market data (no wallet, no login).
 *
 * Everything under `client.marketData` hits public endpoints: no private
 * key, no session key, no `login()`. This example never even calls
 * `connect()` — until a websocket is opened the client transparently
 * sends each request over HTTPS, so there is nothing to close either.
 *
 * Shown here:
 *   - getAllCurrencies:  every listed currency + its live spot price
 *   - getInstruments:    paginated instrument listings (typed, filterable)
 *   - getTicker:         index vs mark price and the top of the book
 *
 * Run:  DERIVE_NETWORK=testnet npx tsx examples/03-market-data.ts
 * (PRIVATE_KEY is NOT required — that is the point of this example.)
 */
run(async () => {
  // No `wallet` option: a keyless client can use every public/* endpoint.
  const client = new DeriveClient({ network: network() });

  // ── Currencies ─────────────────────────────────────────────────────────
  const currencies = await client.marketData.getAllCurrencies();
  console.log(`${currencies.length} currencies listed. First five by spot price:`);
  for (const c of currencies.slice(0, 5)) {
    console.log(`  ${c.currency.padEnd(8)} spot=$${c.spot_price}`);
  }

  // ── Instruments ────────────────────────────────────────────────────────
  // Listings are paginated and filtered server-side by type/currency, so
  // you never have to hardcode names — discover them. All numeric fields
  // arrive as decimal strings to avoid float precision loss.
  const ethOptions = await client.marketData.getInstruments({
    instrumentType: 'option',
    currency: 'ETH',
    pageSize: 3,
  });
  console.log(`\n${ethOptions.pagination.count} live ETH options. A sample:`);
  for (const inst of ethOptions.instruments) {
    console.log(`  ${inst.instrument_name}  tick=${inst.tick_size}  taker fee rate=${inst.taker_fee_rate}`);
  }

  const ethPerps = await client.marketData.getInstruments({ instrumentType: 'perp', currency: 'ETH' });
  // There is one perp per currency; on every Derive network it is ETH-PERP.
  const perpName = ethPerps.instruments[0]?.instrument_name ?? 'ETH-PERP';

  // ── Ticker ─────────────────────────────────────────────────────────────
  // The ticker uses terse one-letter keys because the same snapshot is
  // streamed at high frequency on the `ticker_slim.*` ws channel:
  //   I = index (external spot oracle)   M = mark (fair value; margin uses this)
  //   b/B = best bid price/size          a/A = best ask price/size
  const ticker = await client.marketData.getTicker(perpName);
  console.log(`\n${perpName} @ ${new Date(ticker.t).toISOString()}`);
  console.log(`  index (I): $${ticker.I}`);
  console.log(`  mark  (M): $${ticker.M}`);
  console.log(`  book:      ${ticker.B} @ $${ticker.b}  |  ${ticker.A} @ $${ticker.a}`);
  console.log(`  spread:    $${(Number(ticker.a) - Number(ticker.b)).toFixed(2)}`);
  console.log(`  24h vol:   $${ticker.stats.v} across ${ticker.stats.n} trades`);

  // No client.close(): we never called connect(), so no ws was opened.
});
