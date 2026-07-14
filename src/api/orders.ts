import { formatUnits } from 'ethers';
import { encodeTradeData } from '../codecs/trade';
import { SignedAction } from '../signing/action';
import { domainSeparator } from '../signing/eip712';
import { DEFAULT_SIGNATURE_EXPIRY_SEC, expiresIn, randomNonce, toE18, type DecimalLike } from '../signing/encoding';
import type {
  AlgoType,
  CancelAllResponse,
  CancelByLabelWireResponse,
  InstrumentPublicResponse,
  OrderCreatedWireResponse,
  OrderWireResponse,
  PaginatedOrdersResult,
  ResetMmpResponse,
  SetMmpConfigResponse,
  TriggerPriceType,
  TriggerType,
} from '../types';
import type { ClientContext } from './context';
import type { MarketDataApi } from './marketData';

export interface PlaceOrderParams {
  subaccountId: number;
  instrumentName: string;
  direction: 'buy' | 'sell';
  amount: DecimalLike;
  limitPrice: DecimalLike;
  /**
   * Highest fee per unit the signature allows (the exchange charges its
   * normal fee regardless — this only caps it). Defaults to 3x the
   * instrument's current taker cost; pass explicitly for market makers.
   */
  maxFee?: DecimalLike;
  orderType?: 'limit' | 'market';
  timeInForce?: 'gtc' | 'post_only' | 'fok' | 'ioc';
  label?: string;
  /** Count this order against the market-maker-protection limits. */
  mmp?: boolean;
  reduceOnly?: boolean;
  nonce?: string;
  signatureExpirySec?: number;
  /** Conditional-order trigger: fires the order when the price condition is met. */
  triggerType?: TriggerType;
  triggerPrice?: DecimalLike;
  triggerPriceType?: TriggerPriceType;
  /** Referral code recorded against the order's fees. */
  referralCode?: string;
  /** Reject (rather than downgrade) a post-only order that would cross. */
  rejectPostOnly?: boolean;
  /** Marks the order for the atomic-signing flow. */
  isAtomicSigning?: boolean;
  /** Caller-supplied order tag (wire field `client`). */
  clientOrderId?: string;
  /** Additional per-unit fee the caller opts to pay (wire field `extra_fee`). */
  extraFee?: DecimalLike;
  /** Reject the order if the server clock is past this unix-seconds deadline. */
  rejectTimestamp?: number;
  /** Algo-order parameters (e.g. TWAP). */
  algoType?: AlgoType;
  algoDurationSec?: number;
  algoNumSlices?: number;
}

export interface OrderHistoryQuery {
  subaccountId?: number;
  fromTimestamp?: number;
  toTimestamp?: number;
  page?: number;
  pageSize?: number;
}

export interface SetMmpConfigParams {
  subaccountId: number;
  currency: string;
  /** Freeze duration (ms) once tripped; 0 requires a manual `resetMmp`. */
  mmpFrozenTime: number;
  /** Rolling protection window (ms) over which fills accumulate. */
  mmpInterval: number;
  /** Filled-amount limit within the window (decimal string); omit or 0 for unlimited. */
  mmpAmountLimit?: DecimalLike;
  /** Net-delta limit within the window (decimal string); omit or 0 for unlimited. */
  mmpDeltaLimit?: DecimalLike;
}

/** Order placement (signed trade actions) and management. */
export class OrdersApi {
  /** Asset address/subId per instrument name are immutable — cache the lookups. */
  private readonly instruments = new Map<string, Promise<InstrumentPublicResponse>>();

  constructor(
    private readonly ctx: ClientContext,
    private readonly marketData: MarketDataApi,
  ) {}

