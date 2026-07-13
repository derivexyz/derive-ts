import type { ResultFor } from '@derivexyz/derive-ts';
import { ownerClient, run } from './shared/env';

// Wire types are addressable by RPC method name via ResultFor / ParamsOf.
type Quote = ResultFor<'private/poll_quotes'>['quotes'][number];

/**
 * RFQ taker flow: request quotes for a package, wait for makers to answer,
 * then execute the best quote.
 *
 * The RFQ mental model:
 *   1. The taker sends an *unpriced* RFQ — legs with instrument/amount/direction
 *      stated from the taker's point of view. Nothing is signed yet.
 *   2. Makers respond with signed quotes. A quote with direction 'sell' offers
 *      to sell the package exactly as the taker stated it (i.e. lets a buying
 *      taker buy); 'buy' offers the reverse.
 *   3. The taker executes ONE quote. This is the taker's only signature: an
 *      EIP-712 commitment to the maker's exact legs and prices, in the
 *      opposite direction of the quote. The SDK flips the direction and
 *      copies the legs from the quote for you — you cannot execute at any
 *      price other than the one the maker signed.
 *
 * Prerequisites: a funded subaccount, and active makers quoting RFQs on the
 * chosen network (on testnet quotes may take a few seconds — or never arrive,
 * which this example handles by cancelling the RFQ).
 *
 * Run: DERIVE_NETWORK=testnet PRIVATE_KEY=0x... npx tsx examples/06-rfq-taker.ts
 */

// A well-known instrument on every network. Discover others via
// client.marketData.getInstruments() instead of hardcoding names.
const INSTRUMENT = 'ETH-PERP';
const SIZE = '0.1';

run(async () => {
  const client = ownerClient();
  await client.connect();
  const subaccountIds = await client.login(); // authenticates the ws; RFQ endpoints are all private
  const subaccountId = subaccountIds[0];
  if (subaccountId === undefined) {
    console.log('No subaccounts for this wallet — deposit first (see the deposit example).');
    return;
  }

  try {
    // Mark price gives us a reference to judge quotes against.
    const ticker = await client.marketData.getTicker(INSTRUMENT);
    console.log(`${INSTRUMENT} mark price: ${ticker.M}`);

    // 1. Request quotes: one leg, buying SIZE contracts. Amounts are always
    //    positive — direction carries the sign. maxTotalCost (here: 5% above
    //    mark) makes the exchange reject any fill costing more, a second
    //    safety net on top of picking the best quote ourselves.
    const rfq = await client.rfq.sendRfq({
      subaccountId,
      legs: [{ instrumentName: INSTRUMENT, amount: SIZE, direction: 'buy' }],
      maxTotalCost: (Number(ticker.M) * Number(SIZE) * 1.05).toFixed(2),
    });
    console.log(`RFQ ${rfq.rfq_id} open until ${new Date(rfq.valid_until).toISOString()}`);

    // 2. Poll for maker quotes. (client.rfq.getBestQuote() is a one-shot
    //    alternative where the exchange picks the best open quote for you.)
    let quotes: Quote[] = [];
    for (let attempt = 0; attempt < 10 && quotes.length === 0; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const poll = await client.rfq.pollQuotes({ subaccountId, rfqId: rfq.rfq_id, status: 'open' });
      // We are buying, so only maker 'sell' quotes are executable by us.
      quotes = poll.quotes.filter((quote) => quote.direction === 'sell');
      console.log(`poll ${attempt + 1}: ${quotes.length} executable quote(s)`);
    }
    if (quotes.length === 0) {
      // No makers answered — release the RFQ so it doesn't linger in their books.
      await client.rfq.cancelRfq({ subaccountId, rfqId: rfq.rfq_id });
      console.log('No quotes arrived; RFQ cancelled. Try again when makers are active.');
      return;
    }

    // 3. Pick the best quote. Single leg + buying, so best = lowest price.
    //    (Wire decimals are human-unit strings; Number() is fine for ranking.)
    const best = quotes.reduce((a, b) => (Number(a.legs[0]?.price) <= Number(b.legs[0]?.price) ? a : b));
    console.log(`Best quote ${best.quote_id}: ${best.legs[0]?.price} from ${best.wallet}`);

    // 4. Execute it. maxFee (USD) is part of the signed payload — the trade is
    //    rejected rather than charged more. enableTakerProtection additionally
    //    rejects the fill if a better quote has since arrived.
    const fill = await client.rfq.executeQuote({
      subaccountId,
      quote: best,
      maxFee: '10',
      enableTakerProtection: true,
    });

    console.log(`Executed: status=${fill.status} fee=$${fill.fee} filled=${fill.fill_pct}`);
    for (const leg of fill.legs) {
      console.log(`  ${leg.direction} ${leg.amount} ${leg.instrument_name} @ ${leg.price}`);
    }
  } finally {
    await client.close();
  }
});
