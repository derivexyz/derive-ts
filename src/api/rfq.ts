import { formatUnits, getAddress } from 'ethers';
import { encodeRfqExecute, encodeRfqQuote, sortRfqLegs, type RfqQuoteFields } from '../codecs/rfq';
import { SignedAction } from '../signing/action';
import { domainSeparator } from '../signing/eip712';
import { expiresIn, randomNonce, toE18, type DecimalLike } from '../signing/encoding';
import type {
  BlockProposalGetPublicWireResponse,
  BlockProposalGetWireResponse,
  BlockProposalPrivateWireResponse,
  BlockProposalResultPublic,
  BlockTradeExecuteWireResponse,
  BlockTradeSideCheckWireResponse,
  CancelBatchResult,
  CancelRfqResponse,
  Direction,
  InstrumentPublicResponse,
  InvalidateBlockTradeSignatureResponse,
  LiquidityRole,
  QuoteExecuteWireResponse,
  QuotePollWireResponse,
  QuotePrivateWireResponse,
  QuoteResultPublic,
  RFQPollWireResponse,
  RFQPrivateWireResponse,
  RfqGetBestQuoteWireResponse,
  SignedBlockTradeSideEdgeRpcParams,
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
  /**
   * Reject the fill (`QuoteTakerCostTooHigh`) if the orderbook fills the same
   * legs at a lower total cost. No check when the book cannot fill every leg.
   */
  enableTakerProtection?: boolean;
  label?: string;
  nonce?: string;
  signatureExpirySec?: number;
}

/**
 * One party's side of a block trade, built from the terms both parties
 * agreed — see `signBlockTradeMakerSide` / `signBlockTradeTakerSide`.
 */
export interface BlockTradeSideParams {
  /** The signing party's subaccount. */
  subaccountId: number;
  /** The maker side's direction. The taker side trades the opposite direction. */
  makerDirection: Direction;
  /** The agreed priced legs. Both sides sign and send the same legs. */
  legs: PricedRfqLeg[];
  /** Highest total fee this side pays, in USD, including `extraFee`. */
  maxFee: DecimalLike;
  /**
   * UTC nanoseconds. The side executes from 1 minute before to 5 minutes after
   * this time, or to 59 minutes after for a maker side sent as a block proposal.
   * Defaults to now; date it ahead for a planned submit time.
   */
  nonce?: string;
  /** Defaults to 6 minutes after the nonce time. */
  signatureExpirySec?: number;
  /** Broker fee for this side, in USD, paid to the owner of `referralCode`. Not signed. */
  extraFee?: DecimalLike;
  referralCode?: string;
  label?: string;
  client?: string;
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
 * The API rejects quote and execute signatures that expire less than 60s
 * after the RFQ's `valid_until`, and more than one day from now. One hour
 * covers the RFQ window on every network, even for a brand-new RFQ.
 */
const DEFAULT_QUOTE_EXPIRY_SEC = 3600;

/**
 * The API accepts a block-trade side from 1 minute before to 5 minutes after
 * its nonce time, while its signature expires at least 60s after submission.
 * Expiring 6 minutes after the nonce time keeps the window as the limit.
 */
const DEFAULT_BLOCK_TRADE_EXPIRY_SEC = 5 * 60 + 60;

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