  /**
   * Builds the signed wire payload shared by `place` and `quote`. The trade
   * action commits only to asset/price/amount/fee/recipient — trigger,
   * referral, algo and the other flags below are wire-only and never signed.
   */
  private async buildOrderPayload(params: PlaceOrderParams) {
    const amount = toE18(params.amount);
    if (amount <= 0n) throw new Error('order amount must be positive');
    const limitPrice = toE18(params.limitPrice);
    const maxFee = toE18(params.maxFee ?? (await this.defaultMaxFee(params.instrumentName, params.limitPrice)));
    if (maxFee < 0n) throw new Error('maxFee must not be negative');

    const instrument = await this.instrument(params.instrumentName);
    const nonce = params.nonce ?? randomNonce();
    const expirySec = params.signatureExpirySec ?? expiresIn(DEFAULT_SIGNATURE_EXPIRY_SEC);
    const { ownerAddress, signer } = this.ctx.credentials();
    const action = new SignedAction(
      {
        subaccountId: params.subaccountId,
        nonce,
        module: this.ctx.network.modules.trade,
        data: encodeTradeData({
          assetAddress: instrument.base_asset_address,
          subId: instrument.base_asset_sub_id,
          limitPrice,
          amount,
          maxFee,
          recipientSubaccountId: params.subaccountId,
          isBid: params.direction === 'buy',
        }),
        expirySec,
        owner: ownerAddress,
        signer: signer.address,
      },
      domainSeparator(this.ctx.network),
    ).sign(signer);

    return {
      subaccount_id: params.subaccountId,
      instrument_name: params.instrumentName,
      direction: params.direction,
      // Wire decimals are formatted from the signed e18 words so the exchange re-derives the exact signed bytes.
      limit_price: formatUnits(limitPrice, 18),
      amount: formatUnits(amount, 18),
      max_fee: formatUnits(maxFee, 18),
      nonce,
      signer: signer.address,
      signature: action.signature!,
      signature_expiry_sec: expirySec,
      order_type: params.orderType ?? 'limit',
      time_in_force: params.timeInForce,
      label: params.label,
      mmp: params.mmp,
      reduce_only: params.reduceOnly,
      trigger_type: params.triggerType,
      trigger_price: params.triggerPrice === undefined ? undefined : formatUnits(toE18(params.triggerPrice), 18),
      trigger_price_type: params.triggerPriceType,
      referral_code: params.referralCode,
      reject_post_only: params.rejectPostOnly,
      is_atomic_signing: params.isAtomicSigning,
      client: params.clientOrderId,
      extra_fee: params.extraFee === undefined ? undefined : formatUnits(toE18(params.extraFee), 18),
      reject_timestamp: params.rejectTimestamp,
      algo_type: params.algoType,
      algo_duration_sec: params.algoDurationSec,
      algo_num_slices: params.algoNumSlices,
    };
  }

  async place(params: PlaceOrderParams): Promise<OrderCreatedWireResponse> {
    return this.ctx.send('private/order', await this.buildOrderPayload(params));
  }

  /**
   * Prices an order without placing it. Signs like `place` (pass
   * `{ public: true }` to hit the unauthenticated public estimate instead).
   */
  async getOrderQuote(params: PlaceOrderParams, options: { public?: boolean } = {}) {
    const payload = await this.buildOrderPayload(params);
    return this.ctx.send(options.public ? 'public/order_quote' : 'private/order_quote', payload as never);
  }

  /** Cancels one order. Needs only authentication, not a signature. */
  cancel(params: { subaccountId: number; orderId: string; instrumentName: string }): Promise<OrderWireResponse> {
    return this.ctx.send('private/cancel', {
      subaccount_id: params.subaccountId,
      order_id: params.orderId,
      instrument_name: params.instrumentName,
    });
  }

  cancelAll(
    subaccountId: number,
    options?: { cancelTriggerOrders?: boolean; cancelAlgoOrders?: boolean },
  ): Promise<CancelAllResponse> {
    return this.ctx.send('private/cancel_all', {
      subaccount_id: subaccountId,
      cancel_trigger_orders: options?.cancelTriggerOrders ?? null,
      cancel_algo_orders: options?.cancelAlgoOrders ?? null,
    });
  }

