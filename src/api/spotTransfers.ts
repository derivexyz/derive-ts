import { formatUnits, getAddress } from 'ethers';
import { encodeExternalTransfer } from '../codecs/externalTransfer';
import { encodeTransfer } from '../codecs/transfer';
import { encodeUpdateWhitelistedRecipients } from '../codecs/whitelistedRecipients';
import { SignedAction } from '../signing/action';
import { DEFAULT_SIGNATURE_EXPIRY_SEC, expiresIn, randomNonce, toE18, type DecimalLike } from '../signing/encoding';
import { domainSeparator } from '../signing/eip712';
import type {
  PrivateTransferSpotEdgeRpcResponse,
  PrivateTransferSpotExternalEdgeRpcResponse,
  UpdateWhitelistedRecipientsEdgeRpcResponse,
} from '../types';
import type { ClientContext } from './context';

/**
 * A spot asset as the exchange resolves it: `name` is what the wire takes
 * as `asset_name`, `address` is what signatures commit to, `decimals` is
 * the underlying ERC-20 scale withdrawal amounts are signed at.
 */
export interface SpotAssetInfo {
  name: string;
  address: string;
  decimals: number;
}

/**
 * Resolves a currency name (e.g. "USDC") or protocol asset address to the
 * deposit-enabled spot asset. The exchange reconstructs signed transfer and
 * withdrawal payloads from `asset_name` using this asset's address, so
 * signing any other address of the currency (e.g. a "-NL" variant without
 * ERC-20 metadata) can never verify.
 */
export async function resolveSpotAsset(ctx: ClientContext, asset: string): Promise<SpotAssetInfo> {
  const wanted = asset.trim();
  const wantedAddress = wanted.startsWith('0x') ? getAddress(wanted) : undefined;
  const currencies = await ctx.send('public/get_all_currencies', null);
  for (const currency of currencies) {
    // ERC-20 metadata is only reported for assets with a deposit (spot) config.
    const enabled = currency.spot.filter((s) => s.erc20.underlying_erc20 != null || s.erc20.decimals > 0);
    let match;
    if (wantedAddress) {
      match = enabled.find((s) => getAddress(s.address) === wantedAddress);
    } else if (currency.currency.toUpperCase() === wanted.toUpperCase()) {
      if (enabled.length > 1) {
        throw new Error(
          `currency ${currency.currency} has multiple deposit-enabled spot assets — pass the protocol asset address`,
        );
      }
      match = enabled[0];
      if (!match) throw new Error(`currency ${currency.currency} has no deposit-enabled spot asset`);
    }
    if (match) {
      return { name: currency.currency, address: getAddress(match.address), decimals: match.erc20.decimals };
    }
  }
  throw new Error(
    `unknown asset ${asset} — expected a currency name (e.g. "USDC") or the address of a deposit-enabled spot asset`,
  );
}

/**
 * Formats a wire amount: the JSON wire carries human-unit decimal strings;
 * e18/native scaling exists only inside signed action data. Already-scaled
 * bigint inputs (see `DecimalLike`) are converted back at `scale`.
 */
export function decimalString(value: DecimalLike, scale = 18): string {
  return typeof value === 'bigint' ? formatUnits(value, scale) : String(value).trim();
}

export interface InternalSpotTransferParams {
  /** Sender subaccount. */
  subaccountId: number;
  /** Existing destination subaccount; omit (or 0) when creating one via `newSubaccountManager`. */
  toSubaccountId?: number;
  /** Set to a manager id to create a new subaccount as the destination instead of `toSubaccountId`. */
  newSubaccountManager?: number;
  /** Currency name (e.g. "USDC") or protocol spot-asset address. */
  asset: string;
  subId?: number;
  amount: DecimalLike;
  /**
   * Fee cap in USD, default "0": transfers between existing subaccounts
   * are free. Creating a subaccount charges a transfer fee (1 USD
   * standard), so raise the cap when `newSubaccountManager` is set.
   */
  maxFeeUsd?: DecimalLike;
  nonce?: string;
  signatureExpirySec?: number;
}

