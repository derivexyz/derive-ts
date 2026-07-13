/**
 * 10 — Vaults: public discovery, the shareholder flow, and the curator role.
 *
 * A Derive vault is a subaccount traded by a *curator* on behalf of
 * *shareholders*. The SDK mirrors that split:
 *
 *   client.vaults               public reads — anyone can browse vaults
 *   client.vaults.shareholder   deposit/withdraw intents + your holdings
 *   client.vaults.curator       create vaults, settle intents, edit metadata
 *
 * Shareholder deposits/withdrawals are NOT instant swaps: they queue as
 * signed intents, and the curator later settles each one by minting or
 * burning shares at a quoted price. The protocol bounds that quote to
 * within `max_slippage_bps` of the mark-to-market share price, so a
 * curator cannot fill you at an arbitrary level. Until settled (or
 * cancelled), a deposit holds the funds on your source subaccount.
 *
 * Prerequisites: a testnet account with a subaccount holding some of the
 * vault's deposit asset (usually USDC).
 *
 * Run: DERIVE_NETWORK=testnet PRIVATE_KEY=0x... npx tsx examples/10-vaults.ts
 */
import { DeriveRpcError } from '@derivexyz/derive-ts';
import { ownerClient, run } from './shared/env';

const DEPOSIT_AMOUNT = '10'; // in the vault's deposit asset (10 USDC for a USDC vault)

run(async () => {
  // Everything here is request/response, so we stay on REST: private calls
  // carry signed headers per request — no connect()/login() (and no close()).
  const client = ownerClient();

  // --- Public reads: no auth needed to browse vaults. ---
  const { vaults } = await client.vaults.listVaults({ pageSize: 5 });
  const [first] = vaults;
  if (!first) {
    console.log('No vaults exist on this network yet — nothing to demo.');
    return;
  }
  console.log(`Found ${vaults.length} vault(s):`);
  for (const v of vaults) {
    // nav_usd / simulated_share_price_usd are null when the vault cannot be
    // priced right now, so never assume they are set.
    console.log(
      `  #${v.protocol.subaccount_id} ${v.name}: NAV $${v.nav_usd ?? '?'},` +
        ` share price $${v.simulated_share_price_usd ?? '?'}`,
    );
  }

  // A vault's economics are fixed at creation — read them before depositing.
  const vault = await client.vaults.getVault(first.protocol.subaccount_id);
  const config = vault.protocol.config;
  console.log(`\nInspecting "${vault.name}" (#${vault.protocol.subaccount_id}):`);
  console.log(`  deposit asset:    ${config.deposit_spot_asset}`);
  console.log(`  fees:             ${config.management_fee_bps}bps mgmt / ${config.performance_fee_bps}bps perf`);
  console.log(`  withdraw cooldown: ${config.cooldown_sec}s after your last deposit`);

  // --- Shareholder flow: queue a deposit intent. ---
  // The deposit is signed from one of OUR subaccounts (the funds' source);
  // the asset must be the vault's configured deposit asset, so take it from
  // the vault row instead of hardcoding a USDC address.
  const [subaccountId] = await client.subaccounts.list();
  if (subaccountId === undefined) {
    console.log('\nThis wallet has no subaccounts — fund one to try the shareholder flow.');
    return;
  }
  try {
    await client.vaults.shareholder.requestDeposit({
      subaccountId,
      vaultSubaccountId: vault.protocol.subaccount_id,
      depositSpotAsset: config.deposit_spot_asset,
      amount: DEPOSIT_AMOUNT,
    });
    console.log(`\nQueued a ${DEPOSIT_AMOUNT} deposit from subaccount ${subaccountId} — awaiting curator settlement.`);
  } catch (error) {
    // Expected without funds (or on whitelist-only vaults); the read-only
    // shareholder views below still work, so keep going.
    if (!(error instanceof DeriveRpcError)) throw error;
    console.log(`\nDeposit request rejected: ${error.message}`);
  }

  // Intents wait in a queue until the curator settles them; they can be
  // cancelled at any point before that.
  const live = await client.vaults.shareholder.getLiveRequests();
  console.log(`Live (unsettled) requests: ${live.total}`);

  // Share balances only change once the curator settles, so a just-queued
  // deposit will not show here yet.
  const holdings = await client.vaults.shareholder.getShares();
  for (const { shares, vault: held } of holdings.vaults) {
    console.log(`  holding ${shares} shares of "${held.name}" (#${held.protocol.subaccount_id})`);
  }
  if (holdings.vaults.length === 0) console.log('  no vault shares held yet');

  // Clean up our demo intent so the funds are not left on hold.
  await client.vaults.shareholder.cancelAllRequests({
    subaccountId,
    vaultSubaccountId: vault.protocol.subaccount_id,
  });
  console.log('Cancelled the demo deposit intent.');

  // --- Curator role: not privileged — ANY wallet can become a curator via
  // client.vaults.curator.createVault({ ... }) by seeding an initial deposit
  // (fees and max slippage are immutable afterwards). We skip creating one
  // here and just list what this wallet already curates.
  const curated = await client.vaults.curator.getCuratedVaults();
  console.log(
    `\nVaults curated by this wallet: ${
      curated.subaccount_ids.length > 0 ? curated.subaccount_ids.join(', ') : 'none'
    }`,
  );
});
