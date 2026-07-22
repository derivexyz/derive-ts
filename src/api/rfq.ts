import { formatUnits, getAddress } from 'ethers';
import { encodeRfqExecute, encodeRfqQuote, sortRfqLegs } from '../codecs/rfq';
import { SignedAction } from '../signing/action';
import { domainSeparator } from '../signing/eip712';
import { expiresIn, randomNonce, toE18, type DecimalLike } from '../signing/encoding';
import type {
  CancelBatchResult,
  CancelRfqResponse,
  Direction,
  InstrumentPublicResponse,
  QuoteExecuteWireResponse,
  QuotePollWireResponse,
  QuotePrivateWireResponse,
  QuoteResultPublic,
  RFQPollWireResponse,
  RFQPrivateWireResponse,
  RfqGetBestQuoteWireResponse,
} from '../types';
import type { ClientContext } from './context';

/** A leg of an RFQ as requested by the taker — unpriced; makers quote the price. */
export interface RfqLeg {
  instrumentName: string;
  amount: DecimalLike;
  direction: Direction;
}

/** A priced leg as signed by the maker (`sendQuote`). */
export interface PricedRfqLeg extends RfqLeg {
  price: DecimalLike;
}

/** Maker quote against an open RFQ — see `sendQuote` / `sendQuoteDebug`. */
export interface SendQuoteParams {
  /** The maker's subaccount. */
  subaccountId: number;
  rfqId: string;
  direction: Direction;
  legs: PricedRfqLeg[];
  /** Worst execution fee the maker accepts, in USD. */
  maxFee: DecimalLike;
  mmp?: boolean;
  label?: string;
  nonce?: string;
  signatureExpirySec?: number;
}

/** Taker execution of a maker quote — see `executeQuote` / `executeQuoteDebug`. */
export interface ExecuteQuoteParams {
  /** The taker's subaccount. */
  subaccountId: number;
  quote: Pick<QuoteResultPublic, 'rfq_id' | 'quote_id' | 'direction' | 'legs'>;
  /** Worst execution fee the taker accepts, in USD. */
  maxFee: DecimalLike;
  /** Reject the fill if the quote is no longer the best available price. */
  enableTakerProtection?: boolean;
  label?: string;
  nonce?: string;
  signatureExpirySec?: number;
}

/** A leg with resolved asset identity and e18-normalized numbers — the single source for both the signed bytes and the wire legs. */
interface ResolvedLeg {
  instrumentName: string;
  assetAddress: string;
  subId: string;
  price: bigint;
  amount: bigint;
  direction: Direction;
}

/**
 * The API rejects quote signatures expiring before the RFQ's full 600s
 * quoting window + 60s buffer; 700s covers a quote sent at RFQ creation.
 */
const DEFAULT_QUOTE_EXPIRY_SEC = 700;

/**
 * RFQ trading: takers request quotes on multi-leg packages, makers answer
 * with signed quotes, and the taker executes one — the only two signed
 * operations are `sendQuote` (maker) and `executeQuote` (taker), both
 * against the RFQ module. Requesting, polling and cancelling are auth-only.
 */
export class RfqApi {
  /** Asset address/subId per instrument name are immutable — cache the lookups. */
  private readonly instruments = new Map<string, Promise<InstrumentPublicResponse>>();

  constructor(private readonly ctx: ClientContext) {}

  // ── Taker ──────────────────────────────────────────────────────────

  /** Requests quotes for a package of legs. Unsigned — only the eventual execute is. */
  async sendRfq(params: {
    subaccountId: number;
    legs: RfqLeg[];
    label?: string;
    /** Reject fills costing the taker more than this (buy-side cap). */
    maxTotalCost?: DecimalLike;
    /** Reject fills earning the taker less than this (sell-side floor). */
    minTotalCost?: DecimalLike;
    /** Restrict quoting to these maker wallets. */
    counterparties?: string[];
    partialFillStep?: DecimalLike;
  }): Promise<RFQPrivateWireResponse> {
    return this.ctx.send('private/send_rfq', {
      subaccount_id: params.subaccountId,
      legs: unpricedWireLegs(params.legs),
      label: params.label,
      max_total_cost: params.maxTotalCost === undefined ? undefined : wireDecimal(params.maxTotalCost),
      min_total_cost: params.minTotalCost === undefined ? undefined : wireDecimal(params.minTotalCost),
      counterparties: params.counterparties?.map((wallet) => getAddress(wallet)),
      partial_fill_step: params.partialFillStep === undefined ? undefined : wireDecimal(params.partialFillStep),
    });
  }

