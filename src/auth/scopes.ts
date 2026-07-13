/**
 * Session-key scopes.
 *
 * Protocol scopes exist in two encodings that must stay in sync: the
 * numeric byte codes below are packed into the SIGNED create-session-key
 * action data (codecs/sessionKey.ts), while the colon-delimited wire
 * strings travel in RPC params.
 *
 * Grants form an Allows-hierarchy checked server-side: `admin` subsumes
 * every scope, and each `:all` subsumes its branch — `trade:all` covers
 * both venues, `trade:orderbook:all` / `trade:rfq:all` cover their
 * per-asset variants, `transfer:all` and `vault:all` likewise. A key's
 * grant set allows a request iff any single grant does.
 */
export const ProtocolScopeCode = {
  /** Superuser grant — allows every protocol action. Grant deliberately. */
  Admin: 0,
  /** Withdrawals, restricted to the account's whitelisted recipients. */
  Withdraw: 1,

  TradeAll: 2,
  TradeOrderbookAll: 3,
  TradeOrderbookSpot: 4,
  TradeOrderbookPerp: 5,
  TradeOrderbookOption: 6,
  TradeRfqAll: 7,
  TradeRfqSpot: 8,
  TradeRfqPerp: 9,
  TradeRfqOption: 10,

  TransferAll: 11,
  /** Between subaccounts of the same owner (spot, and positions via RFQ). */
  TransferExistingSubaccount: 12,
  /** Spot transfer that creates a new subaccount under the owner. */
  TransferNewSubaccount: 13,
  /** Spot transfer to a whitelisted different-owner wallet. */
  TransferDifferentOwnerSubaccount: 14,

  /** Create child session keys; the child must be a subset of this key. */
  CreateSessionKey: 15,
  Liquidate: 16,

  VaultAll: 17,
  VaultCuratorCreate: 18,
  VaultCuratorMintAndBurn: 19,
  VaultUserDeposit: 20,
  VaultUserWithdraw: 21,
  VaultUserCancel: 22,
} as const;

export type ProtocolScopeCode = (typeof ProtocolScopeCode)[keyof typeof ProtocolScopeCode];

/** Wire-string form for each numeric protocol scope code. */
export const ProtocolScopeWireString = {
  [ProtocolScopeCode.Admin]: 'admin',
  [ProtocolScopeCode.Withdraw]: 'withdraw',
  [ProtocolScopeCode.TradeAll]: 'trade:all',
  [ProtocolScopeCode.TradeOrderbookAll]: 'trade:orderbook:all',
  [ProtocolScopeCode.TradeOrderbookSpot]: 'trade:orderbook:spot',
  [ProtocolScopeCode.TradeOrderbookPerp]: 'trade:orderbook:perp',
  [ProtocolScopeCode.TradeOrderbookOption]: 'trade:orderbook:option',
  [ProtocolScopeCode.TradeRfqAll]: 'trade:rfq:all',
  [ProtocolScopeCode.TradeRfqSpot]: 'trade:rfq:spot',
  [ProtocolScopeCode.TradeRfqPerp]: 'trade:rfq:perp',
  [ProtocolScopeCode.TradeRfqOption]: 'trade:rfq:option',
  [ProtocolScopeCode.TransferAll]: 'transfer:all',
  [ProtocolScopeCode.TransferExistingSubaccount]: 'transfer:existing_subaccount',
  [ProtocolScopeCode.TransferNewSubaccount]: 'transfer:new_subaccount',
  [ProtocolScopeCode.TransferDifferentOwnerSubaccount]: 'transfer:different_owner_subaccount',
  [ProtocolScopeCode.CreateSessionKey]: 'create_session_key',
  [ProtocolScopeCode.Liquidate]: 'liquidate',
  [ProtocolScopeCode.VaultAll]: 'vault:all',
  [ProtocolScopeCode.VaultCuratorCreate]: 'vault:curator_create',
  [ProtocolScopeCode.VaultCuratorMintAndBurn]: 'vault:curator_mint_and_burn',
  [ProtocolScopeCode.VaultUserDeposit]: 'vault:user_deposit',
  [ProtocolScopeCode.VaultUserWithdraw]: 'vault:user_withdraw',
  [ProtocolScopeCode.VaultUserCancel]: 'vault:user_cancel',
} as const satisfies Record<ProtocolScopeCode, string>;

export type ProtocolScope = (typeof ProtocolScopeWireString)[ProtocolScopeCode];

/**
 * Off-chain scopes validated by the server only (never signed into the
 * action data). Exact-match semantics — no hierarchy — but a key holding
 * any protocol scope bypasses them.
 */
export const OffchainScope = {
  AccountInfo: 'account_info',
  DeleteSessionKey: 'delete_session_key',
} as const;

export type OffchainScope = (typeof OffchainScope)[keyof typeof OffchainScope];
