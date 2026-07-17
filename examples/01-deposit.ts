/**
 * 01 — Deposit: your first deposit creates your Derive account.
 *
 * This is the true first step on Derive v3. There is no separate "create
 * account" call — an account (and its first subaccount) is automatically
 * created on your first deposit. Session keys, trading,
 * and everything else come after (see example 02).
 *
 * Deposits are NOT signed API actions. Funds arrive through one of three
 * deliberately distinct methods, and this example walks all of them:
 *
 *   Standard — deposit address (CEX-style): register a deterministic
 *       address the exchange watches. Send tokens to it from any wallet or
 *       exchange; they are swept and credited asynchronously, creating
 *       your subaccount. (~2 min).
 *   Instant — deposit address (fast): same mechanism with
 *       depositType 'fast' — a distinct address whose deposits are pooled
 *       and credited near-instantly up to a per-currency cap (larger
 *       amounts are credited in capped chunks). (~30 sec)
 *   Direct — contract call (self-custody): YOUR wallet submits the
 *       on-chain ActionManager transaction (ERC-20 approve + deposit).
 *       Requires an RPC endpoint for the chain the protocol is deployed on.
 *       (~2 min)
 *
 * Prerequisites: PRIVATE_KEY funded with the deposit token (and gas, for
 * the on-chain flows). Direct and the Instant send only run when RPC_URL
 * is set.
 *
 * For sepolia faucet: https://cloud.google.com/application/web3/faucet/ethereum/sepolia.
 * You can mint USDC on sepolia via https://testnet.app.derive.xyz/developers.
 *
 * Run:
 *   DERIVE_NETWORK=testnet PRIVATE_KEY=0x... [RPC_URL=https://...] \
 *     npx tsx examples/01-deposit.ts
 */
import { Contract, JsonRpcProvider, parseUnits, Wallet } from 'ethers';
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
  // risk it. A subaccount is created under a manager, so every method
  // needs a manager id to route the first deposit into a NEW subaccount.
  const currencies = await client.marketData.getAllCurrencies();
  const usdc = currencies.find((c) => c.currency === 'USDC');
  if (!usdc) throw new Error('USDC is not listed on this network');
  const spotAsset = usdc.spot.find((s) => s.name === 'USDC') ?? usdc.spot[0];
  if (!spotAsset) throw new Error('USDC has no registered spot asset');
  const managerId = usdc.managers[0]?.sm; // standard (cross) margin manager
  if (managerId == null) throw new Error('no standard-margin manager risks USDC');

  // ── Standard: deposit address ──────────────────────────────────────────
  // The address is deterministic per (wallet, manager, depositType) —
  // calling register again returns the same one. Anything sent to it is
  // swept and credited asynchronously; with managerId (no subaccountId)
  // the sweep creates a subaccount under that manager.
  const standard = await client.deposits.depositAddress.register({ managerId, depositType: 'slow' });
  console.log(`[standard] deposit address for ${standard.wallet}: ${standard.deposit_address}`);
  console.log('[standard] send USDC there from any wallet/exchange; crediting is asynchronous.');

  // ── Instant: deposit address (fast) ────────────────────────────────────
  // Same mechanism, distinct address: deposits here are pooled and
  // credited near-instantly up to a per-currency cap; larger amounts are
  // credited in capped chunks. Track them with deposits.getPending /
  // awaitFastDeposit (they never appear in the deposit history).
  const instant = await client.deposits.depositAddress.register({ managerId, depositType: 'fast' });
  console.log(`[instant] fast deposit address: ${instant.deposit_address}`);

  const rpcUrl = process.env.RPC_URL;
  if (!rpcUrl) {
    console.log('[direct] RPC_URL not set — skipping the on-chain flows.');
    return;
  }

  // ── Direct: self-custody contract call ─────────────────────────────────
  // The SDK holds no chain provider; you supply an ethers Signer. Here we
  // reuse the owner key, but any wallet holding the tokens works.
  const signer = new Wallet(requireEnv('PRIVATE_KEY'), new JsonRpcProvider(rpcUrl));

  // The new subaccount id is assigned by the exchange only after the deposit
  // is observed on-chain — the transaction receipt does not carry it. So:
  // snapshot our subaccount ids BEFORE depositing (empty for a brand-new
  // account), and poll afterwards for the one that appears. (getPending
  // shows the deposit as soon as the exchange picks it up; state inclusion
  // follows ~2 minutes later.)
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
  console.log(`[direct] deposit mined: ${txHash} — waiting for the exchange to credit it...`);

  const newSubaccountId = await client.deposits.awaitNewSubaccount({ knownSubaccountIds });
  console.log(`[direct] account created: subaccount ${newSubaccountId} under manager ${managerId}`);

  const portfolio = await client.subaccounts.get(newSubaccountId);
  console.log('[direct] collaterals:', portfolio.collaterals);

  // ── Instant in action: plain transfer to the fast address ──────────────
  // No approve, no contract call — send the token to the fast address and
  // watch public/get_pending_deposits until every entry reads 'credited'.
  const erc20Address = spotAsset.erc20.underlying_erc20;
  if (!erc20Address) {
    console.log('[instant] no underlying ERC-20 for USDC on this network — skipping the send.');
    return;
  }
  const token = new Contract(erc20Address, ['function transfer(address,uint256)'], signer);
  const amount = parseUnits('5', spotAsset.erc20.decimals);
  const sendTx = await token.getFunction('transfer')(instant.deposit_address, amount);
  await sendTx.wait();
  console.log(`[instant] sent 5 USDC to ${instant.deposit_address} (${sendTx.hash}) — awaiting crediting...`);

  const credited = await client.deposits.awaitFastDeposit({ txHash: sendTx.hash as string });
  for (const e of credited) console.log(`[instant] credited ${e.amount} ${e.asset} (native units) → subaccount`);

  // Now that the account exists, you can log in and register session keys —
  // see example 02.
});
