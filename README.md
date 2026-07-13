# @derivexyz/derive-ts

TypeScript SDK for the [Derive](https://derive.xyz) v3 exchange API — a typed
client for market data, orders, RFQs, transfers, withdrawals, deposits, vaults,
session keys, and websocket subscriptions.

- **Typed end to end.** Request params and responses are generated from the
  exchange's canonical API spec, so `client.orders.place(...)` and
  `client.send('public/get_ticker', ...)` are both fully typed.
- **Correct signing.** EIP-712 action signing and EIP-191 login are built in and
  verified byte-for-byte against the protocol's own encoders.

> Status: `3.0.0`. Requires Node 18+ (uses the built-in `fetch`). Peer runtime
> deps: `ethers` v6 and `ws`.

## Install

```bash
npm install @derivexyz/derive-ts ethers ws
```

## Quickstart

```ts
import { DeriveClient } from '@derivexyz/derive-ts';

const client = new DeriveClient({
  network: 'testnet', // 'mainnet' | 'testnet' | 'local'
  wallet: process.env.PRIVATE_KEY, // account owner key (or an ethers Wallet)
});

// Public data needs no auth:
const ticker = await client.marketData.getTicker('ETH-PERP');
console.log('ETH index price', ticker.I);

// Private calls sign automatically. Open the websocket and log in first:
await client.connect();
const subaccountIds = await client.login();

await client.orders.place({
  subaccountId: subaccountIds[0],
  instrumentName: 'ETH-PERP',
  direction: 'buy',
  amount: '0.1',
  limitPrice: '1000', // rests below market
});

await client.close();
```

## Authentication & session keys

Login and per-request auth use an **EIP-191** signature over a millisecond
timestamp. Trading/transfer/withdrawal actions are separately **EIP-712** signed.
Both are handled for you — you only provide a signing key.

For bots and frontends, do **not** ship the account owner key. Register a scoped
**session key** once (signed by the owner), then run with only that key:

```ts
import { DeriveClient, ProtocolScopeCode } from '@derivexyz/derive-ts';
import { Wallet } from 'ethers';

const sessionKey = Wallet.createRandom();
const owner = new DeriveClient({ network: 'testnet', wallet: process.env.PRIVATE_KEY });
await owner.connect();
await owner.login();
await owner.sessionKeys.create({
  publicSessionKey: sessionKey,
  expirySec: Math.floor(Date.now() / 1000) + 7 * 24 * 3600,
  protocolScopes: [ProtocolScopeCode.Trade], // least privilege — never Admin for a bot
  ipWhitelist: ['203.0.113.7'],
});

// Later, in the bot, with only the session key:
const bot = new DeriveClient({
  network: 'testnet',
  sessionKey: sessionKey.privateKey,
  ownerAddress: await (new Wallet(process.env.PRIVATE_KEY!)).getAddress(),
});
```

Session keys expire at their signed `expirySec` and cannot be revoked via the
API — set a sensible expiry. `sessionKeys.edit` changes only off-chain
attributes (label, IP allowlist).

## API surface

`DeriveClient` exposes namespaced sub-APIs:

| Namespace | What it does |
|---|---|
| `client.marketData` | instruments, tickers, currencies (public, no auth) |
| `client.subaccounts` | portfolio, positions, margin, trade history |
| `client.orders` | place / cancel / query orders |
| `client.rfq` | RFQ taker (request → quote → execute) and maker (quote) flows |
| `client.spotTransfers` | `transferInternal` (own subaccounts), `transferExternal` (other wallets), `updateWhitelistedRecipients` |
| `client.positionTransfers` | RFQ-backed `transferPositions` between subaccounts owned by the same wallet |
| `client.withdrawals` | signed L1 withdrawals |
| `client.deposits` | `contractCall.*` (self-custody on-chain) and `depositAddress.*` (CEX-style) |
| `client.vaults` | public reads + `vaults.shareholder.*` and `vaults.curator.*` |
| `client.sessionKeys` | create / list / edit session keys |
| `client.subscriptions` | websocket channels (callback or async-iterator) |

Anything not wrapped is reachable, fully typed, via `client.send(method, params)`.

### Type-only usage (stubs)

If you only want the endpoint type stubs — the request/response shape of every
public RPC method, with no runtime client — import them from the `types/endpoints`
subpath. They're generated from the exchange's canonical API spec, so they stay in
lockstep with the live surface; nothing here pulls in `ethers`, `ws`, or any runtime.

```ts
import type { EndpointMap, ParamsOf, ResultFor } from '@derivexyz/derive-ts/types/endpoints';

type PlaceParams = ParamsOf<'private/order'>;
type Ticker = ResultFor<'public/get_ticker'>;
// or reach into the map structurally:
type PlaceParamsStructural = EndpointMap['private/order']['request']['params'];
```

Useful for codegen, tooling, or typing a hand-rolled client. `EndpointMap` is keyed by
method string; each entry is `{ request, response }`, where `response` is the
`{ result } | { error }` JSON-RPC union — use `ResultFor<M>` to pull out the success
payload.

### Subscriptions

```ts
import { channel } from '@derivexyz/derive-ts';

await client.connect();
const book = channel('orderbook.{instrument_name}.{group}.{depth}', {
  instrument_name: 'ETH-PERP',
  group: '1',
  depth: '10',
});

const sub = await client.subscriptions.subscribe(book, (data) => console.log(data));
// ...later
await sub.unsubscribe();

// Or as an async iterator:
for await (const update of client.subscriptions.stream(channel('trades.{instrument_name}', { instrument_name: 'ETH-PERP' }))) {
  console.log(update);
}
```

## Value conventions (read this before signing)

- **Prices, amounts, and fees** are passed as decimal strings/numbers (e.g.
  `'1500.5'`). On the wire the SDK sends decimal strings; inside signed action
  data it scales them to 1e18. The protocol runs at 1e12 precision and *rejects*
  (does not truncate) values with more than 12 decimal places.
- **Withdrawal amounts** are the one exception — they are in the ERC-20's
  **native decimals** (e.g. USDC has 6), because they are the L1 payout value.
- **Withdrawals always pay out to the signer.** If a session key signs a
  withdrawal, funds go to the session key's address, not the owner's.
- **Deposits are two distinct flows, chosen explicitly:**
  - `deposits.depositAddress.register(...)` returns a deterministic address; send
    funds to it from anywhere and the exchange sweeps and credits them.
  - `deposits.contractCall.*` builds the on-chain approve + ActionManager
    transaction from an ethers `Signer` you provide.

## Examples

Runnable, heavily commented walkthroughs live in [`examples/`](./examples):

```bash
DERIVE_NETWORK=testnet PRIVATE_KEY=0x... npx tsx examples/01-deposit.ts
```

Ordered by the v3 onboarding flow — your first **deposit creates your account**,
then **session keys**, then the rest: `01-deposit`, `02-session-keys`,
`03-market-data`, `04-subscribe`, `05-place-order`, `06-rfq-taker`,
`07-rfq-maker`, `08-transfers`, `09-withdraw`, `10-vaults`,
`11-position-transfers`.

## Networks & signing params

The EIP-712 domain separator is computed from the network's chain id and the
protocol's constant `Matching` verifying contract; the action typehash is a
protocol constant. You normally just pass `network: 'mainnet' | 'testnet' |
'local'`. To point at a custom deployment, pass a full `NetworkConfig`.

> **Security note:** auth headers are named `X-Lyra*` on the wire — this is the
> live protocol format and predates the Derive rebrand. Keep your private keys
> in a secret manager; the SDK never logs key material.

## License

MIT — see [LICENSE](./LICENSE).
