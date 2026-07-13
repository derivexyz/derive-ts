import { getAddress } from 'ethers';
import { encodeWithdrawal } from '../codecs/withdrawal';
import { SignedAction } from '../signing/action';
import { DEFAULT_SIGNATURE_EXPIRY_SEC, expiresIn, randomNonce, type DecimalLike } from '../signing/encoding';
import { domainSeparator } from '../signing/eip712';
import type { PrivateWithdrawEdgeRpcResponse } from '../types';
import type { ClientContext } from './context';
import { decimalString, resolveSpotAsset } from './spotTransfers';

export interface WithdrawParams {
  subaccountId: number;
  /** Currency name (e.g. "USDC") or protocol spot-asset address. */
  asset: string;
  /** Amount in human units. Signed at the ERC-20's native decimals — the protocol's only non-e18 amount. */
  amount: DecimalLike;
  /**
   * Guard for the ERC-20's decimals. The exchange scales the signed amount
   * with its own asset metadata, so a value differing from the exchange's
   * is rejected client-side rather than producing a doomed signature.
   */
  decimals?: number;
  /** Fee cap in USD. Defaults to the standard withdrawal fee: 1 USD, or 10 USD with `forceBatch`. */
  maxFeeUsd?: DecimalLike;
  /**
   * Guard for the L1 payout address. The exchange always pays out to the
   * action signer, so any other value is rejected client-side.
   */
  recipient?: string;
  /** Pay the higher fee to have the batch proven immediately. */
  forceBatch?: boolean;
  nonce?: string;
  signatureExpirySec?: number;
}

/**
 * Withdrawals to L1 (`private/withdraw`).
 *
 * The exchange reconstructs the signed payload with the payout recipient
 * fixed to the action signer's address — withdrawals always pay out to
 * the key that signs them. NOTE: when a session key signs, funds go to
 * the session key's address, not the owner's.
 */
export class WithdrawalsApi {
  constructor(private readonly ctx: ClientContext) {}

  /** Builds the signed wire payload shared by `withdraw` and `withdrawDebug`. */
  private async buildWithdrawPayload(params: WithdrawParams) {
    const { ownerAddress, signer } = this.ctx.credentials();
    const recipient = getAddress(params.recipient ?? signer.address);
    if (recipient !== getAddress(signer.address)) {
      throw new Error(
        `the exchange pays withdrawals out to the action signer (${signer.address}); recipient ${recipient} cannot be honored`,
      );
    }
    const asset = await resolveSpotAsset(this.ctx, params.asset);
    if (params.decimals !== undefined && params.decimals !== asset.decimals) {
      throw new Error(
        `decimals ${params.decimals} does not match the exchange's metadata for ${asset.name} (${asset.decimals}) — the signature would be rejected`,
      );
    }
    const forceBatch = params.forceBatch ?? false;
    const maxFeeUsd = params.maxFeeUsd ?? (forceBatch ? '10' : '1');
    const data = encodeWithdrawal({
      protocolAsset: asset.address,
      maxFeeUsd,
      recipient,
      amount: params.amount,
      decimals: asset.decimals,
      forceBatch,
    });
    const action = new SignedAction(
      {
        subaccountId: params.subaccountId,
        nonce: params.nonce ?? randomNonce(),
        module: this.ctx.network.modules.withdrawal,
        data,
        expirySec: params.signatureExpirySec ?? expiresIn(DEFAULT_SIGNATURE_EXPIRY_SEC),
        owner: ownerAddress,
        signer: signer.address,
      },
      domainSeparator(this.ctx.network),
    ).sign(signer);
    return {
      subaccount_id: params.subaccountId,
      asset_name: asset.name,
      amount_in_underlying: decimalString(params.amount, asset.decimals),
      max_fee_usd: decimalString(maxFeeUsd),
      force_batch: forceBatch,
      // Nonces are UTC-nanosecond decimal strings beyond 2^53; the API accepts string-or-number despite the generated `number`.
      nonce: action.fields.nonce as unknown as number,
      signer: action.fields.signer,
      signature: action.signature!,
      signature_expiry_sec: action.fields.expirySec,
    };
  }

  async withdraw(params: WithdrawParams): Promise<PrivateWithdrawEdgeRpcResponse> {
    return this.ctx.send('private/withdraw', await this.buildWithdrawPayload(params));
  }

  /**
   * Debug helper: signs the withdrawal exactly like `withdraw` but submits it
   * to `public/withdraw_debug`, which returns the server-computed encoded data
   * and action/typed-data hashes instead of executing. Use it to verify your
   * client-side signing matches the exchange's.
   */
  async withdrawDebug(params: WithdrawParams) {
    return this.ctx.send('public/withdraw_debug', (await this.buildWithdrawPayload(params)) as never);
  }

  /**
   * Withdrawal history rows (up to 1000). Scoped to one subaccount when
   * `subaccountId` is given, otherwise to the whole owner wallet.
   * Timestamps are unix milliseconds.
   */
  async getHistory(options: { subaccountId?: number; startTimestampMs?: number; endTimestampMs?: number } = {}) {
    return this.ctx.send('private/get_withdrawal_history', {
      subaccount_id: options.subaccountId,
      wallet: options.subaccountId === undefined ? this.ctx.credentials().ownerAddress : undefined,
      start_timestamp: options.startTimestampMs,
      end_timestamp: options.endTimestampMs,
    });
  }
}
