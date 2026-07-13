import type {
  InterestHistoryResult,
  OptionSettlementHistoryResponse,
  PaginatedTradesResult,
  PaginationInfo,
  PrivateChangeSubaccountLabelRPCResponse,
  PrivateGetAccountEdgeRPCResponse,
  PrivateGetPositionsRPCResponse,
  PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse as SubaccountPortfolio,
  RpcMethod,
  TransferHistoryResult,
} from '../types';
import type { ClientContext } from './context';

export interface TradeHistoryQuery {
  subaccountId?: number;
  instrumentName?: string;
  orderId?: string;
  quoteId?: string;
  /** UTC-millisecond bounds. */
  fromTimestamp?: number;
  toTimestamp?: number;
  page?: number;
  pageSize?: number;
}

/**
 * Window over a wallet's history. Omit `subaccountId` to query the whole
 * authenticated wallet; set it to scope to one subaccount.
 */
export interface WalletHistoryQuery {
  subaccountId?: number;
  /** UTC-millisecond bounds. */
  startTimestamp?: number;
  endTimestamp?: number;
}

export interface LiquidatorHistoryQuery {
  subaccountId: number;
  /** UTC-millisecond bounds. */
  startTimestamp?: number;
  endTimestamp?: number;
  page?: number;
  pageSize?: number;
}

/** A single simulated perp/option position change for `getMargin`. Amounts are decimal strings. */
export interface SimulatedPositionChange {
  instrumentName: string;
  amount: string;
  /** Perps only; mark price is used when omitted. */
  entryPrice?: string;
}

/** A single simulated collateral (ERC-20) change for `getMargin`. Amount is a decimal string. */
export interface SimulatedCollateralChange {
  assetName: string;
  amount: string;
}

export interface MarginQuery {
  subaccountId: number;
  simulatedPositionChanges?: SimulatedPositionChange[];
  simulatedCollateralChanges?: SimulatedCollateralChange[];
}

/** Margin figures before and after the (optionally simulated) trade. All figures are decimal strings. */
export interface MarginResult {
  is_valid_trade: boolean;
  post_initial_margin: string;
  post_maintenance_margin: string;
  pre_initial_margin: string;
  pre_maintenance_margin: string;
  subaccount_id: number;
}

/** One liquidator bid within an auction. Amounts/PnL are decimal strings keyed by asset. */
export interface AuctionBidEvent {
  amounts_liquidated: Record<string, string>;
  cash_received: string;
  discount_pnl: string;
  percent_liquidated: string;
  positions_realized_pnl: Record<string, string>;
  positions_realized_pnl_excl_fees: Record<string, string>;
  realized_pnl: string;
  realized_pnl_excl_fees: string;
  timestamp: number;
  tx_hash: string;
}

/** One auction a subaccount was liquidated in, with the bids that filled it. */
export interface AuctionHistory {
  auction_id: string;
  auction_type: 'solvent' | 'insolvent';
  bids: AuctionBidEvent[];
  /** Auction end, UTC milliseconds; `null` while still live. */
  end_timestamp: number | null;
  fee: string;
  start_timestamp: number;
  subaccount_id: number;
  tx_hash: string;
}

export interface LiquidatorHistoryResult {
  bids: AuctionBidEvent[];
  pagination: PaginationInfo;
}

/** Subaccount portfolio and history endpoints — authenticated, no signing. */
export class SubaccountsApi {
  constructor(private readonly ctx: ClientContext) {}

  /** Ids of all subaccounts owned by the authenticated wallet. */
  async list(): Promise<number[]> {
    const result = await this.ctx.send('private/get_subaccounts', {
      wallet: this.ctx.credentials().ownerAddress,
    });
    return result.subaccount_ids;
  }

  /**
   * Full portfolio snapshot: collaterals, positions, open orders, and
   * the margin figures (there is no separate margin endpoint).
   */
  get(subaccountId: number): Promise<SubaccountPortfolio> {
    return this.ctx.send('private/get_subaccount', { subaccount_id: subaccountId });
  }

  /** Account-level info for the authenticated wallet: fee tiers, subaccount ids, and rate limits. */
  getAccount(): Promise<PrivateGetAccountEdgeRPCResponse> {
    return this.ctx.send('private/get_account', {
      wallet: this.ctx.credentials().ownerAddress,
    });
  }

  /** Full portfolio snapshot for every subaccount owned by the authenticated wallet. */
  getAllPortfolios(): Promise<SubaccountPortfolio[]> {
    return this.ctx.send('private/get_all_portfolios', {
      wallet: this.ctx.credentials().ownerAddress,
    });
  }

  /** Open positions for a subaccount. */
  getPositions(subaccountId: number): Promise<PrivateGetPositionsRPCResponse> {
    return this.ctx.send('private/get_positions', { subaccount_id: subaccountId });
  }

