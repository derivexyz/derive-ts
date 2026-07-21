/**
 * Entrypoints of the protocol's OnchainActionManager
 * (contracts/src/OnchainActionManager.sol) — the single L1 contract for both
 * deposits and generic onchain actions.
 *
 * The `deposit` calls take a PROTOCOL asset label registered on the
 * WithdrawalOutbox, not an ERC-20 — the contract resolves the underlying
 * token itself and pulls `amount` (in that token's native decimals) via
 * transferFrom, so the token must first be approved to the OnchainActionManager.
 * The protocol asset labels and their underlying tokens can be looked up via
 * `public/get_risk_universes` or `public/get_all_currencies`.
 *
 * `submit` is the generic queue: it appends an onchain action of
 * `actionType` carrying opaque `data` (see api/onchainActions.ts), authorized
 * by `msg.sender`. Public action types (51–9999) and admin types (>=10000)
 * land on separate accumulators.
 */
export const ONCHAIN_ACTION_MANAGER_ABI = [
  'function deposit(address asset, uint256 amount, uint64 subaccountId, address fallbackRecipient) returns (uint256 actionId)',
  'function depositToNewSubaccount(address asset, uint256 amount, uint32 managerId, address owner) returns (uint256 actionId)',
  'function submit(uint256 actionType, bytes data) payable returns (uint256 actionId)',
];
