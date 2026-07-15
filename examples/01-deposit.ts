/**
 * 01 — Deposit: your first deposit creates your Derive account.
 *
 * This is the true first step on Derive v3. There is no separate "create
 * account" call — an account (and its first subaccount) comes into existence
 * when a deposit is first credited to your wallet. Session keys, trading,
 * and everything else come after (see example 02).
 *
 * Deposits are NOT signed API actions. Funds arrive through one of two
 * deliberately distinct flows, and this example walks both:
 *
 *   (A) Deposit address (CEX-style): register a deterministic address the
 *       exchange watches. Send tokens to it from any wallet or exchange;
 *       they are credited asynchronously, creating your subaccount.
 *       No RPC node needed.
 *   (B) Contract call (self-custody): YOUR wallet submits the on-chain
 *       ActionManager transaction (ERC-20 approve + deposit). Requires an
 *       RPC endpoint for the chain the protocol is deployed on.
 *
 * Prerequisites: PRIVATE_KEY funded with the deposit token (and gas, for
 * flow B). Flow B only runs when RPC_URL is set.
 *
 * Run:
 *   DERIVE_NETWORK=testnet PRIVATE_KEY=0x... [RPC_URL=https://...] \
 *     npx tsx examples/01-deposit.ts
 */
import { JsonRpcProvider, Wallet } from 'ethers';
import { ownerClient, requireEnv, run } from './shared/env';

run(async () => {
  // No connect()/login(): everything here goes over REST, where private
  // calls authenticate with signed headers per request. (You can't log in
  // over the websocket until you own an account — which is what a deposit
  // creates.)
  const client = ownerClient();

  // Discover deposit routing from public metadata instead of hardcoding:
  // a currency lists its protocol spot assets (the on-protocol balance the
  // deposit credits — NOT the ERC-20) and the margin managers that can
  // risk it. A subaccount is created under a manager, so both flows need
  // a manager id to route the first deposit into a NEW subaccount.
  const currencies = await client.marketData.getAllCurrencies();
  const usdc = currencies.find((c) => c.currency === 'USDC');
  if (!usdc) throw new Error('USDC is not listed on this network');
  const spotAsset = usdc.spot.find((s) => s.name === 'USDC') ?? usdc.spot[0];
  if (!spotAsset) throw new Error('USDC has no registered spot asset');
  const managerId = usdc.managers[0]?.sm; // standard (cross) margin manager
  if (managerId == null) throw new Error('no standard-margin manager risks USDC');

  // ── Flow A: deposit address ────────────────────────────────────────────
  // The address is deterministic per (wallet, manager) — calling register
  // again returns the same one. Anything sent to it is swept and credited
  // asynchronously; with managerId (no subaccountId) the first sweep
  // creates your account's first subaccount under that manager.
  const registration = await client.deposits.depositAddress.register({ managerId, depositType: 'slow' });
  console.log(`[A] deposit address for ${registration.wallet}: ${registration.deposit_address}`);
  console.log('[A] send USDC there from any wallet/exchange; crediting is asynchronous.');

  // ── Flow B: self-custody contract call ─────────────────────────────────
  const rpcUrl = process.env.RPC_URL;
  if (!rpcUrl) {
    console.log('[B] RPC_URL not set — skipping the on-chain contract-call flow.');
    return;
  }

  // The SDK holds no chain provider; you supply an ethers Signer. Here we
  // reuse the owner key, but any wallet holding the tokens works.
  const signer = new Wallet(requireEnv('PRIVATE_KEY'), new JsonRpcProvider(rpcUrl));

  // The new subaccount id is assigned by the exchange only after the deposit
  // is observed on-chain — the transaction receipt does not carry it. So:
  // snapshot our subaccount ids BEFORE depositing (empty for a brand-new
  // account), and poll afterwards for the one that appears.
  const knownSubaccountIds = await client.subaccounts.list();

  // Amount is in human units; the SDK scales by the ERC-20's on-chain
  // decimals() (6 for USDC). Under the hood this approves the ActionManager
  // (only if the current allowance is short) and then calls
  // depositToNewSubaccount, waiting for each transaction to mine.
  const { txHash } = await client.deposits.contractCall.depositToNewSubaccount({
    signer,
    asset: spotAsset.address, // protocol spot asset the deposit credits
    erc20: spotAsset.erc20.underlying_erc20 ?? undefined, // token to pull (defaults to network USDC)
    amount: '10',
    managerId,
  });
  console.log(`[B] deposit mined: ${txHash} — waiting for the exchange to credit it...`);

  const newSubaccountId = await client.deposits.awaitCredited({ knownSubaccountIds });
  console.log(`[B] account created: subaccount ${newSubaccountId} under manager ${managerId}`);

  const portfolio = await client.subaccounts.get(newSubaccountId);
  console.log('[B] collaterals:', portfolio.collaterals);

  // Now that the account exists, you can log in and register session keys —
  // see example 02.
});
