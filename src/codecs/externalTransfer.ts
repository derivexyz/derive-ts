import { concat, getAddress, zeroPadValue } from 'ethers';
import { encodeTransfer, type TransferFields } from './transfer';

/**
 * Spot transfer to another owner's wallet, verified by the external
 * transfer module: the six transfer words plus a seventh holding the
 * recipient wallet.
 */
export interface ExternalTransferFields extends TransferFields {
  /**
   * Destination owner wallet. `toSubaccountId` must be one of its existing
   * subaccounts, or 0 to create one for it under `newSubaccountManager`.
   */
  recipient: string;
}

/**
 * All seven words are static, so the encoding is exactly the transfer
 * payload with the recipient appended as a left-padded address word.
 */
export function encodeExternalTransfer(fields: ExternalTransferFields): string {
  return concat([encodeTransfer(fields), zeroPadValue(getAddress(fields.recipient), 32)]);
}
