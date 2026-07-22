import type {
  BatchStatus,
  CurrencyResponse,
  GetAllInstrumentsResponse,
  GetLatestSignedFeedsResponse,
  GetOnchainActionHistoryResponse,
  GetReferralPerformanceResult,
  GetTickersResponse,
  GetTransactionResult,
  IndexCandle,
  InstrumentPublicResponse,
  InterestRateHistoryResult,
  MarginWatchResult,
  OptionSettlementPricesResult,
  PublicAssetType,
  PublicTradesResult,
  RiskUniverseResponse,
  TickerSlimSnapshot,
} from '../types';
import type { ClientContext } from './context';

export interface InstrumentsQuery {
  instrumentType: PublicAssetType;
  currency?: string;
  /** Include expired instruments. Default false. */
  expired?: boolean;
  page?: number;
  pageSize?: number;
}

/** Filters for the anonymized public trade tape. All optional. */
export interface PublicTradeHistoryQuery {
  tradeId?: string;
  instrumentName?: string;
  instrumentType?: PublicAssetType;
  currency?: string;
  subaccountId?: number;
  /** Batch lifecycle status filter; defaults to `Settled` server-side. */
  batchStatus?: BatchStatus;
  /** UTC-millisecond bounds. */
  fromTimestamp?: number;
  toTimestamp?: number;
  page?: number;
  pageSize?: number;
}

/** One collateral leg of a `simulateMargin` portfolio; `amount` is a decimal string. */
export interface SimulatedCollateral {
  assetName: string;
  amount: string;
}

/** One position leg of a `simulateMargin` portfolio; `amount` is a decimal string. */
export interface SimulatedPosition {
  instrumentName: string;
  amount: string;
  /** Perps only — entry price to simulate against; defaults to mark price. */
  entryPrice?: string;
}

export interface SimulateMarginParams {
  marginType: 'PM' | 'PM2' | 'SM';
  /** Required for portfolio margin. */
  market?: string;
  simulatedCollaterals: SimulatedCollateral[];
  simulatedPositions: SimulatedPosition[];
  /** Deltas layered on top of `simulatedCollaterals` to model a deposit/withdrawal/spot trade. */
  simulatedCollateralChanges?: SimulatedCollateral[];
  /** Deltas layered on top of `simulatedPositions` to model a perp/option trade. */
  simulatedPositionChanges?: SimulatedPosition[];
}

const toWireCollateral = (c: SimulatedCollateral) => ({ asset_name: c.assetName, amount: c.amount });
const toWirePosition = (p: SimulatedPosition) => ({
  instrument_name: p.instrumentName,
  amount: p.amount,
  entry_price: p.entryPrice ?? null,
});

/** Public market data endpoints — no authentication or signing. */
export class MarketDataApi {
  constructor(private readonly ctx: ClientContext) {}

  getInstrument(instrumentName: string): Promise<InstrumentPublicResponse> {
    return this.ctx.send('public/get_instrument', { instrument_name: instrumentName });
  }

  /** One page of instruments; the response carries pagination info. */
  getInstruments(query: InstrumentsQuery): Promise<GetAllInstrumentsResponse> {
    return this.ctx.send('public/get_all_instruments', {
      instrument_type: query.instrumentType,
      expired: query.expired ?? false,
      currency: query.currency ?? null,
      page: query.page ?? null,
      page_size: query.pageSize ?? null,
    });
  }

  /** Every currently tradeable instrument name across all currencies. */
  getAllLiveInstruments(): Promise<string[]> {
    return this.ctx.send('public/get_all_live_instruments', null);
  }

  /** Anonymized public trade tape (settled trades), newest first. */
  getPublicTradeHistory(query: PublicTradeHistoryQuery = {}): Promise<PublicTradesResult> {
    return this.ctx.send('public/get_trade_history', {
      trade_id: query.tradeId ?? null,
      instrument_name: query.instrumentName ?? null,
      instrument_type: query.instrumentType ?? null,
      currency: query.currency ?? null,
      subaccount_id: query.subaccountId ?? null,
      batch_status: query.batchStatus ?? null,
      from_timestamp: query.fromTimestamp ?? null,
      to_timestamp: query.toTimestamp ?? null,
      page: query.page ?? null,
      page_size: query.pageSize ?? null,
    });
  }

