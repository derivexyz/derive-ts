/**
 * 02 — Session keys: log in and mint a scoped key for a bot.
 *
 * Once your account exists (created by your first deposit — see example 01),
 * this is the next step. It shows the auth mental model:
 *
 *   owner key    — the wallet that owns the account and its funds. Signs the
 *                  rare, high-stakes actions (like authorizing session keys).
 *                  Keep it cold; never ship it to a bot host.
 *   session key  — a throwaway keypair the OWNER registers with an explicit
 *                  scope and expiry. Bots run on session keys: a leaked
 *                  `trade:all` key can place orders but can never withdraw or
 *                  transfer funds, and it dies at `expirySec`.
 *
 * Prerequisites: a wallet that already owns a Derive account (i.e. has made
 * a first deposit — see example 01).
 *
 * Run:
 *   DERIVE_NETWORK=testnet PRIVATE_KEY=0x... npx tsx examples/02-session-keys.ts
 */
import { ProtocolScopeCode, expiresIn } from '@derivexyz/derive-ts';
import { Wallet } from 'ethers';
import { ownerClient, run } from './shared/env';

run(async () => {
  // ownerClient() builds a DeriveClient from PRIVATE_KEY — the owner wallet.
  const client = ownerClient();

  // Two-step handshake: connect() opens the websocket, login() authenticates
  // it (the SDK signs a login challenge with the wallet) and returns every
  // subaccount id the wallet owns. An empty list means no deposit has
  // created an account yet — run example 01 first.
  await client.connect();
  const subaccountIds = await client.login();
  console.log(`Logged in. Subaccounts: [${subaccountIds.join(', ')}]`);

  // A brand-new keypair for the bot. Only its ADDRESS is sent to Derive; the
  // private key stays with you — persist it (e.g. your bot's secret store),
  // because it is what the bot will sign with from now on.
  const sessionWallet = Wallet.createRandom();

  // The owner authorizes the key via an EIP-712 signed action (the SDK signs
  // it with the owner wallet under the hood). Scope it to the minimum the
  // bot needs:
  //   - TradeAll lets it place/cancel orders and RFQs, nothing else — no
  //     withdrawals, no transfers, no creating further keys.
  //   - A short expiry bounds the blast radius of a leak. Rotate keys instead
  //     of minting long-lived ones.
  const created = await client.sessionKeys.create({
    publicSessionKey: sessionWallet,
    expirySec: expiresIn(24 * 60 * 60), // unix seconds: valid for 24h
    protocolScopes: [ProtocolScopeCode.TradeAll],
    label: 'example-02-trading-bot',
  });

  console.log(`Session key registered: ${created.public_session_key}`);
  console.log(`  scopes:      ${created.protocol_scopes.join(', ')}`);
  console.log(`  expires:     ${new Date(created.expiry_sec * 1000).toISOString()}`);
  // Empty request = all current subaccounts; the response shows the expansion.
  console.log(`  subaccounts: [${created.subaccount_ids.join(', ')}]`);

  // From here, a bot authenticates WITHOUT the owner key:
  //   new DeriveClient({
  //     network: 'testnet',
  //     sessionKey: sessionWallet.privateKey,
  //     ownerAddress: '<the owner wallet address>',
  //   })

  await client.close();
});