  /**
   * Requests quotes for a package of legs. Unsigned — only the eventual execute is.
   *
   * `maxTotalCost` and `minTotalCost` are quote filters, not execution limits.
   * Only `getBestQuote` and the `{subaccount_id}.best.quotes` channel apply them.
   * `pollQuotes` returns every quote, and `executeQuote` fills any valid quote.
   * Check the cost yourself before you execute.
   *
   * Total cost is in USD for the full RFQ size, from the taker's side:
   * positive means you pay, negative means you receive.
   */
  async sendRfq(params: {
    subaccountId: number;
    legs: RfqLeg[];
    label?: string;
    /** When you buy: hide quotes that cost more than this. */
    maxTotalCost?: DecimalLike;
    /**
     * When you sell: hide quotes that cost more than this. A sale that pays you
     * has a negative cost, so `-180` hides quotes that pay you less than 180.
     */
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
      nonce: nonce,
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
      nonce: nonce,
      signer: signed.signer,
      signature: signed.signature,
      signature_expiry_sec: expirySec,
      quote_id_to_cancel: params.quoteIdToCancel,
      nonce_to_cancel: params.nonceToCancel,
      mmp: params.mmp,
      label: params.label,
    } as never);
  }

  // ── Block trades ───────────────────────────────────────────────────

  /**
   * The fee and margin of one block-trade side of your subaccount, from the
   * agreed terms, before anyone signs. A side short of margin returns
   * `is_valid: false`, not an error. `price_band_min_total_cost` and
   * `price_band_max_total_cost` are the total costs between which the side
   * is inside the RFQ price band. They do not depend on the leg prices.
   */
  async simulateBlockTrade(params: {
    subaccountId: number;
    /** This side's direction. The taker side trades opposite the maker side. */
    direction: Direction;
    /** The agreed priced legs, the same on both sides. */
    legs: PricedRfqLeg[];
    /** Broker fee for this side, in USD. */
    extraFee?: DecimalLike;
  }): Promise<BlockTradeSideCheckWireResponse> {
    return this.ctx.send('private/simulate_block_trade', {
      subaccount_id: params.subaccountId,
      direction: params.direction,
      legs: params.legs.map((leg) => ({
        instrument_name: leg.instrumentName,
        amount: wireDecimal(leg.amount),
        price: wireDecimal(leg.price),
        direction: leg.direction,
      })),
      extra_fee: params.extraFee === undefined ? undefined : wireDecimal(params.extraFee),
    });
  }

  /**
   * Signs the maker side of a block trade with this client's credentials.
   * The maker signs the same payload as an RFQ quote: its own `maxFee` and
   * the legs in `makerDirection`. Give the result only to the submitter: the
   * signature does not name a counterparty, so any holder can take the trade.
   */
  async signBlockTradeMakerSide(params: BlockTradeSideParams): Promise<SignedBlockTradeSideEdgeRpcParams> {
    return this.signBlockTradeSide(params, params.makerDirection, encodeRfqQuote);
  }

  /**
   * Signs the taker side of a block trade with this client's credentials.
   * The taker signs the same payload as an RFQ execute: a hash of the legs in
   * `makerDirection` (the maker's max fee is not part of it) and its own
   * `maxFee`. The taker trades opposite `makerDirection`.
   */
  async signBlockTradeTakerSide(params: BlockTradeSideParams): Promise<SignedBlockTradeSideEdgeRpcParams> {
    const direction: Direction = params.makerDirection === 'buy' ? 'sell' : 'buy';
    return this.signBlockTradeSide(params, direction, encodeRfqExecute);
  }

  /**
   * Checks a signed side of your subaccount as `executeBlockTrade` would now,
   * and returns its fee, margin and `expires_at_sec`. Pass the output of
   * `signBlockTradeMakerSide` with `role: 'maker'`, or of
   * `signBlockTradeTakerSide` with `role: 'taker'`. The side stays usable.
   */
  async verifyBlockTrade(params: {
    side: SignedBlockTradeSideEdgeRpcParams;
    role: LiquidityRole;
  }): Promise<BlockTradeSideCheckWireResponse> {
    return this.ctx.send('private/verify_block_trade', { ...params.side, role: params.role });
  }

  /**
   * Submits both signed sides of a block trade. The caller needs no access to
   * either subaccount: the two signatures authorize the trade.
   */
  async executeBlockTrade(params: {
    makerParams: SignedBlockTradeSideEdgeRpcParams;
    takerParams: SignedBlockTradeSideEdgeRpcParams;
  }): Promise<BlockTradeExecuteWireResponse> {
    return this.ctx.send('private/execute_block_trade', {
      maker_params: params.makerParams,
      taker_params: params.takerParams,
    });
  }

  /**
   * Invalidates a block-trade side that this client's account signed, so it
   * cannot execute. Fails if the side has executed or is executing.
   */
  async invalidateBlockTradeSignature(params: {
    subaccountId: number;
    nonce: string;
  }): Promise<InvalidateBlockTradeSignatureResponse> {
    return this.ctx.send('private/invalidate_block_trade_signature', {
      subaccount_id: params.subaccountId,
      nonce: params.nonce,
    });
  }

  private async signBlockTradeSide(
    params: BlockTradeSideParams,
    direction: Direction,
    encode: (fields: RfqQuoteFields) => string,
  ): Promise<SignedBlockTradeSideEdgeRpcParams> {
    const maxFee = toE18(params.maxFee);
    const legs = await this.resolveLegs(params.legs);
    const nonce = params.nonce ?? randomNonce();
    const nonceMs = Number(BigInt(nonce) / 1_000_000n);
    const expirySec = params.signatureExpirySec ?? expiresIn(DEFAULT_BLOCK_TRADE_EXPIRY_SEC, nonceMs);
    const signed = this.signRfqAction(params.subaccountId, encode({ maxFee, direction, legs }), nonce, expirySec);
    return {
      subaccount_id: params.subaccountId,
      direction,
      legs: legs.map(pricedWireLeg),
      max_fee: formatUnits(maxFee, 18),
      nonce,
      signer: signed.signer,
      signature: signed.signature,
      signature_expiry_sec: expirySec,
      extra_fee: params.extraFee === undefined ? undefined : wireDecimal(params.extraFee),
      referral_code: params.referralCode,
      label: params.label,
      client: params.client,
    };
  }

  // ── Block proposals ────────────────────────────────────────────────

  /**
   * Offers a signed maker side for a taker to accept with
   * `acceptBlockProposal`. The exchange keeps the signature: no other user
   * can see it.
   *
   * With `recipientWallet`, only that wallet can see and accept the proposal.
   * With `listed`, the proposal is on the public list. With neither, anyone
   * who has the `proposal_id` can read and accept it, so share the id only
   * with the intended counterparty.
   *
   * The signed side sets how long the proposal stays open: until 60 seconds
   * before its signature expiry, or 59 minutes after its nonce time,
   * whichever is first. The response gives that time as `expires_at_sec`.
   * `signBlockTradeMakerSide` signs an expiry 6 minutes after the nonce time
   * by default, so the proposal stays open for 5 minutes. For another time,
   * sign the side with another `signatureExpirySec`. A proposal must stay
   * open for at least 60 seconds.
   */
  async sendBlockProposal(params: {
    /**
     * The output of `signBlockTradeMakerSide`. Its `extra_fee`,
     * `referral_code`, `label` and `client` are not sent: a proposal trades
     * with no broker fee.
     */
    side: SignedBlockTradeSideEdgeRpcParams;
    /** The only wallet that can see and accept the proposal. Not allowed with `listed`. */
    recipientWallet?: string;
    /** Puts the proposal on the public list. Defaults to false. */
    listed?: boolean;
  }): Promise<BlockProposalPrivateWireResponse> {
    const { side } = params;
    return this.ctx.send('private/send_block_proposal', {
      subaccount_id: side.subaccount_id,
      nonce: side.nonce,
      signer: side.signer,
      max_fee: side.max_fee,
      signature_expiry_sec: side.signature_expiry_sec,
      direction: side.direction,
      legs: side.legs,
      signature: side.signature,
      recipient_wallet: params.recipientWallet === undefined ? undefined : getAddress(params.recipientWallet),
      listed: params.listed,
    });
  }

  /**
   * Accepts a block proposal, which executes its block trade at once. Signs
   * the taker side like `signBlockTradeTakerSide`, over the legs and prices
   * of `proposal`, so the taker trades opposite the proposal's `direction`.
   * The first valid accept wins. Returns the proposal with status `executed`
   * and its `block_trade_id`. The error of a failed accept has no `data`.
   */
  async acceptBlockProposal(params: {
    /** The taker's subaccount. */
    subaccountId: number;
    /** The proposal, as any block proposal read or channel returns it. */
    proposal: Pick<BlockProposalResultPublic, 'proposal_id' | 'direction' | 'legs'>;
    /** Highest total fee the taker pays, in USD. */
    maxFee: DecimalLike;
    nonce?: string;
    signatureExpirySec?: number;
  }): Promise<BlockProposalResultPublic> {
    const side = await this.signBlockTradeTakerSide({
      subaccountId: params.subaccountId,
      makerDirection: params.proposal.direction,
      legs: params.proposal.legs.map((leg) => ({
        instrumentName: leg.instrument_name,
        amount: leg.amount,
        price: leg.price,
        direction: leg.direction,
      })),
      maxFee: params.maxFee,
      nonce: params.nonce,
      signatureExpirySec: params.signatureExpirySec,
    });
    return this.ctx.send('private/accept_block_proposal', {
      proposal_id: params.proposal.proposal_id,
      subaccount_id: side.subaccount_id,
      nonce: side.nonce,
      signer: side.signer,
      max_fee: side.max_fee,
      signature_expiry_sec: side.signature_expiry_sec,
      signature: side.signature,
    });
  }

  /**
   * Ends an open block proposal, so it can never execute. The maker's call
   * sets the status `cancelled`; the recipient wallet's call sets `declined`.
   */
  async cancelBlockProposal(params: { proposalId: string }): Promise<BlockProposalPrivateWireResponse> {
    return this.ctx.send('private/cancel_block_proposal', {
      wallet: this.ctx.credentials().ownerAddress,
      proposal_id: params.proposalId,
    });
  }

  /**
   * The block proposals the wallet made or received as recipient wallet:
   * the open ones and those that ended recently, most recently updated first.
   */
  async getBlockProposals(): Promise<BlockProposalGetWireResponse> {
    return this.ctx.send('private/get_block_proposals', { wallet: this.ctx.credentials().ownerAddress });
  }

  /**
   * The block proposals on the public list: those that have not ended, then
   * those that ended recently. Optionally scoped to one currency (e.g. `ETH`).
   */
  async getListedBlockProposals(params: { currency?: string } = {}): Promise<BlockProposalGetPublicWireResponse> {
    return this.ctx.send('public/get_block_proposals', { currency: params.currency });
  }

  /**
   * One block proposal by its id, listed or not. Fails for a proposal with a
   * recipient wallet: its maker and its recipient read it with `getBlockProposals`.
   */
  async getBlockProposal(params: { proposalId: string }): Promise<BlockProposalResultPublic> {
    return this.ctx.send('public/get_block_proposal', { proposal_id: params.proposalId });
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
