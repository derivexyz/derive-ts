/**
 * 07 — RFQ maker: a minimal bounded quoting loop.
 *
 * RFQ trading has two sides: a taker sends an RFQ (a package of unpriced
 * legs), makers answer with signed quotes, and the taker executes the one it
 * likes. This example plays the MAKER — it polls for open RFQs and answers
 * each with a naive two-sided quote priced off the live mark. It is the
 * skeleton of a market-making loop, deliberately bounded so it terminates.
 *
 * Prerequisites: a funded subaccount (quotes are margin-checked like orders)
 * and someone sending RFQs — pair this with a taker, e.g. the RFQ taker example.
 *
 * Run: DERIVE_NETWORK=testnet PRIVATE_KEY=0x... npx tsx examples/07-rfq-maker.ts
 */
import { ownerClient, run } from './shared/env';

const ROUNDS = 5; // bounded on purpose — a real maker would loop until shutdown
const POLL_INTERVAL_MS = 3_000;
const SPREAD = 0.005; // quote 0.5% spread around mark on every leg

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Snap a raw price onto the instrument's tick grid — the exchange rejects off-tick prices. */
function onTick(price: number, tickSize: string): string {
  const decimals = (tickSize.split('.')[1] ?? '').length;
  return (Math.round(price / Number(tickSize)) * Number(tickSize)).toFixed(decimals);
}

run(async () => {
  const client = ownerClient();
  await client.connect();
  const subaccounts = await client.login(); // quoting is private + signed; login authenticates the ws
  const subaccountId = subaccounts[0];
  if (subaccountId === undefined) throw new Error('No subaccounts — deposit first (see the deposit example).');

  const quoted = new Set<string>(); // rfq_ids already answered, so later polls don't re-quote them

  try {
    for (let round = 1; round <= ROUNDS; round += 1) {
      // 'open' = still inside its quoting window and unfilled. Only RFQs that
      // are public, or that name our wallet as a counterparty, show up here.
      const { rfqs } = await client.rfq.pollRfqs({ subaccountId, status: 'open' });
      const fresh = rfqs.filter((rfq) => !quoted.has(rfq.rfq_id));
      console.log(`round ${round}/${ROUNDS}: ${rfqs.length} open RFQ(s), ${fresh.length} new`);

      for (const rfq of fresh) {
        // Fetch a mark price and tick size per leg. Leg directions are the
        // TAKER's perspective and must be echoed back unchanged — a quote
        // reprices the taker's exact package, it never restructures it.
        const priced = await Promise.all(
          rfq.legs.map(async (leg) => {
            const [ticker, instrument] = await Promise.all([
              client.marketData.getTicker(leg.instrument_name),
              client.marketData.getInstrument(leg.instrument_name),
            ]);
            return { leg, mark: Number(ticker.M), tickSize: instrument.tick_size };
          }),
        );
        const notionalUsd = priced.reduce((sum, { leg, mark }) => sum + Number(leg.amount) * mark, 0);

        // Quote both sides: 'sell' offers the package to a buying taker, 'buy'
        // bids for it. The spread goes in our favor per side — selling the
        // package means pricing OVER mark on legs the taker buys and UNDER
        // mark on legs the taker sells; bidding flips both.
        for (const direction of ['sell', 'buy'] as const) {
          const legs = priced.map(({ leg, mark, tickSize }) => ({
            instrumentName: leg.instrument_name,
            amount: leg.amount, // wire decimal string — DecimalLike takes it as-is
            direction: leg.direction,
            price: onTick(
              mark * (1 + ((direction === 'sell') === (leg.direction === 'buy') ? SPREAD : -SPREAD)),
              tickSize,
            ),
          }));
          const quote = await client.rfq.sendQuote({
            subaccountId,
            rfqId: rfq.rfq_id,
            direction,
            legs,
            // Part of the SIGNED payload: the worst total USD fee we authorize
            // if this quote fills. Generous cap, well above real maker fees.
            maxFee: Math.max(10, notionalUsd * 0.003).toFixed(2),
            // MMP (market-maker protection) mass-cancels your resting quotes
            // when fills in a rolling window breach configured limits, so one
            // fast market can't sweep everything you have out. Flip to true
            // once your subaccount has an MMP config.
            mmp: false,
          });
          const summary = legs.map((leg) => `${leg.instrumentName}@${leg.price}`).join(' + ');
          console.log(`  quoted ${direction} on rfq ${rfq.rfq_id}: quote ${quote.quote_id} (${summary})`);
        }
        quoted.add(rfq.rfq_id);
      }
      if (round < ROUNDS) await sleep(POLL_INTERVAL_MS);
    }
  } finally {
    // Leave nothing resting: a signed quote stays executable until it expires
    // or is cancelled, even after this process exits.
    await client.rfq.cancelBatchQuotes({ subaccountId });
    await client.close();
  }
});
