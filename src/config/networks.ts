import { V3_MODULE_ADDRESSES } from '../signing/modules';
import type { NetworkConfig, NetworkName } from './types';

/**
 * The mintable testnet ERC-20s, read from `public/get_all_currencies`
 * (`spot[].erc20.underlying_erc20`) on Sepolia. Mint them by connecting a
 * wallet at https://testnet.app.derive.xyz/developers.
 */
const TESTNET_TOKENS: Record<string, string> = {
  AUSD: '0x8f6d7a5a3aC3BE597E3dA3F0edF0C1A7Cf3289E2',
  CBBTC: '0x99654Ea058E3A9498F69ED52f47d81790F639da4',
  DRV: '0xa36d27421fE232E7569De49D044CBdD009454D72',
  ETH: '0x5039eB26A431c7303070E716eAD2122844A23Bd1',
  FXRP: '0xA8958f0A937862EFdD14C686231316ce65d0d79E',
  FXUSDC: '0xE9C31B7710C21e9Fe42790c16A2AA7e1f6992828',
  HYPE: '0x5CB714FF3D306963AF0882315B3727259C2b7d9B',
  JITOSOL: '0x1A16692806e4FD11758b02057a10faE33D71484F',
  KHYPE: '0x6109C318beDFE6380AA8D2Ee4C1234460AcA5Fe2',
  LBTC: '0x7A839d85211a506Fe9097BbDa13683743a10f262',
  SFP: '0x8aE6Cd4FFa7E533Aaa187d4f9c5aC7d2c791222F',
  SOL: '0xCFa411e87393db475f3ae954DCCd8Fc25078dde3',
  SUSDE: '0x0F24F541Af7BD866Bfa3830d588cd7756cd64326',
  USDC: '0x73Efab09362052D26FB93A730Be4F8a5EdC833af',
  USDE: '0x2BDEeE4422FcB170b36Ea0250cb5222890D22AC7',
  USDT: '0x38e1aF7a827cF0B7a8b780d097d65891B0C8Ff72',
  WBTC: '0xeFC1e7622cBbB473F1EdAacDD4Ed21D7A978dF46',
  WEETH: '0x164aB34cFec6665e4CaF619c697eA3932360aed0',
  WSTETH: '0x93c1692EC5a03E104A1C13e4bc04482D122334FF',
  XAUT: '0x74C1fc4126006da2878e708556bc290A11C3EA4A',
};

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
      actionManager: '0xd3625eCf97E5554C62A48Ac1c9284C9dCeFceB68',
      usdc: TESTNET_TOKENS.USDC,
      tokens: TESTNET_TOKENS,
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
