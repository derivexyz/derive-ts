# Changelog

## 3.0.0

Initial release of the Derive v3 TypeScript SDK.

- Typed client generated from the canonical v3 API spec (market data, orders,
  RFQ, transfers, withdrawals, deposits, vaults, session keys, subscriptions).
- EIP-712 action signing and EIP-191 login, verified against the protocol
  encoders.
- Websocket transport with reconnect/resubscribe; native-fetch HTTP transport.
- `mainnet` / `testnet` / `local` network presets.
