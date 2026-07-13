import { AbiCoder, concat, getAddress, isHexString, keccak256, type BaseWallet } from 'ethers';
import { ACTION_TYPEHASH } from './eip712';

export interface ActionFields {
  subaccountId: number | bigint;
  /** UTC-nanosecond timestamp as a decimal string; see `randomNonce()`. */
  nonce: string;
  /** Address of the protocol module that verifies this action. */
  module: string;
  /** ABI-encoded action payload produced by one of the codecs. */
  data: string;
  /** Unix-seconds signature expiry. */
  expirySec: number;
  owner: string;
  signer: string;
}

/**
 * The signed-action envelope shared by every protocol operation
 * (orders, transfers, withdrawals, RFQs, session keys, vault actions).
 *
 * The digest is
 * keccak256(0x1901 ‖ domainSeparator ‖ structHash) where structHash
 * commits to ACTION_TYPEHASH, the envelope fields, and keccak256(data).
 * The domain separator comes from `domainSeparator(network)`.
 */
export class SignedAction {
  readonly fields: Readonly<ActionFields>;
  private readonly domainSeparator: string;
  signature?: string;

  constructor(fields: ActionFields, domainSeparator: string) {
    if (!isHexString(fields.data)) throw new Error('action data must be a 0x-prefixed hex string');
    if (!/^\d+$/.test(fields.nonce)) throw new Error('action nonce must be a decimal string');
    if (!isHexString(domainSeparator, 32)) throw new Error('domainSeparator must be 32 bytes of hex');
    this.fields = Object.freeze({
      ...fields,
      module: getAddress(fields.module),
      owner: getAddress(fields.owner),
      signer: getAddress(fields.signer),
    });
    this.domainSeparator = domainSeparator;
  }

  actionHash(): string {
    const f = this.fields;
    return keccak256(
      AbiCoder.defaultAbiCoder().encode(
        ['bytes32', 'uint256', 'uint256', 'address', 'bytes32', 'uint256', 'address', 'address'],
        [ACTION_TYPEHASH, f.subaccountId, f.nonce, f.module, keccak256(f.data), f.expirySec, f.owner, f.signer],
      ),
    );
  }

  digest(): string {
    return keccak256(concat(['0x1901', this.domainSeparator, this.actionHash()]));
  }

  /**
   * Signs the digest with a raw signing key. The wallet must be the
   * declared `signer` (the owner itself, or a registered session key).
   */
  sign(wallet: BaseWallet): this {
    if (getAddress(wallet.address) !== this.fields.signer) {
      throw new Error(`signing wallet ${wallet.address} does not match declared signer ${this.fields.signer}`);
    }
    this.signature = wallet.signingKey.sign(this.digest()).serialized;
    return this;
  }
}