  /** Polls quotes received for the taker's RFQs (e.g. `status: 'open'`). */
  async pollQuotes(params: {
    subaccountId: number;
    rfqId?: string;
    quoteId?: string;
    status?: string;
    fromTimestamp?: number;
    toTimestamp?: number;
    page?: number;
    pageSize?: number;
  }): Promise<QuotePollWireResponse> {
    return this.ctx.send('private/poll_quotes', {
      subaccount_id: params.subaccountId,
      rfq_id: params.rfqId,
      quote_id: params.quoteId,
      status: params.status,
      from_timestamp: params.fromTimestamp,
      to_timestamp: params.toTimestamp,
      page: params.page,
      page_size: params.pageSize,
    });
  }

  /** The exchange's pick of the best open quote for an RFQ, with margin/cost estimates. */
  async getBestQuote(params: {
    subaccountId: number;
    /** The open RFQ whose quotes should be evaluated. Omit for a dry-run priced at mark from `legs`. */
    rfqId?: string;
    /** The direction the taker wants to trade. */
    direction: Direction;
    legs: RfqLeg[];
  }): Promise<RfqGetBestQuoteWireResponse> {
    return this.ctx.send('private/rfq_get_best_quote', {
      subaccount_id: params.subaccountId,
      ...(params.rfqId != null ? { rfq_id: params.rfqId } : {}),
      direction: params.direction,
      legs: unpricedWireLegs(params.legs),
    } as never);
  }

  /**
   * Executes a maker quote (from `pollQuotes` / `getBestQuote`). The taker
   * trades opposite the quote's direction and signs a commitment to the
   * maker's exact leg bundle, so legs and prices come from the quote itself.
   */
  async executeQuote(params: ExecuteQuoteParams): Promise<QuoteExecuteWireResponse> {
    return this.ctx.send('private/execute_quote', (await this.buildExecutePayload(params)) as never);
  }

  /**
   * Debug helper: signs the execute exactly like `executeQuote` but submits it
   * to `public/execute_quote_debug`, returning the server-computed encoded data
   * and hashes instead of filling. Use it to verify your client-side signing.
   */
  async executeQuoteDebug(params: ExecuteQuoteParams) {
    return this.ctx.send('public/execute_quote_debug', (await this.buildExecutePayload(params)) as never);
  }

  private async buildExecutePayload(params: ExecuteQuoteParams) {
    const direction: Direction = params.quote.direction === 'buy' ? 'sell' : 'buy';
    const maxFee = toE18(params.maxFee);
    const legs = await this.resolveLegs(
      params.quote.legs.map((leg) => ({
        instrumentName: leg.instrument_name,
        amount: leg.amount,
        price: leg.price,
        direction: leg.direction,
      })),
    );
    const nonce = params.nonce ?? randomNonce();
    const expirySec = params.signatureExpirySec ?? expiresIn(DEFAULT_QUOTE_EXPIRY_SEC);
    const signed = this.signRfqAction(
      params.subaccountId,
      encodeRfqExecute({ maxFee, direction, legs }),
      nonce,
      expirySec,
    );
    return {
      subaccount_id: params.subaccountId,
      rfq_id: params.quote.rfq_id,
      quote_id: params.quote.quote_id,
      direction,
      legs: legs.map(pricedWireLeg),
      max_fee: formatUnits(maxFee, 18),
      nonce,
      signer: signed.signer,
      signature: signed.signature,
      signature_expiry_sec: expirySec,
      enable_taker_protection: params.enableTakerProtection,
      label: params.label,
    };
  }

  async cancelRfq(params: { subaccountId: number; rfqId: string }): Promise<CancelRfqResponse> {
    return this.ctx.send('private/cancel_rfq', {
      subaccount_id: params.subaccountId,
      rfq_id: params.rfqId,
    });
  }

  // ── Maker ──────────────────────────────────────────────────────────

