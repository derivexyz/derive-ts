import { AbiCoder, getAddress, keccak256, toUtf8Bytes } from 'ethers';
import type { NetworkConfig } from '../config/types';

/**
 * keccak256("Action(uint256 subaccountId,uint256 nonce,address module,bytes data,uint256 expiry,address owner,address signer)").
 * Chain-independent protocol constant.
 */
export const ACTION_TYPEHASH = '0x4d7a9f27c403ff9c0f19bce61d76d82f9aa29f8d6d4b0c5474607d9770d1af17';

const DOMAIN_TYPEHASH = keccak256(
  toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
);
const NAME_HASH = keccak256(toUtf8Bytes('Matching'));
const VERSION_HASH = keccak256(toUtf8Bytes('1.0'));

/**
 * The EIP-712 `verifyingContract` for the action domain. v3 anchors the
 * domain to the v2 mainnet `Matching` contract on every network — the
 * verifying contract is constant, only the chain id varies — so it is
 * hardcoded here rather than read from network config.
 */
export const MATCHING_VERIFYING_CONTRACT = '0xeB8d770ec18DB98Db922E9D83260A585b9F0DeAD';

/**
 * The EIP-712 domain separator actions sign under — a standard 4-field
 * `EIP712Domain` (name "Matching", version "1.0", no salt) computed from
 * the network's chain id and the constant Matching verifying contract.
 */
export function domainSeparator(network: Pick<NetworkConfig, 'chainId'>): string {
  return keccak256(
    AbiCoder.defaultAbiCoder().encode(
      ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
      [DOMAIN_TYPEHASH, NAME_HASH, VERSION_HASH, network.chainId, getAddress(MATCHING_VERIFYING_CONTRACT)],
    ),
  );
}
