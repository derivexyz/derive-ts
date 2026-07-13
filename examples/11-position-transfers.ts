/**
 * 11 — Position transfers: moving an open perp/option position between two
 * subaccounts owned by the same wallet.
 *
 * Position transfers execute as a zero-fee RFQ trade. The SDK resolves each
 * instrument, sorts the shared leg bundle, signs the maker quote and matching
 * taker execute, then calls private/transfer_positions.
 *
 * This example transfers the maker subaccount's full first open position to
 * the taker subaccount at mark price. Set POSITION_INSTRUMENT to select a
 * different open position.
 *
 * Prerequisites: one wallet with at least two subaccounts, an open position in
 * the first subaccount, and enough margin in the second subaccount to receive
 * it.
 *
 * Run:
 *   DERIVE_NETWORK=testnet PRIVATE_KEY=0x... npx tsx examples/11-position-transfers.ts
 */
import { ownerClient, run } from './shared/env';

run(async () => {
  const client = ownerClient();
  await client.connect();
  const subaccountIds = await client.login();
  const [makerSubaccountId, takerSubaccountId] = subaccountIds;

  if (makerSubaccountId === undefined || takerSubaccountId === undefined) {
    throw new Error('position transfers need two subaccounts owned by this wallet');
  }

  try {
    const makerPortfolio = await client.subaccounts.get(makerSubaccountId);
    const wantedInstrument = process.env.POSITION_INSTRUMENT;
    const position = makerPortfolio.positions.find(
      (candidate) =>
        Number(candidate.amount) !== 0 &&
        (wantedInstrument === undefined || candidate.instrument_name === wantedInstrument),
    );
    if (!position) {
      const detail = wantedInstrument ? ` in ${wantedInstrument}` : '';
      console.log(`Subaccount ${makerSubaccountId} has no open position${detail}; nothing to transfer.`);
      return;
    }

    const makerIsShort = position.amount.startsWith('-');
    const amount = makerIsShort ? position.amount.slice(1) : position.amount;
    console.log(
      `Transferring ${amount} ${position.instrument_name} from #${makerSubaccountId} to #${takerSubaccountId}`,
    );

    // With makerDirection='buy', the leg direction is the maker's actual
    // trade: buy closes/transfers a short; sell closes/transfers a long. The
    // SDK derives the taker's opposite quote direction and signs both sides.
    const result = await client.positionTransfers.transferPositions({
      makerSubaccountId,
      takerSubaccountId,
      makerDirection: 'buy',
      legs: [
        {
          instrumentName: position.instrument_name,
          amount,
          price: position.mark_price,
          direction: makerIsShort ? 'buy' : 'sell',
        },
      ],
    });

    console.log(
      `Position transfer filled: maker=${result.maker_quote.status}, taker=${result.taker_quote.status}, ` +
        `fees=$${result.maker_quote.fee}/$${result.taker_quote.fee}`,
    );
  } finally {
    await client.close();
  }
});