export interface ExternalSpotTransferParams {
  /** Sender subaccount. */
  subaccountId: number;
  /** Destination owner wallet. Must be on the sender's whitelist of recipients. */
  recipient: string;
  /** Recipient's existing subaccount; omit (or 0) to create one for them via `newSubaccountManager`. */
  toSubaccountId?: number;
  /** Manager id for the recipient's new subaccount when `toSubaccountId` is omitted. */
  newSubaccountManager?: number;
  /** Currency name (e.g. "USDC") or protocol spot-asset address. */
  asset: string;
  subId?: number;
  amount: DecimalLike;
  /**
   * Fee cap in USD. Required: external transfers always charge a transfer
   * fee (1 USD standard) plus, when a subaccount is created, the
   * protocol's subaccount-creation fee on top.
   */
  maxFeeUsd: DecimalLike;
  nonce?: string;
  signatureExpirySec?: number;
}

/**
 * Spot transfers between subaccounts and to other wallets. Position
 * transfers are not covered here: `private/transfer_positions` takes a
 * maker and a taker RFQ-style signed quote, i.e. two signatures over the
 * RFQ leg encoding.
 */
export class SpotTransfersApi {
  constructor(private readonly ctx: ClientContext) {}

  /**
   * Moves a spot balance between the owner's OWN subaccounts
   * (`private/transfer_spot`). Destination is either an existing
   * `toSubaccountId` or, when `newSubaccountManager` is set, a freshly
   * created sender-owned subaccount under that manager. For a transfer
   * to another wallet use `transferExternal`.
   */
  async transferInternal(params: InternalSpotTransferParams): Promise<PrivateTransferSpotEdgeRpcResponse> {
    const toSubaccountId = params.toSubaccountId ?? 0;
    const newSubaccountManager = params.newSubaccountManager ?? 0;
    if (toSubaccountId === 0 && newSubaccountManager === 0) {
      throw new Error('specify toSubaccountId or, to create a new subaccount, newSubaccountManager');
    }
    const subId = params.subId ?? 0;
    const maxFeeUsd = params.maxFeeUsd ?? '0';
    // Creating a subaccount charges a fee; a zero cap is ACKed then rejected
    // asynchronously by the exchange, so fail loudly up front.
    if (newSubaccountManager !== 0 && toE18(maxFeeUsd) === 0n) {
      throw new Error(
        'creating a subaccount charges a transfer fee — set maxFeeUsd (>= 1) when newSubaccountManager is used',
      );
    }
    const asset = await resolveSpotAsset(this.ctx, params.asset);
    const action = this.signAction(
      params.subaccountId,
      this.ctx.network.modules.transfer,
      encodeTransfer({
        toSubaccountId,
        newSubaccountManager,
        asset: asset.address,
        subId,
        amount: params.amount,
        maxFeeUsd,
      }),
      params,
    );
    return this.ctx.send('private/transfer_spot', {
      subaccount_id: params.subaccountId,
      to_subaccount_id: toSubaccountId,
      new_subaccount_manager: newSubaccountManager,
      asset_name: asset.name,
      sub_id: subId,
      amount: decimalString(params.amount),
      max_fee_usd: decimalString(maxFeeUsd),
      // Nonces are UTC-nanosecond decimal strings beyond 2^53; the API accepts string-or-number despite the generated `number`.
      nonce: action.fields.nonce as unknown as number,
      signer: action.fields.signer,
      signature: action.signature!,
      signature_expiry_sec: action.fields.expirySec,
    });
  }

