import { concat, getAddress, toBeHex, zeroPadValue } from 'ethers';

/**
 * Whitelisted-recipient delta, verified by the whitelisted-recipient
 * module: the resulting list is `(current ∪ add) \ remove`.
 */
export interface WhitelistedRecipientsFields {
  add: string[];
  remove: string[];
}

/**
 * Hand-packed layout (2 + A + R words), NOT standard ABI dynamic arrays:
 *   word 0     : add count A
 *   word 1     : remove count R
 *   word 2+i   : add[i]     (address, left-padded)
 *   word 2+A+j : remove[j]  (address, left-padded)
 */
export function encodeUpdateWhitelistedRecipients(fields: WhitelistedRecipientsFields): string {
  const add = fields.add.map((a) => getAddress(a));
  const remove = fields.remove.map((a) => getAddress(a));
  return concat([
    zeroPadValue(toBeHex(add.length), 32),
    zeroPadValue(toBeHex(remove.length), 32),
    ...add.map((a) => zeroPadValue(a, 32)),
    ...remove.map((a) => zeroPadValue(a, 32)),
  ]);
}