  /**
   * Latest ticker snapshot: top of book (`b`/`a` prices, `B`/`A`
   * amounts), mark (`M`) and index (`I`) prices, and match bounds.
   */
  getTicker(instrumentName: string): Promise<TickerSlimSnapshot> {
    // The generated schema leaves public/get_ticker's result untyped; this is the shape it returns.
    return this.ctx.send('public/get_ticker', { instrument_name: instrumentName }) as Promise<TickerSlimSnapshot>;
  }

  /** Ticker snapshots for every instrument of a type, keyed by instrument name. */
  getTickers(params: {
    instrumentType: PublicAssetType;
    currency?: string;
    expiryDate?: number;
  }): Promise<GetTickersResponse> {
    return this.ctx.send('public/get_tickers', {
      instrument_type: params.instrumentType,
      currency: params.currency ?? null,
      expiry_date: params.expiryDate,
    });
  }

  getAllCurrencies(): Promise<CurrencyResponse[]> {
    return this.ctx.send('public/get_all_currencies', null);
  }

  /**
   * Every risk universe with its managers (instruments + accepted collaterals
   * each) and Security Module — the one call for choosing a `manager_id`
   * and the collateral `address` to deposit.
   */
  getRiskUniverses(): Promise<RiskUniverseResponse[]> {
    return this.ctx.send('public/get_risk_universes', null);
  }

  getCurrency(currency: string): Promise<CurrencyResponse> {
    return this.ctx.send('public/get_currency', { currency });
  }

  /** Latest signed oracle feeds (spot/perp/option/forward), optionally filtered by currency/expiry. */
  getLatestSignedFeeds(params: { currency?: string; expiry?: number } = {}): Promise<GetLatestSignedFeedsResponse> {
    return this.ctx.send('public/get_latest_signed_feeds', {
      currency: params.currency ?? null,
      expiry: params.expiry ?? null,
    });
  }

  /** Settlement prices per expiry for the currency's options. */
  getOptionSettlementPrices(currency: string): Promise<OptionSettlementPricesResult> {
    return this.ctx.send('public/get_option_settlement_prices', { currency });
  }

  /** On-chain settlement status and hash for a single op by its uuid. */
  getTransaction(opUuid: string): Promise<GetTransactionResult> {
    return this.ctx.send('public/get_transaction', { op_uuid: opUuid });
  }

  /**
   * Lifecycle of L1 onchain actions (deposits, forced withdrawals, admin
   * config) scraped from the OnchainActionManager: applied (with op uuid),
   * consumed as a fallback no-op, or still failing with the retry policy and
   * latest rejection. Timestamps filter on the action's last state change.
   */
  getOnchainActionHistory(
    params: {
      wallet?: string;
      actionType?: number;
      startTimestamp?: number;
      endTimestamp?: number;
      page?: number;
      pageSize?: number;
    } = {},
  ): Promise<GetOnchainActionHistoryResponse> {
    return this.ctx.send('public/get_onchain_action_history', {
      wallet: params.wallet ?? null,
      action_type: params.actionType ?? null,
      start_timestamp: params.startTimestamp ?? null,
      end_timestamp: params.endTimestamp ?? null,
      page: params.page ?? null,
      page_size: params.pageSize ?? null,
    });
  }

  /** Referral fee-share and reward breakdown over a millisecond window. */
  getReferralPerformance(params: {
    startMs: number;
    endMs: number;
    referralCode?: string;
    wallet?: string;
  }): Promise<GetReferralPerformanceResult> {
    return this.ctx.send('public/get_referral_performance', {
      start_ms: params.startMs,
      end_ms: params.endMs,
      referral_code: params.referralCode ?? null,
      wallet: params.wallet ?? null,
    });
  }