  /** Polls RFQs open for quoting (e.g. `status: 'open'`). */
  async pollRfqs(params: {
    subaccountId: number;
    rfqId?: string;
    status?: string;
    fromTimestamp?: number;
    toTimestamp?: number;
    page?: number;
    pageSize?: number;
  }): Promise<RFQPollWireResponse> {
    return this.ctx.send('private/poll_rfqs', {
      subaccount_id: params.subaccountId,
      rfq_id: params.rfqId,
      status: params.status,
      from_timestamp: params.fromTimestamp,
      to_timestamp: params.toTimestamp,
      page: params.page,
      page_size: params.pageSize,
    });
  }

  /**
   * Signs and sends a quote against an open RFQ. Legs must match the RFQ's
   * legs with prices added; `direction: 'sell'` quotes the package to a
   * buying taker.
   */
  async sendQuote(params: SendQuoteParams): Promise<QuotePrivateWireResponse> {
    return this.ctx.send('private/send_quote', await this.buildSendQuotePayload(params));
  }

  /**
   * Debug helper: signs the quote exactly like `sendQuote` but submits it to
   * `public/send_quote_debug`, returning the server-computed encoded data and
   * hashes instead of posting. Use it to verify your client-side signing.
   */
  async sendQuoteDebug(params: SendQuoteParams) {
    return this.ctx.send('public/send_quote_debug', (await this.buildSendQuotePayload(params)) as never);
  }

  private async buildSendQuotePayload(params: SendQuoteParams) {
    const maxFee = toE18(params.maxFee);
    const legs = await this.resolveLegs(params.legs);
    const nonce = params.nonce ?? randomNonce();
    const expirySec = params.signatureExpirySec ?? expiresIn(DEFAULT_QUOTE_EXPIRY_SEC);
    const signed = this.signRfqAction(
      params.subaccountId,
      encodeRfqQuote({ maxFee, direction: params.direction, legs }),
      nonce,
      expirySec,
    );
    return {
      subaccount_id: params.subaccountId,
      rfq_id: params.rfqId,
      direction: params.direction,
      legs: legs.map(pricedWireLeg),
      max_fee: formatUnits(maxFee, 18),
      // The generated stub types nonce as number; the wire value is the decimal-string nanosecond nonce (> 2^53).
      nonce: nonce as unknown as number,
      signer: signed.signer,
      signature: signed.signature,
      signature_expiry_sec: expirySec,
      mmp: params.mmp,
      label: params.label,
    };
  }

  async cancelQuote(params: {
    subaccountId: number;
    quoteId: string;
    rfqId?: string;
  }): Promise<QuotePrivateWireResponse> {
    return this.ctx.send('private/cancel_quote', {
      subaccount_id: params.subaccountId,
      quote_id: params.quoteId,
      rfq_id: params.rfqId,
    });
  }

  /** Cancels all the subaccount's open quotes, optionally scoped to one RFQ. */
  async cancelBatchQuotes(params: { subaccountId: number; rfqId?: string }): Promise<CancelBatchResult> {
    return this.ctx.send('private/cancel_batch_quotes', {
      subaccount_id: params.subaccountId,
      rfq_id: params.rfqId,
    });
  }

  /** Cancels all the subaccount's open RFQs, optionally scoped to one RFQ id. */
  async cancelBatchRfqs(params: { subaccountId: number; rfqId?: string }) {
    return this.ctx.send('private/cancel_batch_rfqs', {
      subaccount_id: params.subaccountId,
      rfq_id: params.rfqId,
    } as never);
  }

  /** Paginated quote history/read for the subaccount, filterable by rfq/quote/status. */
  async getQuotes(params: {
    subaccountId: number;
    rfqId?: string;
    quoteId?: string;
    status?: string;
    page?: number;
    pageSize?: number;
    fromTimestamp?: number;
    toTimestamp?: number;
  }) {
    return this.ctx.send('private/get_quotes', {
      subaccount_id: params.subaccountId,
      rfq_id: params.rfqId,
      quote_id: params.quoteId,
      status: params.status,
      page: params.page,
      page_size: params.pageSize,
      from_timestamp: params.fromTimestamp,
      to_timestamp: params.toTimestamp,
    } as never);
  }

