/**
 * Deposit entrypoints of the protocol's OnchainActionManager
 * (contracts/src/OnchainActionManager.sol). `asset` is the PROTOCOL
 * asset label registered on the WithdrawalOutbox, not an ERC-20 — the
 * contract resolves the underlying token itself and pulls `amount`
 * (in that token's native decimals) via transferFrom, so the token
 * must first be approved to the ActionManager.
 */
export const ACTION_MANAGER_ABI = [
  'function deposit(address asset, uint256 amount, uint64 subaccountId, address fallbackRecipient) returns (uint256 actionId)',
  'function depositToNewSubaccount(address asset, uint256 amount, uint32 managerId, address owner) returns (uint256 actionId)',
];
