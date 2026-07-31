import { AbiCoder, getAddress } from 'ethers';

/**
 * Whitelisted-recipient delta, verified by the whitelisted-recipient
 * module: the resulting list is `(current ∪ add) \ remove`.
 */
export interface WhitelistedRecipientsFields {
  add: string[];
  remove: string[];
}

/** Encodes the delta: canonical `abi.encode(address[] add, address[] remove)`. */
export function encodeUpdateWhitelistedRecipients(fields: WhitelistedRecipientsFields): string {
  return AbiCoder.defaultAbiCoder().encode(
    ['address[]', 'address[]'],
    [fields.add.map((a) => getAddress(a)), fields.remove.map((a) => getAddress(a))],
  );
}
