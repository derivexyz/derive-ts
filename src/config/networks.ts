import { V3_MODULE_ADDRESSES } from '../signing/modules';
import type { NetworkConfig, NetworkName } from './types';

/**
 * Network presets for the v3 API. chainId + contracts.matching are the
 * inputs to the computed EIP-712 domain separator; the values here
 * reproduce the separators the deployed contracts accept (unit-tested in
 * test/unit/eip712.test.ts).
 *
 * The EIP-712 domain separator is computed from `chainId` and the
 * constant Matching verifying contract (signing/eip712.ts).
 */
export const NETWORKS: Record<NetworkName, NetworkConfig> = {
  mainnet: {
    name: 'mainnet',
    httpUrl: 'https://api.derive.xyz/v3',
    wsUrl: 'wss://api.derive.xyz/v3/ws',
    chainId: 1, // Ethereum L1
    modules: { ...V3_MODULE_ADDRESSES },
    contracts: {
      // Placeholder — set the mainnet ActionManager address once published.
      actionManager: '0x0000000000000000000000000000000000000000',
      usdc: '0x6879287835A86F50f784313dBEd5E5cCC5bb8481',
      cash: '0x57B03E14d409ADC7fAb6CFc44b5886CAD2D5f02b',
    },
  },
  testnet: {
    name: 'testnet',
    httpUrl: 'https://testnet.api.derive.xyz/v3',
    wsUrl: 'wss://testnet.api.derive.xyz/v3/ws',
    chainId: 11155111, // Sepolia
    modules: { ...V3_MODULE_ADDRESSES },
    contracts: {
      actionManager: '0x1b4f369b585D40a27F66775844FC265151f278A4',
      usdc: '0xE838B3Df801C1AE1d18f0f524A51783Ea30673C7',
    },
  },
  local: {
    name: 'local',
    httpUrl: 'http://localhost:8080',
    wsUrl: 'ws://localhost:3000/ws',
    chainId: 31337, // anvil
    modules: { ...V3_MODULE_ADDRESSES },
    contracts: {
      actionManager: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
      usdc: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
    },
  },
};

export function resolveNetwork(network: NetworkName | NetworkConfig): NetworkConfig {
  if (typeof network !== 'string') return network;
  const preset = NETWORKS[network];
  if (!preset) {
    throw new Error(`unknown network preset '${network}' — pass a full NetworkConfig instead`);
  }
  return preset;
}