  cancelByLabel(params: {
    subaccountId: number;
    label: string;
    instrumentName?: string;
  }): Promise<CancelByLabelWireResponse> {
    return this.ctx.send('private/cancel_by_label', {
      subaccount_id: params.subaccountId,
      label: params.label,
      instrument_name: params.instrumentName ?? null,
    });
  }

  getOrder(params: { subaccountId: number; orderId: string }): Promise<OrderWireResponse> {
    return this.ctx.send('private/get_order', {
      subaccount_id: params.subaccountId,
      order_id: params.orderId,
    });
  }

  async getOpenOrders(subaccountId: number): Promise<OrderWireResponse[]> {
    const result = await this.ctx.send('private/get_open_orders', { subaccount_id: subaccountId });
    return result.orders;
  }

  /** Paginated closed/open order history; defaults to all of the wallet's subaccounts. */
  getOrderHistory(query: OrderHistoryQuery = {}): Promise<PaginatedOrdersResult> {
    return this.ctx.send('private/get_order_history', {
      subaccount_id: query.subaccountId ?? null,
      from_timestamp: query.fromTimestamp ?? null,
      to_timestamp: query.toTimestamp ?? null,
      page: query.page ?? null,
      page_size: query.pageSize ?? null,
    });
  }

  /** Sets the market-maker-protection limits for a currency; overwrites any existing config. */
  setMmpConfig(params: SetMmpConfigParams): Promise<SetMmpConfigResponse> {
    return this.ctx.send('private/set_mmp_config', {
      subaccount_id: params.subaccountId,
      currency: params.currency,
      mmp_frozen_time: params.mmpFrozenTime,
      mmp_interval: params.mmpInterval,
      mmp_amount_limit: params.mmpAmountLimit === undefined ? undefined : String(params.mmpAmountLimit),
      mmp_delta_limit: params.mmpDeltaLimit === undefined ? undefined : String(params.mmpDeltaLimit),
    });
  }

  /** Clears a tripped market-maker-protection freeze; scoped to one currency, or all when omitted. */
  resetMmp(params: { subaccountId: number; currency?: string }): Promise<ResetMmpResponse> {
    return this.ctx.send('private/reset_mmp', {
      subaccount_id: params.subaccountId,
      currency: params.currency ?? null,
    });
  }

  private instrument(name: string): Promise<InstrumentPublicResponse> {
    let lookup = this.instruments.get(name);
    if (!lookup) {
      lookup = this.marketData.getInstrument(name);
      lookup.catch(() => this.instruments.delete(name)); // never cache failures
      this.instruments.set(name, lookup);
    }
    return lookup;
  }

  /**
   * The signed max fee must cover whatever the exchange charges at match
   * time or the order is rejected. The exchange bounds the per-unit fee at
   * `2 x taker_fee_rate x max(index, limit) + base_fee`, where `index` is
   * the underlying SPOT feed (`ticker.I`) — NOT the option mark
   * (`ticker.M`). We mirror that and apply a 3x headroom for feed moves
   * between signing and matching.
   */
  private async defaultMaxFee(instrumentName: string, limitPrice: DecimalLike): Promise<string> {
    const [instrument, ticker] = await Promise.all([
      this.instrument(instrumentName),
      this.marketData.getTicker(instrumentName),
    ]);
    const feeBasis = Math.max(Number(ticker.I), Number(limitPrice));
    const perUnitTakerCost = feeBasis * Number(instrument.taker_fee_rate) + Number(instrument.base_fee);
    if (!Number.isFinite(perUnitTakerCost) || perUnitTakerCost < 0) {
      throw new Error(`cannot derive a default max fee for ${instrumentName} — pass maxFee explicitly`);
    }
    return (perUnitTakerCost * 3).toFixed(6);
  }
}
