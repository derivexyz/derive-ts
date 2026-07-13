/**
 * 09 — Withdraw collateral to L1.
 *
 * Shows the signed-withdrawal flow: authenticate, check the subaccount's
 * USDC balance, then submit a `private/withdraw` that the SDK signs with
 * your key. Two things make withdrawals different from every other
 * signed action, and this example calls both out inline:
 *
 *   1. The amount is signed at the ERC-20's NATIVE decimals (USDC = 6),
 *      not the protocol's usual e18 fixed-point.
 *   2. The exchange pays out to whichever address SIGNED the action.
 *
 * Prerequisites: a subaccount holding USDC (see 03-deposit for funding).
 *
 * Run:
 *   DERIVE_NETWORK=testnet PRIVATE_KEY=0x... npx tsx examples/09-withdraw.ts
 * Optional: WITHDRAW_AMOUNT (human USDC units, default "1").
 */
import { Wallet } from 'ethers';
import { ownerClient, requireEnv, run } from './shared/env';

run(async () => {
  const client = ownerClient();
  await client.connect();

  // login() authenticates the websocket and returns the wallet's subaccount ids.
  const subaccountIds = await client.login();
  const subaccountId = subaccountIds[0];
  if (subaccountId === undefined) {
    console.log('This wallet has no subaccounts — run the deposit example first.');
    await client.close();
    return;
  }

  // Sanity-check the balance before signing anything. All portfolio figures
  // come back as human-readable decimal strings.
  const portfolio = await client.subaccounts.get(subaccountId);
  const usdc = portfolio.collaterals.find((c) => c.asset_name === 'USDC');
  const balance = Number(usdc?.amount ?? '0');
  const amount = process.env.WITHDRAW_AMOUNT ?? '1';
  console.log(`Subaccount ${subaccountId} holds ${balance} USDC; withdrawing ${amount}.`);
  if (balance < Number(amount)) {
    console.log('Insufficient USDC — deposit first or lower WITHDRAW_AMOUNT.');
    await client.close();
    return;
  }

  // WHERE THE MONEY GOES: the exchange reconstructs the withdrawal payload
  // with the payout recipient hard-fixed to the action signer. We built this
  // client with the owner key, so funds land at the owner's L1 address. If a
  // SESSION KEY had signed instead, the USDC would be paid to the session
  // key's address — never hand withdrawal scope to a throwaway key.
  const signerAddress = new Wallet(requireEnv('PRIVATE_KEY')).address;
  console.log(`Payout recipient (the signer): ${signerAddress}`);

  const result = await client.withdrawals.withdraw({
    subaccountId,
    asset: 'USDC', // currency name or the protocol spot-asset address
    // THE ONE NON-e18 AMOUNT: every other signed action (orders, transfers)
    // scales amounts to 18 decimals on the wire, but withdrawals are signed
    // in the ERC-20's own decimals so the on-chain transfer matches the
    // signature exactly. Pass human units ("1" = 1 USDC); the SDK looks up
    // the token's decimals (6 for USDC) and scales for you.
    amount,
    // Optional guard: assert the decimals you *think* the token has. If the
    // exchange's metadata disagrees, the SDK fails fast client-side instead
    // of submitting a signature that can never verify.
    decimals: 6,
    // Fee cap in USD. Defaults to 1 (or 10 with forceBatch, which pays extra
    // to have the withdrawal batch proven to L1 immediately).
    maxFeeUsd: '1',
  });

  // The withdrawal is now queued for the next proven batch; track it on-chain
  // or via deposits/withdrawal history once the batch settles.
  console.log(`Withdrawal accepted: op_uuid=${result.op_uuid} operation_id=${result.operation_id}`);

  await client.close();
});
