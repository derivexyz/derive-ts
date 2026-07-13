import type { BaseWallet } from 'ethers';
import type { WebSocketFactory } from '../transport/ws';

/**
 * Protocol contracts the SDK references. (The EIP-712 verifying contract
 * is not here — v3 uses a constant Matching address on every network;
 * see MATCHING_VERIFYING_CONTRACT in signing/eip712.ts.)
 */
export interface ContractAddresses {
  actionManager?: string;
  usdc?: string;
  cash?: string;
}

/**
 * Addresses of the protocol's action-verification modules. Every signed
 * action commits to the module that verifies it, so a wrong module
 * address means a rejected signature. All v3 networks share the
 * canonical set in signing/modules.ts.
 */
export interface ModuleAddresses {
  trade: string;
  transfer: string;
  withdrawal: string;
  rfq: string;
  externalTransfer: string;
  whitelistedRecipient: string;
  vault: string;
  liquidation: string;
  createSessionKey: string;
  deposit?: string;
}

/**
 * Everything network-specific the SDK needs. The EIP-712 domain
 * separator is not stored — it is computed the canonical part-wise way
 * from `chainId` + `contracts.matching` (see signing/eip712.ts).
 */
export interface NetworkConfig {
  name: string;
  httpUrl: string;
  wsUrl: string;
  /** The chain the protocol verifies signatures for (mainnet: Ethereum L1, testnet: Sepolia, local: anvil). */
  chainId: number;
  modules: ModuleAddresses;
  contracts: ContractAddresses;
}

export type NetworkName = 'mainnet' | 'testnet' | 'local';

/** A logging hook; the SDK never logs to console directly and never logs key material. */
export type Logger = (level: 'debug' | 'info' | 'warn' | 'error', message: string, data?: unknown) => void;

export interface DeriveClientOptions {
  /** Preset name or a full custom config. */
  network: NetworkName | NetworkConfig;
  /**
   * The account owner wallet: a raw private key or an ethers wallet
   * with a local signing key. Optional when only public endpoints or a
   * session key are used.
   */
  wallet?: string | BaseWallet;
  /**
   * A registered session key used for login and request signing in
   * place of the owner wallet. Recommended for bots and frontends:
   * scope it narrowly and set an expiry.
   */
  sessionKey?: string | BaseWallet;
  /** The account owner's address; required when a session key is used without the owner wallet. */
  ownerAddress?: string;
  logger?: Logger;
  /** WebSocket constructor override (defaults to `ws` in Node, the global WebSocket in browsers). */
  wsFactory?: WebSocketFactory;
  /** Per-request timeout in milliseconds. Default 20_000. */
  requestTimeoutMs?: number;
}