  /** Spot index OHLC candles for a currency over a UTC-seconds window; `period` is the bucket size in seconds. */
  getIndexChartData(params: {
    currency: string;
    startTimestamp: number;
    endTimestamp: number;
    period: number;
  }): Promise<IndexCandle[]> {
    return this.ctx.send('public/get_index_chart_data', {
      currency: params.currency,
      start_timestamp: params.startTimestamp,
      end_timestamp: params.endTimestamp,
      period: params.period,
    });
  }

  /** Interest-rate candles for a currency's lending pools, optionally scoped to one risk universe. */
  getInterestRateHistory(params: {
    currency: string;
    startTimestamp?: number;
    endTimestamp?: number;
    period?: number;
    riskUniverseId?: number;
  }): Promise<InterestRateHistoryResult> {
    return this.ctx.send('public/get_interest_rate_history', {
      currency: params.currency,
      start_timestamp: params.startTimestamp ?? null,
      end_timestamp: params.endTimestamp ?? null,
      period: params.period ?? null,
      risk_universe_id: params.riskUniverseId ?? null,
    });
  }

  // The methods below pre-date the generated EndpointMap, so their method string and params
  // are cast through `never`; results are untyped (`unknown`) unless a generated type exists.

  /** 24h and lifetime volume/fee/trade statistics for an instrument name or type (`ALL`/`OPTION`/`PERP`/`SPOT`). */
  getStatistics(params: { instrumentName: string; currency?: string; endTime?: number }): Promise<unknown> {
    return this.ctx.send(
      'public/statistics' as never,
      {
        instrument_name: params.instrumentName,
        currency: params.currency ?? null,
        end_time: params.endTime ?? null,
      } as never,
    );
  }

  /** All maker programs, including past/historical epochs. */
  getMakerPrograms(): Promise<unknown> {
    return this.ctx.send('public/get_maker_programs' as never, {} as never);
  }

  /** Per-maker score breakdown for one program epoch. */
  getMakerProgramScores(params: { programName: string; epochStartTimestamp: number }): Promise<unknown> {
    return this.ctx.send(
      'public/get_maker_program_scores' as never,
      {
        program_name: params.programName,
        epoch_start_timestamp: params.epochStartTimestamp,
      } as never,
    );
  }

  /** Paginated liquidation-auction history across all subaccounts (or one, if `subaccountId` is given). */
  getLiquidationHistory(
    params: {
      subaccountId?: number;
      fromTimestamp?: number;
      toTimestamp?: number;
      page?: number;
      pageSize?: number;
    } = {},
  ): Promise<unknown> {
    return this.ctx.send(
      'public/get_liquidation_history' as never,
      {
        subaccount_id: params.subaccountId ?? null,
        start_timestamp: params.fromTimestamp,
        end_timestamp: params.toTimestamp,
        page: params.page,
        page_size: params.pageSize,
      } as never,
    );
  }

  /** Mark-to-market value and maintenance margin for a subaccount. */
  marginWatch(params: {
    subaccountId: number;
    forceOnchain?: boolean;
    isDelayedLiquidation?: boolean;
  }): Promise<MarginWatchResult> {
    return this.ctx.send(
      'public/margin_watch' as never,
      {
        subaccount_id: params.subaccountId,
        force_onchain: params.forceOnchain,
        is_delayed_liquidation: params.isDelayedLiquidation,
      } as never,
    );
  }

  /** Margin requirement for a simulated portfolio and optional trade deltas; ignores open-order margin. */
  simulateMargin(params: SimulateMarginParams): Promise<unknown> {
    return this.ctx.send(
      'public/get_margin' as never,
      {
        margin_type: params.marginType,
        market: params.market ?? null,
        simulated_collaterals: params.simulatedCollaterals.map(toWireCollateral),
        simulated_positions: params.simulatedPositions.map(toWirePosition),
        simulated_collateral_changes: params.simulatedCollateralChanges?.map(toWireCollateral) ?? null,
        simulated_position_changes: params.simulatedPositionChanges?.map(toWirePosition) ?? null,
      } as never,
    );
  }
}
