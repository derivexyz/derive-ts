# Examples

Each file is a self-contained, runnable walkthrough of one part of the SDK. They
are the fastest way to learn the mental model — read them top to bottom.

## Running

All examples read two environment variables:

- `DERIVE_NETWORK` — `mainnet` | `testnet` | `local` (default: `testnet`)
- `PRIVATE_KEY` — the account owner key, `0x`-prefixed

```bash
DERIVE_NETWORK=testnet PRIVATE_KEY=0x... npx tsx examples/04-place-order.ts
```

A couple of examples read extra vars (documented in their header comment):
`01-deposit` uses `RPC_URL` for the on-chain path, `08-transfers` uses
`RECIPIENT`.

> ⚠️ Setting `DERIVE_NETWORK=mainnet` places **real** orders/transfers.

## Index

Ordered by the v3 onboarding flow: your **first deposit creates your account**,
then you register **session keys**, then everything else.

| File | Shows |
|---|---|
| `01-deposit.ts` | both deposit flows (deposit address vs on-chain) — the first deposit creates your account |
| `02-session-keys.ts` | connect, login, create a scoped session key for a bot |
| `03-market-data.ts` | public data (no auth): currencies, instruments, ticker |
| `04-subscribe.ts` | websocket subscriptions (callback and async-iterator) |
| `05-place-order.ts` | place → inspect → cancel an order |
| `06-rfq-taker.ts` | request a quote and execute it |
| `07-rfq-maker.ts` | poll RFQs and send quotes (minimal quoter loop) |
| `08-transfers.ts` | internal and external (whitelisted) spot transfers |
| `09-withdraw.ts` | signed L1 withdrawal |
| `10-vaults.ts` | vault reads, shareholder deposit, curator overview |
| `11-position-transfers.ts` | transfer an open perp/option position between your subaccounts |