  /**
   * Adds/removes recipient wallets on the owner's external-transfer
   * whitelist (`private/update_whitelisted_recipients`). The resulting
   * list is `(current ∪ add) \ remove`. Required before `transferExternal`
   * can send to a given wallet.
   */
  async updateWhitelistedRecipients(params: {
    add?: string[];
    remove?: string[];
    nonce?: string;
    signatureExpirySec?: number;
  }): Promise<UpdateWhitelistedRecipientsEdgeRpcResponse> {
    const add = params.add ?? [];
    const remove = params.remove ?? [];
    if (add.length === 0 && remove.length === 0) {
      throw new Error('updateWhitelistedRecipients needs at least one address to add or remove');
    }
    const { ownerAddress } = this.ctx.credentials();
    // The whitelist is a wallet-level list, so the action is signed on subaccount 0.
    const action = this.signAction(
      0,
      this.ctx.network.modules.whitelistedRecipient,
      encodeUpdateWhitelistedRecipients({ add, remove }),
      params,
    );
    return this.ctx.send('private/update_whitelisted_recipients', {
      wallet: ownerAddress,
      add: add.map((a) => getAddress(a)),
      remove: remove.map((a) => getAddress(a)),
      // Nonces are UTC-nanosecond decimal strings beyond 2^53; the API accepts string-or-number despite the generated `number`.
      nonce: action.fields.nonce as unknown as number,
      signer: action.fields.signer,
      signature: action.signature!,
      signature_expiry_sec: action.fields.expirySec,
    });
  }

  /**
   * Moves a spot balance to another owner's wallet
   * (`private/transfer_spot_external`). The recipient must already be on
   * the sender's whitelist — call `updateWhitelistedRecipients` first;
   * otherwise the exchange rejects with RPC error 11033 "Transfer
   * recipient not whitelisted".
   */
  async transferExternal(params: ExternalSpotTransferParams): Promise<PrivateTransferSpotExternalEdgeRpcResponse> {
    const recipient = getAddress(params.recipient);
    const toSubaccountId = params.toSubaccountId ?? 0;
    const newSubaccountManager = params.newSubaccountManager ?? 0;
    if (toSubaccountId === 0 && newSubaccountManager === 0) {
      throw new Error("specify the recipient's toSubaccountId or, to create one for them, newSubaccountManager");
    }
    const subId = params.subId ?? 0;
    const asset = await resolveSpotAsset(this.ctx, params.asset);
    const action = this.signAction(
      params.subaccountId,
      this.ctx.network.modules.externalTransfer,
      encodeExternalTransfer({
        toSubaccountId,
        newSubaccountManager,
        asset: asset.address,
        subId,
        amount: params.amount,
        maxFeeUsd: params.maxFeeUsd,
        recipient,
      }),
      params,
    );
    return this.ctx.send('private/transfer_spot_external', {
      subaccount_id: params.subaccountId,
      recipient_address: recipient,
      to_subaccount_id: toSubaccountId,
      new_subaccount_manager: newSubaccountManager,
      asset_name: asset.name,
      sub_id: subId,
      amount: decimalString(params.amount),
      max_fee_usd: decimalString(params.maxFeeUsd),
      // Nonces are UTC-nanosecond decimal strings beyond 2^53; the API accepts string-or-number despite the generated `number`.
      nonce: action.fields.nonce as unknown as number,
      signer: action.fields.signer,
      signature: action.signature!,
      signature_expiry_sec: action.fields.expirySec,
    });
  }

  private signAction(
    subaccountId: number,
    module: string,
    data: string,
    overrides: { nonce?: string; signatureExpirySec?: number },
  ): SignedAction {
    const { ownerAddress, signer } = this.ctx.credentials();
    return new SignedAction(
      {
        subaccountId,
        nonce: overrides.nonce ?? randomNonce(),
        module,
        data,
        expirySec: overrides.signatureExpirySec ?? expiresIn(DEFAULT_SIGNATURE_EXPIRY_SEC),
        owner: ownerAddress,
        signer: signer.address,
      },
      domainSeparator(this.ctx.network),
    ).sign(signer);
  }
}
