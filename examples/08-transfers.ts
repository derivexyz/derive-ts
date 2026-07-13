/**
 * 08 — Spot transfers: moving USDC between subaccounts and to other wallets.
 *
 * Shows the two spot-transfer flows:
 *   1. transferInternal — between two of YOUR OWN subaccounts. Free.
 *   2. transferExternal — to ANOTHER owner's wallet. The recipient must be
 *      whitelisted first (updateWhitelistedRecipients), and a fee is charged.
 *
 * Both are EIP-712 signed actions: the SDK encodes the transfer, signs it
 * locally with your key, and the exchange verifies that signature — the
 * server never holds your key and cannot move funds you did not sign for.
 *
 * Prerequisites: a funded account with at least two subaccounts for step 1
 * (see the deposits example). For step 2 set RECIPIENT to another owner's
 * wallet, and optionally RECIPIENT_SUBACCOUNT_ID to one of their subaccounts
 * (omitted → the exchange creates them a new one, which costs an extra fee).
 *
 * Run:
 *   DERIVE_NETWORK=testnet PRIVATE_KEY=0x... RECIPIENT=0x... npx tsx examples/08-transfers.ts
 */
import type { DeriveClient } from '@derivexyz/derive-ts';
import { ownerClient, run } from './shared/env';

const AMOUNT_USDC = '1'; // amounts are plain decimal strings on the wire

async function usdcBalance(client: DeriveClient, subaccountId: number): Promise<string> {
  const portfolio = await client.subaccounts.get(subaccountId);
  return portfolio.collaterals.find((c) => c.asset_name === 'USDC')?.amount ?? '0';
}

run(async () => {
  const client = ownerClient();
  await client.connect();
  const subaccountIds = await client.login(); // login returns the wallet's subaccount ids

  const [senderId, siblingId] = subaccountIds;
  if (senderId === undefined) {
    throw new Error('this wallet has no subaccounts — deposit first (see the deposits example)');
  }

  // ─── 1. Internal transfer: subaccount → subaccount, same owner ───────────
  if (siblingId === undefined) {
    console.log('Only one subaccount — skipping the internal transfer.');
    console.log('(transferInternal can also CREATE a second one via newSubaccountManager, for a ~1 USD fee.)');
  } else {
    console.log(
      `USDC before: #${senderId}=${await usdcBalance(client, senderId)}  #${siblingId}=${await usdcBalance(
        client,
        siblingId,
      )}`,
    );

    // Moves between existing subaccounts are free, so maxFeeUsd can stay at
    // its "0" default. 'USDC' is resolved to the protocol asset address the
    // signature must commit to — you can also pass the address directly.
    const internal = await client.spotTransfers.transferInternal({
      subaccountId: senderId,
      toSubaccountId: siblingId,
      asset: 'USDC',
      amount: AMOUNT_USDC,
    });

    // Transfers are ACKed immediately and settled asynchronously by the
    // exchange — give it a moment before re-reading balances.
    console.log(`transfer_spot acked (op ${internal.op_uuid}); waiting for settlement...`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(
      `USDC after:  #${senderId}=${await usdcBalance(client, senderId)}  #${siblingId}=${await usdcBalance(
        client,
        siblingId,
      )}`,
    );
  }

  // ─── 2. External transfer: to a wallet you do NOT own ────────────────────
  const recipient = process.env.RECIPIENT;
  if (!recipient) {
    console.log('RECIPIENT not set — skipping the external transfer. Set RECIPIENT=0x... to run it.');
  } else {
    // External transfers only pay out to pre-approved wallets: sending to an
    // unlisted address fails with RPC error 11033 "Transfer recipient not
    // whitelisted". The whitelist is wallet-level (one list covering all
    // your subaccounts) and updating it is itself a signed action, so a
    // compromised session key without that scope cannot quietly add an
    // attacker's wallet and drain funds.
    const whitelist = await client.spotTransfers.updateWhitelistedRecipients({ add: [recipient] });
    console.log(`Whitelisted recipients: ${whitelist.whitelisted_recipients.join(', ')}`);

    const recipientSubaccountId = Number(process.env.RECIPIENT_SUBACCOUNT_ID ?? 0);
    const external = await client.spotTransfers.transferExternal({
      subaccountId: senderId,
      recipient,
      // Target one of the recipient's existing subaccounts, or let the
      // exchange create them a fresh one under a margin manager (we reuse
      // the sender's manager id for that).
      ...(recipientSubaccountId > 0
        ? { toSubaccountId: recipientSubaccountId }
        : { newSubaccountManager: (await client.subaccounts.get(senderId)).manager_id }),
      asset: 'USDC',
      amount: AMOUNT_USDC,
      // Unlike internal moves, external transfers ALWAYS charge a fee
      // (1 USD standard, plus a subaccount-creation fee when one is
      // created), so maxFeeUsd is mandatory. It is a signed cap on what the
      // exchange may deduct — the request fails rather than overpay.
      maxFeeUsd: '5',
    });
    console.log(`transfer_spot_external acked (op ${external.op_uuid}) → ${recipient}`);
  }

  await client.close();
});