  /** Rename a subaccount. */
  changeLabel(params: { subaccountId: number; label: string }): Promise<PrivateChangeSubaccountLabelRPCResponse> {
    return this.ctx.send('private/change_subaccount_label', {
      subaccount_id: params.subaccountId,
      label: params.label,
    });
  }

  /** Filtered and paginated fills; defaults to all of the wallet's subaccounts. */
  getTradeHistory(query: TradeHistoryQuery = {}): Promise<PaginatedTradesResult> {
    return this.ctx.send('private/get_trade_history', {
      subaccount_id: query.subaccountId ?? null,
      instrument_name: query.instrumentName ?? null,
      order_id: query.orderId ?? null,
      quote_id: query.quoteId ?? null,
      from_timestamp: query.fromTimestamp ?? null,
      to_timestamp: query.toTimestamp ?? null,
      page: query.page ?? null,
      page_size: query.pageSize ?? null,
    });
  }

  /** Realized interest settlements, newest first; defaults to the whole wallet. Capped at 1000 rows. */
  getInterestHistory(query: WalletHistoryQuery = {}): Promise<InterestHistoryResult> {
    // The API rejects an explicit `wallet: null` / `subaccount_id: null` ("Unable to
    // parse …") — the unused filter must be OMITTED, so use undefined (dropped by JSON), not null.
    return this.ctx.send('private/get_interest_history', {
      wallet: query.subaccountId == null ? this.ctx.credentials().ownerAddress : undefined,
      subaccount_id: query.subaccountId ?? undefined,
      start_timestamp: query.startTimestamp ?? undefined,
      end_timestamp: query.endTimestamp ?? undefined,
    });
  }

  /** Internal ERC-20 transfers touching the wallet's subaccounts; defaults to the whole wallet. Capped at 1000 rows. */
  getErc20TransferHistory(query: WalletHistoryQuery = {}): Promise<TransferHistoryResult> {
    return this.ctx.send('private/get_erc20_transfer_history', {
      wallet: query.subaccountId == null ? this.ctx.credentials().ownerAddress : undefined,
      subaccount_id: query.subaccountId ?? undefined,
      start_timestamp: query.startTimestamp ?? undefined,
      end_timestamp: query.endTimestamp ?? undefined,
    });
  }

  /** Settled option positions; defaults to the whole wallet, pass `subaccountId` to scope to one. */
  getOptionSettlementHistory(query: { subaccountId?: number } = {}): Promise<OptionSettlementHistoryResponse> {
    return this.ctx.send('private/get_option_settlement_history', {
      wallet: query.subaccountId == null ? this.ctx.credentials().ownerAddress : undefined,
      subaccount_id: query.subaccountId ?? undefined,
    });
  }

  /**
   * Margin figures for a subaccount, optionally under simulated position/collateral changes.
   * Predates the schema, so it is absent from the generated EndpointMap and sent untyped.
   */
  getMargin(query: MarginQuery): Promise<MarginResult> {
    return this.ctx.send(
      'private/get_margin' as RpcMethod,
      {
        subaccount_id: query.subaccountId,
        simulated_position_changes:
          query.simulatedPositionChanges?.map((p) => ({
            instrument_name: p.instrumentName,
            amount: p.amount,
            entry_price: p.entryPrice ?? null,
          })) ?? null,
        simulated_collateral_changes:
          query.simulatedCollateralChanges?.map((c) => ({
            asset_name: c.assetName,
            amount: c.amount,
          })) ?? null,
      } as never,
    ) as Promise<MarginResult>;
  }

  /**
   * Auctions in which a subaccount (or the whole wallet) was liquidated.
   * Predates the schema, so it is absent from the generated EndpointMap and sent untyped.
   */
  getLiquidationHistory(query: WalletHistoryQuery = {}): Promise<AuctionHistory[]> {
    return this.ctx.send(
      'private/get_liquidation_history' as RpcMethod,
      {
        wallet: query.subaccountId == null ? this.ctx.credentials().ownerAddress : undefined,
        subaccount_id: query.subaccountId ?? undefined,
        start_timestamp: query.startTimestamp ?? undefined,
        end_timestamp: query.endTimestamp ?? undefined,
      } as never,
    ) as Promise<AuctionHistory[]>;
  }

  /**
   * Paginated auctions a subaccount participated in as the liquidator.
   * Predates the schema, so it is absent from the generated EndpointMap and sent untyped.
   */
  getLiquidatorHistory(query: LiquidatorHistoryQuery): Promise<LiquidatorHistoryResult> {
    return this.ctx.send(
      'private/get_liquidator_history' as RpcMethod,
      {
        subaccount_id: query.subaccountId,
        start_timestamp: query.startTimestamp ?? null,
        end_timestamp: query.endTimestamp ?? null,
        page: query.page ?? null,
        page_size: query.pageSize ?? null,
      } as never,
    ) as Promise<LiquidatorHistoryResult>;
  }
}