  /**
   * Atomically cancels an existing quote and signs+sends a replacement on the
   * same RFQ. Legs/price/maxFee sign the new quote exactly like `sendQuote`;
   * identify the quote to cancel by `quoteIdToCancel` or `nonceToCancel`.
   */
  async replaceQuote(params: {
    subaccountId: number;
    rfqId: string;
    direction: Direction;
    legs: PricedRfqLeg[];
    maxFee: DecimalLike;
    quoteIdToCancel?: string;
    nonceToCancel?: string;
    mmp?: boolean;
    label?: string;
    nonce?: string;
    signatureExpirySec?: number;
  }) {
    const maxFee = toE18(params.maxFee);
    const legs = await this.resolveLegs(params.legs);
    const nonce = params.nonce ?? randomNonce();
    const expirySec = params.signatureExpirySec ?? expiresIn(DEFAULT_QUOTE_EXPIRY_SEC);
    const signed = this.signRfqAction(
      params.subaccountId,
      encodeRfqQuote({ maxFee, direction: params.direction, legs }),
      nonce,
      expirySec,
    );
    return this.ctx.send('private/replace_quote', {
      subaccount_id: params.subaccountId,
      rfq_id: params.rfqId,
      direction: params.direction,
      legs: legs.map(pricedWireLeg),
      max_fee: formatUnits(maxFee, 18),
      nonce: nonce as unknown as number,
      signer: signed.signer,
      signature: signed.signature,
      signature_expiry_sec: expirySec,
      quote_id_to_cancel: params.quoteIdToCancel,
      nonce_to_cancel: params.nonceToCancel as unknown as number,
      mmp: params.mmp,
      label: params.label,
    } as never);
  }

  // ── Shared signing plumbing ────────────────────────────────────────

  /** Attaches each leg's protocol asset address + sub id and sorts into the canonical signed order. */
  private async resolveLegs(legs: PricedRfqLeg[]): Promise<ResolvedLeg[]> {
    return sortRfqLegs(
      await Promise.all(
        legs.map(async (leg) => {
          const instrument = await this.instrument(leg.instrumentName);
          return {
            instrumentName: leg.instrumentName,
            assetAddress: instrument.base_asset_address,
            subId: instrument.base_asset_sub_id,
            price: toE18(leg.price),
            amount: toE18(leg.amount),
            direction: leg.direction,
          };
        }),
      ),
    );
  }

  private instrument(name: string): Promise<InstrumentPublicResponse> {
    let lookup = this.instruments.get(name);
    if (!lookup) {
      lookup = this.ctx.send('public/get_instrument', { instrument_name: name });
      lookup.catch(() => this.instruments.delete(name)); // never cache failures
      this.instruments.set(name, lookup);
    }
    return lookup;
  }

  private signRfqAction(
    subaccountId: number,
    data: string,
    nonce: string,
    expirySec: number,
  ): { signer: string; signature: string } {
    const { ownerAddress, signer } = this.ctx.credentials();
    const action = new SignedAction(
      {
        subaccountId,
        nonce,
        module: this.ctx.network.modules.rfq,
        data,
        expirySec,
        owner: ownerAddress,
        signer: signer.address,
      },
      domainSeparator(this.ctx.network),
    ).sign(signer);
    // sign() above guarantees the signature is set
    return { signer: signer.address, signature: action.signature! };
  }
}

/**
 * Wire decimals are decimal strings in human units; round-tripping through
 * e18 both validates the input and normalizes bigints back down.
 */
function wireDecimal(value: DecimalLike): string {
  return formatUnits(toE18(value), 18);
}

/** Unpriced wire legs (sendRfq / getBestQuote), in the canonical sorted order. */
function unpricedWireLegs(legs: RfqLeg[]): Array<{ amount: string; direction: Direction; instrument_name: string }> {
  return sortRfqLegs(legs).map((leg) => {
    const amount = toE18(leg.amount);
    if (amount <= 0n) {
      throw new Error(`rfq leg amount must be positive (direction carries the sign): ${leg.instrumentName}`);
    }
    return { amount: formatUnits(amount, 18), direction: leg.direction, instrument_name: leg.instrumentName };
  });
}

/** Wire decimals are formatted from the signed e18 words so the exchange re-derives the exact signed bytes. */
function pricedWireLeg(leg: ResolvedLeg): {
  amount: string;
  direction: Direction;
  instrument_name: string;
  price: string;
} {
  return {
    amount: formatUnits(leg.amount, 18),
    direction: leg.direction,
    instrument_name: leg.instrumentName,
    price: formatUnits(leg.price, 18),
  };
}
