/* GENERATED FILE — DO NOT EDIT. */
/* eslint-disable */

/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcId".
 */
export type JsonRpcId = string | number | null;
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "Address".
 */
export type Address = string;
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_VaultSettleWireResponse".
 */
export type JSONRPCResponseFor_VaultSettleWireResponse = JSONRPCResponseFor_VaultSettleWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_VaultSettleWireResponse1 =
  | {
      result: VaultSettleWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_OrderWireResponse".
 */
export type JSONRPCResponseFor_OrderWireResponse = JSONRPCResponseFor_OrderWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_OrderWireResponse1 =
  | {
      result: OrderWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AlgoType".
 */
export type AlgoType = 'twap';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "Direction".
 */
export type Direction = 'buy' | 'sell';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderStatus".
 */
export type OrderStatus = 'open' | 'filled' | 'rejected' | 'cancelled' | 'expired' | 'untriggered' | 'algo_active';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderType".
 */
export type OrderType = 'limit' | 'market';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TimeInForce".
 */
export type TimeInForce = 'gtc' | 'post_only' | 'fok' | 'ioc';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TriggerPriceType".
 */
export type TriggerPriceType = 'mark' | 'index';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TriggerType".
 */
export type TriggerType = 'stoploss' | 'takeprofit';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_CancelAllResponse".
 */
export type JSONRPCResponseFor_CancelAllResponse = JSONRPCResponseFor_CancelAllResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_CancelAllResponse1 =
  | {
      result: CancelAllResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelAllResponse".
 */
export type CancelAllResponse = 'ok';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_CancelAllAlgoOrdersResponse".
 */
export type JSONRPCResponseFor_CancelAllAlgoOrdersResponse = JSONRPCResponseFor_CancelAllAlgoOrdersResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_CancelAllAlgoOrdersResponse1 =
  | {
      result: CancelAllAlgoOrdersResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelAllAlgoOrdersResponse".
 */
export type CancelAllAlgoOrdersResponse = 'ok';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_CancelAllTriggerOrdersResponse".
 */
export type JSONRPCResponseFor_CancelAllTriggerOrdersResponse = JSONRPCResponseFor_CancelAllTriggerOrdersResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_CancelAllTriggerOrdersResponse1 =
  | {
      result: CancelAllTriggerOrdersResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelAllTriggerOrdersResponse".
 */
export type CancelAllTriggerOrdersResponse = 'ok';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_VaultCancelWireResponse".
 */
export type JSONRPCResponseFor_VaultCancelWireResponse = JSONRPCResponseFor_VaultCancelWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_VaultCancelWireResponse1 =
  | {
      result: VaultCancelWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_CancelBatchResult".
 */
export type JSONRPCResponseFor_CancelBatchResult = JSONRPCResponseFor_CancelBatchResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_CancelBatchResult1 =
  | {
      result: CancelBatchResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_CancelBatchRfqsWireResponse".
 */
export type JSONRPCResponseFor_CancelBatchRfqsWireResponse = JSONRPCResponseFor_CancelBatchRfqsWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_CancelBatchRfqsWireResponse1 =
  | {
      result: CancelBatchRfqsWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_CancelByInstrumentWireResponse".
 */
export type JSONRPCResponseFor_CancelByInstrumentWireResponse = JSONRPCResponseFor_CancelByInstrumentWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_CancelByInstrumentWireResponse1 =
  | {
      result: CancelByInstrumentWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_CancelByLabelWireResponse".
 */
export type JSONRPCResponseFor_CancelByLabelWireResponse = JSONRPCResponseFor_CancelByLabelWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_CancelByLabelWireResponse1 =
  | {
      result: CancelByLabelWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_CancelByNonceWireResponse".
 */
export type JSONRPCResponseFor_CancelByNonceWireResponse = JSONRPCResponseFor_CancelByNonceWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_CancelByNonceWireResponse1 =
  | {
      result: CancelByNonceWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_QuotePrivateWireResponse".
 */
export type JSONRPCResponseFor_QuotePrivateWireResponse = JSONRPCResponseFor_QuotePrivateWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_QuotePrivateWireResponse1 =
  | {
      result: QuotePrivateWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "BatchStatus".
 */
export type BatchStatus =
  | 'Batching'
  | 'Executing'
  | 'Proving'
  | 'Settling'
  | 'Settled'
  | 'BatchingError'
  | 'ExecutingError'
  | 'ProvingError'
  | 'SettlingError'
  | 'SettledError';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RFQCancelReason".
 */
export type RFQCancelReason =
  | ''
  | 'user_request'
  | 'insufficient_margin'
  | 'signed_max_fee_too_low'
  | 'mmp_trigger'
  | 'cancel_on_disconnect'
  | 'session_key_deregistered'
  | 'subaccount_withdrawn'
  | 'rfq_no_longer_open'
  | 'compliance';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "LiquidityRole".
 */
export type LiquidityRole = 'maker' | 'taker';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RFQStatus".
 */
export type RFQStatus = 'open' | 'filled' | 'cancelled' | 'expired';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_CancelRfqResponse".
 */
export type JSONRPCResponseFor_CancelRfqResponse = JSONRPCResponseFor_CancelRfqResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_CancelRfqResponse1 =
  | {
      result: CancelRfqResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelRfqResponse".
 */
export type CancelRfqResponse = 'ok';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PrivateChangeSubaccountLabelRPCResponse".
 */
export type JSONRPCResponseFor_PrivateChangeSubaccountLabelRPCResponse =
  JSONRPCResponseFor_PrivateChangeSubaccountLabelRPCResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PrivateChangeSubaccountLabelRPCResponse1 =
  | {
      result: PrivateChangeSubaccountLabelRPCResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PrivateCreateSessionKeyEdgeRPCResponse".
 */
export type JSONRPCResponseFor_PrivateCreateSessionKeyEdgeRPCResponse =
  JSONRPCResponseFor_PrivateCreateSessionKeyEdgeRPCResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PrivateCreateSessionKeyEdgeRPCResponse1 =
  | {
      result: PrivateCreateSessionKeyEdgeRPCResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_VaultCreateWireResponse".
 */
export type JSONRPCResponseFor_VaultCreateWireResponse = JSONRPCResponseFor_VaultCreateWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_VaultCreateWireResponse1 =
  | {
      result: VaultCreateWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_SessionKeyResponse".
 */
export type JSONRPCResponseFor_SessionKeyResponse = JSONRPCResponseFor_SessionKeyResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_SessionKeyResponse1 =
  | {
      result: SessionKeyResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_QuoteExecuteWireResponse".
 */
export type JSONRPCResponseFor_QuoteExecuteWireResponse = JSONRPCResponseFor_QuoteExecuteWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_QuoteExecuteWireResponse1 =
  | {
      result: QuoteExecuteWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_VaultForceBurnWireResponse".
 */
export type JSONRPCResponseFor_VaultForceBurnWireResponse = JSONRPCResponseFor_VaultForceBurnWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_VaultForceBurnWireResponse1 =
  | {
      result: VaultForceBurnWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PrivateGetAccountEdgeRPCResponse".
 */
export type JSONRPCResponseFor_PrivateGetAccountEdgeRPCResponse =
  JSONRPCResponseFor_PrivateGetAccountEdgeRPCResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PrivateGetAccountEdgeRPCResponse1 =
  | {
      result: PrivateGetAccountEdgeRPCResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_Array_of_OrderWireResponse".
 */
export type JSONRPCResponseFor_ArrayOf_OrderWireResponse = JSONRPCResponseFor_ArrayOf_OrderWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ArrayOf_OrderWireResponse1 =
  | {
      result: OrderWireResponse[];
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_Array_of_PrivateGetSubaccountRPCResponse_for_OrderWireResponse_and_VaultDepositHoldResponse".
 */
export type JSONRPCResponseFor_ArrayOf_PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse =
  JSONRPCResponseFor_ArrayOf_PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_ArrayOf_PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse1 =
  | {
      result: PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse[];
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PublicAssetType".
 */
export type PublicAssetType = 'option' | 'perp' | 'erc20';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PrivateGetCollateralsRPCResponse".
 */
export type JSONRPCResponseFor_PrivateGetCollateralsRPCResponse =
  JSONRPCResponseFor_PrivateGetCollateralsRPCResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PrivateGetCollateralsRPCResponse1 =
  | {
      result: PrivateGetCollateralsRPCResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_VaultIdsWireResponse".
 */
export type JSONRPCResponseFor_VaultIdsWireResponse = JSONRPCResponseFor_VaultIdsWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_VaultIdsWireResponse1 =
  | {
      result: VaultIdsWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_DepositHistoryResult".
 */
export type JSONRPCResponseFor_DepositHistoryResult = JSONRPCResponseFor_DepositHistoryResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_DepositHistoryResult1 =
  | {
      result: DepositHistoryResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_TransferHistoryResult".
 */
export type JSONRPCResponseFor_TransferHistoryResult = JSONRPCResponseFor_TransferHistoryResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_TransferHistoryResult1 =
  | {
      result: TransferHistoryResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PerpSettlementHistoryEdgeResponse".
 */
export type JSONRPCResponseFor_PerpSettlementHistoryEdgeResponse =
  JSONRPCResponseFor_PerpSettlementHistoryEdgeResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PerpSettlementHistoryEdgeResponse1 =
  | {
      result: PerpSettlementHistoryEdgeResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_InterestHistoryResult".
 */
export type JSONRPCResponseFor_InterestHistoryResult = JSONRPCResponseFor_InterestHistoryResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_InterestHistoryResult1 =
  | {
      result: InterestHistoryResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_MultipleVaultRequestsWireResponse".
 */
export type JSONRPCResponseFor_MultipleVaultRequestsWireResponse =
  JSONRPCResponseFor_MultipleVaultRequestsWireResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_MultipleVaultRequestsWireResponse1 =
  | {
      result: MultipleVaultRequestsWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_Array_of_MmpConfigResult".
 */
export type JSONRPCResponseFor_ArrayOf_MmpConfigResult = JSONRPCResponseFor_ArrayOf_MmpConfigResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ArrayOf_MmpConfigResult1 =
  | {
      result: MmpConfigResult[];
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_AggregatedOrdersResult".
 */
export type JSONRPCResponseFor_AggregatedOrdersResult = JSONRPCResponseFor_AggregatedOrdersResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_AggregatedOrdersResult1 =
  | {
      result: AggregatedOrdersResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_OptionSettlementHistoryResponse".
 */
export type JSONRPCResponseFor_OptionSettlementHistoryResponse = JSONRPCResponseFor_OptionSettlementHistoryResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_OptionSettlementHistoryResponse1 =
  | {
      result: OptionSettlementHistoryResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PaginatedOrdersResult".
 */
export type JSONRPCResponseFor_PaginatedOrdersResult = JSONRPCResponseFor_PaginatedOrdersResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_PaginatedOrdersResult1 =
  | {
      result: PaginatedOrdersResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PrivateGetPositionsRPCResponse".
 */
export type JSONRPCResponseFor_PrivateGetPositionsRPCResponse = JSONRPCResponseFor_PrivateGetPositionsRPCResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_PrivateGetPositionsRPCResponse1 =
  | {
      result: PrivateGetPositionsRPCResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_QuoteGetWireResponse".
 */
export type JSONRPCResponseFor_QuoteGetWireResponse = JSONRPCResponseFor_QuoteGetWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_QuoteGetWireResponse1 =
  | {
      result: QuoteGetWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_RFQGetWireResponse".
 */
export type JSONRPCResponseFor_RFQGetWireResponse = JSONRPCResponseFor_RFQGetWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_RFQGetWireResponse1 =
  | {
      result: RFQGetWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PrivateGetSubaccountRPCResponse_for_OrderWireResponse_and_VaultDepositHoldResponse".
 */
export type JSONRPCResponseFor_PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse =
  JSONRPCResponseFor_PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse1 =
  | {
      result: PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PrivateGetSubaccountsRPCResponse".
 */
export type JSONRPCResponseFor_PrivateGetSubaccountsRPCResponse =
  JSONRPCResponseFor_PrivateGetSubaccountsRPCResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PrivateGetSubaccountsRPCResponse1 =
  | {
      result: PrivateGetSubaccountsRPCResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PaginatedTradesResult".
 */
export type JSONRPCResponseFor_PaginatedTradesResult = JSONRPCResponseFor_PaginatedTradesResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_PaginatedTradesResult1 =
  | {
      result: PaginatedTradesResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_AggregatedTriggerOrdersResult".
 */
export type JSONRPCResponseFor_AggregatedTriggerOrdersResult = JSONRPCResponseFor_AggregatedTriggerOrdersResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_AggregatedTriggerOrdersResult1 =
  | {
      result: AggregatedTriggerOrdersResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PaginatedVaultRequestHistory".
 */
export type JSONRPCResponseFor_PaginatedVaultRequestHistory = JSONRPCResponseFor_PaginatedVaultRequestHistory1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_PaginatedVaultRequestHistory1 =
  | {
      result: PaginatedVaultRequestHistory;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_VaultSharesWireResponse".
 */
export type JSONRPCResponseFor_VaultSharesWireResponse = JSONRPCResponseFor_VaultSharesWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_VaultSharesWireResponse1 =
  | {
      result: VaultSharesWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_WithdrawalHistoryResult".
 */
export type JSONRPCResponseFor_WithdrawalHistoryResult = JSONRPCResponseFor_WithdrawalHistoryResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_WithdrawalHistoryResult1 =
  | {
      result: WithdrawalHistoryResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_OrderCreatedWireResponse".
 */
export type JSONRPCResponseFor_OrderCreatedWireResponse = JSONRPCResponseFor_OrderCreatedWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_OrderCreatedWireResponse1 =
  | {
      result: OrderCreatedWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_SignedActionDebugEdgeRpcResponse_for_OrderActionDataEdgeRpcResponse".
 */
export type JSONRPCResponseFor_SignedActionDebugEdgeRpcResponseFor_OrderActionDataEdgeRpcResponse =
  JSONRPCResponseFor_SignedActionDebugEdgeRpcResponseFor_OrderActionDataEdgeRpcResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_SignedActionDebugEdgeRpcResponseFor_OrderActionDataEdgeRpcResponse1 =
  | {
      result: SignedActionDebugEdgeRpcResponseFor_OrderActionDataEdgeRpcResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_OrderQuoteEdgeRpcResponse".
 */
export type JSONRPCResponseFor_OrderQuoteEdgeRpcResponse = JSONRPCResponseFor_OrderQuoteEdgeRpcResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_OrderQuoteEdgeRpcResponse1 =
  | {
      result: OrderQuoteEdgeRpcResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_QuotePollWireResponse".
 */
export type JSONRPCResponseFor_QuotePollWireResponse = JSONRPCResponseFor_QuotePollWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_QuotePollWireResponse1 =
  | {
      result: QuotePollWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_RFQPollWireResponse".
 */
export type JSONRPCResponseFor_RFQPollWireResponse = JSONRPCResponseFor_RFQPollWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_RFQPollWireResponse1 =
  | {
      result: RFQPollWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_VaultRequestAckWireResponse".
 */
export type JSONRPCResponseFor_VaultRequestAckWireResponse = JSONRPCResponseFor_VaultRequestAckWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_VaultRequestAckWireResponse1 =
  | {
      result: VaultRequestAckWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_ReplaceOrderWireResponse".
 */
export type JSONRPCResponseFor_ReplaceOrderWireResponse = JSONRPCResponseFor_ReplaceOrderWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ReplaceOrderWireResponse1 =
  | {
      result: ReplaceOrderWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_QuoteReplaceWireResponse".
 */
export type JSONRPCResponseFor_QuoteReplaceWireResponse = JSONRPCResponseFor_QuoteReplaceWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_QuoteReplaceWireResponse1 =
  | {
      result: QuoteReplaceWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_ResetMmpResponse".
 */
export type JSONRPCResponseFor_ResetMmpResponse = JSONRPCResponseFor_ResetMmpResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ResetMmpResponse1 =
  | {
      result: ResetMmpResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ResetMmpResponse".
 */
export type ResetMmpResponse = 'ok';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_RfqGetBestQuoteWireResponse".
 */
export type JSONRPCResponseFor_RfqGetBestQuoteWireResponse = JSONRPCResponseFor_RfqGetBestQuoteWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_RfqGetBestQuoteWireResponse1 =
  | {
      result: RfqGetBestQuoteWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_RFQPrivateWireResponse".
 */
export type JSONRPCResponseFor_RFQPrivateWireResponse = JSONRPCResponseFor_RFQPrivateWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_RFQPrivateWireResponse1 =
  | {
      result: RFQPrivateWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PrivateSessionKeysRPCResponse".
 */
export type JSONRPCResponseFor_PrivateSessionKeysRPCResponse = JSONRPCResponseFor_PrivateSessionKeysRPCResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_PrivateSessionKeysRPCResponse1 =
  | {
      result: PrivateSessionKeysRPCResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_SetCancelOnDisconnectResponse".
 */
export type JSONRPCResponseFor_SetCancelOnDisconnectResponse = JSONRPCResponseFor_SetCancelOnDisconnectResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_SetCancelOnDisconnectResponse1 =
  | {
      result: SetCancelOnDisconnectResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SetCancelOnDisconnectResponse".
 */
export type SetCancelOnDisconnectResponse = 'ok';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_SetMmpConfigResponse".
 */
export type JSONRPCResponseFor_SetMmpConfigResponse = JSONRPCResponseFor_SetMmpConfigResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_SetMmpConfigResponse1 =
  | {
      result: SetMmpConfigResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_TransferPositionsWireResponse".
 */
export type JSONRPCResponseFor_TransferPositionsWireResponse = JSONRPCResponseFor_TransferPositionsWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_TransferPositionsWireResponse1 =
  | {
      result: TransferPositionsWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PrivateTransferSpotEdgeRpcResponse".
 */
export type JSONRPCResponseFor_PrivateTransferSpotEdgeRpcResponse =
  JSONRPCResponseFor_PrivateTransferSpotEdgeRpcResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PrivateTransferSpotEdgeRpcResponse1 =
  | {
      result: PrivateTransferSpotEdgeRpcResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PrivateTransferSpotExternalEdgeRpcResponse".
 */
export type JSONRPCResponseFor_PrivateTransferSpotExternalEdgeRpcResponse =
  JSONRPCResponseFor_PrivateTransferSpotExternalEdgeRpcResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PrivateTransferSpotExternalEdgeRpcResponse1 =
  | {
      result: PrivateTransferSpotExternalEdgeRpcResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_OffchainAckWireResponse".
 */
export type JSONRPCResponseFor_OffchainAckWireResponse = JSONRPCResponseFor_OffchainAckWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_OffchainAckWireResponse1 =
  | {
      result: OffchainAckWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_UpdateWhitelistedRecipientsEdgeRpcResponse".
 */
export type JSONRPCResponseFor_UpdateWhitelistedRecipientsEdgeRpcResponse =
  JSONRPCResponseFor_UpdateWhitelistedRecipientsEdgeRpcResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_UpdateWhitelistedRecipientsEdgeRpcResponse1 =
  | {
      result: UpdateWhitelistedRecipientsEdgeRpcResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PrivateWithdrawEdgeRpcResponse".
 */
export type JSONRPCResponseFor_PrivateWithdrawEdgeRpcResponse = JSONRPCResponseFor_PrivateWithdrawEdgeRpcResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_PrivateWithdrawEdgeRpcResponse1 =
  | {
      result: PrivateWithdrawEdgeRpcResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_QuoteExecuteDebugResult".
 */
export type JSONRPCResponseFor_QuoteExecuteDebugResult = JSONRPCResponseFor_QuoteExecuteDebugResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_QuoteExecuteDebugResult1 =
  | {
      result: QuoteExecuteDebugResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "NoParams".
 */
export type NoParams = null;
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_Array_of_CurrencyResponse".
 */
export type JSONRPCResponseFor_ArrayOf_CurrencyResponse = JSONRPCResponseFor_ArrayOf_CurrencyResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ArrayOf_CurrencyResponse1 =
  | {
      result: CurrencyResponse[];
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MarketType".
 */
export type MarketType = 'ALL' | 'SRM_BASE_ONLY' | 'SRM_OPTION_ONLY' | 'SRM_PERP_ONLY' | 'CASH';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_GetAllInstrumentsResponse".
 */
export type JSONRPCResponseFor_GetAllInstrumentsResponse = JSONRPCResponseFor_GetAllInstrumentsResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_GetAllInstrumentsResponse1 =
  | {
      result: GetAllInstrumentsResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_Array_of_String".
 */
export type JSONRPCResponseFor_ArrayOf_String = JSONRPCResponseFor_ArrayOf_String1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ArrayOf_String1 =
  | {
      result: string[];
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_Array_of_Referrer".
 */
export type JSONRPCResponseFor_ArrayOf_Referrer = JSONRPCResponseFor_ArrayOf_Referrer1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ArrayOf_Referrer1 =
  | {
      result: Referrer[];
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_Array_of_AssetResponsePublic".
 */
export type JSONRPCResponseFor_ArrayOf_AssetResponsePublic = JSONRPCResponseFor_ArrayOf_AssetResponsePublic1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ArrayOf_AssetResponsePublic1 =
  | {
      result: AssetResponsePublic[];
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_CurrencyResponse".
 */
export type JSONRPCResponseFor_CurrencyResponse = JSONRPCResponseFor_CurrencyResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_CurrencyResponse1 =
  | {
      result: CurrencyResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_FundingRateHistoryResult".
 */
export type JSONRPCResponseFor_FundingRateHistoryResult = JSONRPCResponseFor_FundingRateHistoryResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_FundingRateHistoryResult1 =
  | {
      result: FundingRateHistoryResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_Array_of_IndexCandle".
 */
export type JSONRPCResponseFor_ArrayOf_IndexCandle = JSONRPCResponseFor_ArrayOf_IndexCandle1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ArrayOf_IndexCandle1 =
  | {
      result: IndexCandle[];
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_InstrumentPublicResponse".
 */
export type JSONRPCResponseFor_InstrumentPublicResponse = JSONRPCResponseFor_InstrumentPublicResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_InstrumentPublicResponse1 =
  | {
      result: InstrumentPublicResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_InterestRateHistoryResult".
 */
export type JSONRPCResponseFor_InterestRateHistoryResult = JSONRPCResponseFor_InterestRateHistoryResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_InterestRateHistoryResult1 =
  | {
      result: InterestRateHistoryResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_GetLatestSignedFeedsResponse".
 */
export type JSONRPCResponseFor_GetLatestSignedFeedsResponse = JSONRPCResponseFor_GetLatestSignedFeedsResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_GetLatestSignedFeedsResponse1 =
  | {
      result: GetLatestSignedFeedsResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_GetOnchainActionHistoryResponse".
 */
export type JSONRPCResponseFor_GetOnchainActionHistoryResponse = JSONRPCResponseFor_GetOnchainActionHistoryResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_GetOnchainActionHistoryResponse1 =
  | {
      result: GetOnchainActionHistoryResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_OptionSettlementPricesResult".
 */
export type JSONRPCResponseFor_OptionSettlementPricesResult = JSONRPCResponseFor_OptionSettlementPricesResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_OptionSettlementPricesResult1 =
  | {
      result: OptionSettlementPricesResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_GetPendingDepositsResult".
 */
export type JSONRPCResponseFor_GetPendingDepositsResult = JSONRPCResponseFor_GetPendingDepositsResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_GetPendingDepositsResult1 =
  | {
      result: GetPendingDepositsResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_GetReferralPerformanceResult".
 */
export type JSONRPCResponseFor_GetReferralPerformanceResult = JSONRPCResponseFor_GetReferralPerformanceResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_GetReferralPerformanceResult1 =
  | {
      result: GetReferralPerformanceResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_Array_of_RiskUniverseResponse".
 */
export type JSONRPCResponseFor_ArrayOf_RiskUniverseResponse = JSONRPCResponseFor_ArrayOf_RiskUniverseResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ArrayOf_RiskUniverseResponse1 =
  | {
      result: RiskUniverseResponse[];
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MarginType".
 */
export type MarginType = 'SM' | 'PM2';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_TickerSlimSnapshot".
 */
export type JSONRPCResponseFor_TickerSlimSnapshot = JSONRPCResponseFor_TickerSlimSnapshot1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_TickerSlimSnapshot1 =
  | {
      result: TickerSlimSnapshot;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_GetTickersResponse".
 */
export type JSONRPCResponseFor_GetTickersResponse = JSONRPCResponseFor_GetTickersResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_GetTickersResponse1 =
  | {
      result: GetTickersResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_int64".
 */
export type JSONRPCResponseForInt64 = JSONRPCResponseForInt641 & {
  id: JsonRpcId;
};
export type JSONRPCResponseForInt641 =
  | {
      result: number;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PublicTradesResult".
 */
export type JSONRPCResponseFor_PublicTradesResult = JSONRPCResponseFor_PublicTradesResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_PublicTradesResult1 =
  | {
      result: PublicTradesResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_Array_of_TradingviewCandle".
 */
export type JSONRPCResponseFor_ArrayOf_TradingviewCandle = JSONRPCResponseFor_ArrayOf_TradingviewCandle1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ArrayOf_TradingviewCandle1 =
  | {
      result: TradingviewCandle[];
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_GetTransactionResult".
 */
export type JSONRPCResponseFor_GetTransactionResult = JSONRPCResponseFor_GetTransactionResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_GetTransactionResult1 =
  | {
      result: GetTransactionResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_VaultWireResponse".
 */
export type JSONRPCResponseFor_VaultWireResponse = JSONRPCResponseFor_VaultWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_VaultWireResponse1 =
  | {
      result: VaultWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PaginatedVaultActionHistory".
 */
export type JSONRPCResponseFor_PaginatedVaultActionHistory = JSONRPCResponseFor_PaginatedVaultActionHistory1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_PaginatedVaultActionHistory1 =
  | {
      result: PaginatedVaultActionHistory;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PerformanceResolution".
 */
export type PerformanceResolution = '1h' | '8h' | '24h' | '1wk';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_VaultPerformanceHistoryResult".
 */
export type JSONRPCResponseFor_VaultPerformanceHistoryResult = JSONRPCResponseFor_VaultPerformanceHistoryResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_VaultPerformanceHistoryResult1 =
  | {
      result: VaultPerformanceHistoryResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_VaultsWireResponse".
 */
export type JSONRPCResponseFor_VaultsWireResponse = JSONRPCResponseFor_VaultsWireResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_VaultsWireResponse1 =
  | {
      result: VaultsWireResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OffchainKeyScope".
 */
export type OffchainKeyScope = 'account_info' | 'delete_session_key';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_PublicGetWalletsFromSessionKeyRPCResponse".
 */
export type JSONRPCResponseFor_PublicGetWalletsFromSessionKeyRPCResponse =
  JSONRPCResponseFor_PublicGetWalletsFromSessionKeyRPCResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PublicGetWalletsFromSessionKeyRPCResponse1 =
  | {
      result: PublicGetWalletsFromSessionKeyRPCResponse;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_RateLimitResult".
 */
export type JSONRPCResponseFor_RateLimitResult = JSONRPCResponseFor_RateLimitResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_RateLimitResult1 =
  | {
      result: RateLimitResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_Array_of_uint64".
 */
export type JSONRPCResponseFor_ArrayOfUint64 = JSONRPCResponseFor_ArrayOfUint641 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_ArrayOfUint641 =
  | {
      result: number[];
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "DepositType".
 */
export type DepositType = 'standard' | 'instant' | 'direct';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_RegisterDepositAddressResult".
 */
export type JSONRPCResponseFor_RegisterDepositAddressResult = JSONRPCResponseFor_RegisterDepositAddressResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_RegisterDepositAddressResult1 =
  | {
      result: RegisterDepositAddressResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_QuoteSendDebugResult".
 */
export type JSONRPCResponseFor_QuoteSendDebugResult = JSONRPCResponseFor_QuoteSendDebugResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_QuoteSendDebugResult1 =
  | {
      result: QuoteSendDebugResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_AnyValue".
 */
export type JSONRPCResponseFor_AnyValue = JSONRPCResponseFor_AnyValue1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_AnyValue1 =
  | {
      result: unknown;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_SubscribeResult".
 */
export type JSONRPCResponseFor_SubscribeResult = JSONRPCResponseFor_SubscribeResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_SubscribeResult1 =
  | {
      result: SubscribeResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JSONRPCResponse_for_UnsubscribeResult".
 */
export type JSONRPCResponseFor_UnsubscribeResult = JSONRPCResponseFor_UnsubscribeResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_UnsubscribeResult1 =
  | {
      result: UnsubscribeResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "BalanceUpdateType".
 */
export type BalanceUpdateType =
  | 'trade'
  | 'asset_deposit'
  | 'asset_withdrawal'
  | 'transfer'
  | 'subaccount_deposit'
  | 'subaccount_withdrawal'
  | 'liquidation'
  | 'liquidator'
  | 'onchain_drift_fix'
  | 'perp_settlement'
  | 'option_settlement'
  | 'interest_accrual'
  | 'onchain_revert'
  | 'double_revert';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AuctionStateType".
 */
export type AuctionStateType = 'ongoing' | 'ended';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "Direction2".
 */
export type Direction2 = 'buy' | 'sell';
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelReason".
 */
export type CancelReason =
  | ''
  | 'user_request'
  | 'mmp_trigger'
  | 'insufficient_margin'
  | 'signed_max_fee_too_low'
  | 'cancel_on_disconnect'
  | 'ioc_or_market_partial_fill'
  | 'session_key_deregistered'
  | 'subaccount_withdrawn'
  | 'compliance'
  | 'trigger_failed'
  | 'validation_failed'
  | 'algo_completed';

export interface DeriveApi {
  methods: EndpointMap;
  channels: ChannelSchemaMap;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "EndpointMap".
 */
export interface EndpointMap {
  'private/burn_vault_shares': {
    request: JsonRpcRequestFor_BurnSharesEdgeRpcParams;
    response: JSONRPCResponseFor_VaultSettleWireResponse;
  };
  'private/cancel': {
    request: JsonRpcRequestFor_CancelOrderEdgeRpcParams;
    response: JSONRPCResponseFor_OrderWireResponse;
  };
  'private/cancel_algo_order': {
    request: JsonRpcRequestFor_CancelAlgoOrderEdgeRpcParams;
    response: JSONRPCResponseFor_OrderWireResponse;
  };
  'private/cancel_all': {
    request: JsonRpcRequestFor_CancelAllEdgeRpcParams;
    response: JSONRPCResponseFor_CancelAllResponse;
  };
  'private/cancel_all_algo_orders': {
    request: JsonRpcRequestFor_CancelAllAlgoOrdersEdgeRpcParams;
    response: JSONRPCResponseFor_CancelAllAlgoOrdersResponse;
  };
  'private/cancel_all_trigger_orders': {
    request: JsonRpcRequestFor_CancelAllTriggerOrdersEdgeRpcParams;
    response: JSONRPCResponseFor_CancelAllTriggerOrdersResponse;
  };
  'private/cancel_all_vault_requests': {
    request: JsonRpcRequestFor_CancelVaultRequestEdgeRpcParams;
    response: JSONRPCResponseFor_VaultCancelWireResponse;
  };
  'private/cancel_batch_quotes': {
    request: JsonRpcRequestFor_CancelBatchQuotesEdgeRpcParams;
    response: JSONRPCResponseFor_CancelBatchResult;
  };
  'private/cancel_batch_rfqs': {
    request: JsonRpcRequestFor_CancelBatchRfqsEdgeRpcParams;
    response: JSONRPCResponseFor_CancelBatchRfqsWireResponse;
  };
  'private/cancel_by_instrument': {
    request: JsonRpcRequestFor_CancelByInstrumentEdgeRpcParams;
    response: JSONRPCResponseFor_CancelByInstrumentWireResponse;
  };
  'private/cancel_by_label': {
    request: JsonRpcRequestFor_CancelByLabelEdgeRpcParams;
    response: JSONRPCResponseFor_CancelByLabelWireResponse;
  };
  'private/cancel_by_nonce': {
    request: JsonRpcRequestFor_CancelByNonceEdgeRpcParams;
    response: JSONRPCResponseFor_CancelByNonceWireResponse;
  };
  'private/cancel_quote': {
    request: JsonRpcRequestFor_CancelQuoteEdgeRpcParams;
    response: JSONRPCResponseFor_QuotePrivateWireResponse;
  };
  'private/cancel_rfq': {
    request: JsonRpcRequestFor_CancelRfqEdgeRpcParams;
    response: JSONRPCResponseFor_CancelRfqResponse;
  };
  'private/cancel_trigger_order': {
    request: JsonRpcRequestFor_CancelTriggerOrderEdgeRpcParams;
    response: JSONRPCResponseFor_OrderWireResponse;
  };
  'private/change_subaccount_label': {
    request: JsonRpcRequestFor_ChangeSubaccountLabelEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateChangeSubaccountLabelRPCResponse;
  };
  'private/create_session_key': {
    request: JsonRpcRequestFor_CreateSessionKeyEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateCreateSessionKeyEdgeRPCResponse;
  };
  'private/create_vault': {
    request: JsonRpcRequestFor_CreateVaultEdgeRpcParams;
    response: JSONRPCResponseFor_VaultCreateWireResponse;
  };
  'private/edit_session_key': {
    request: JsonRpcRequestFor_EditSessionKeyEdgeRpcParams;
    response: JSONRPCResponseFor_SessionKeyResponse;
  };
  'private/execute_quote': {
    request: JsonRpcRequestFor_ExecuteQuoteEdgeRpcParams;
    response: JSONRPCResponseFor_QuoteExecuteWireResponse;
  };
  'private/force_burn': {
    request: JsonRpcRequestFor_ForceBurnEdgeRpcParams;
    response: JSONRPCResponseFor_VaultForceBurnWireResponse;
  };
  'private/get_account': {
    request: JsonRpcRequestFor_GetAccountEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateGetAccountEdgeRPCResponse;
  };
  'private/get_algo_orders': {
    request: JsonRpcRequestFor_GetAlgoOrdersEdgeRpcParams;
    response: JSONRPCResponseFor_ArrayOf_OrderWireResponse;
  };
  'private/get_all_portfolios': {
    request: JsonRpcRequestFor_GetAllPortfoliosEdgeRpcParams;
    response: JSONRPCResponseFor_ArrayOf_PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse;
  };
  'private/get_collaterals': {
    request: JsonRpcRequestFor_GetCollateralsEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateGetCollateralsRPCResponse;
  };
  'private/get_curated_vaults': {
    request: JsonRpcRequestFor_GetCuratedVaultsEdgeRpcParams;
    response: JSONRPCResponseFor_VaultIdsWireResponse;
  };
  'private/get_deposit_history': {
    request: JsonRpcRequestFor_GetDepositHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_DepositHistoryResult;
  };
  'private/get_erc20_transfer_history': {
    request: JsonRpcRequestFor_GetErc20TransferHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_TransferHistoryResult;
  };
  'private/get_funding_history': {
    request: JsonRpcRequestFor_GetFundingHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_PerpSettlementHistoryEdgeResponse;
  };
  'private/get_interest_history': {
    request: JsonRpcRequestFor_GetInterestHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_InterestHistoryResult;
  };
  'private/get_live_burn_requests': {
    request: JsonRpcRequestFor_GetLiveBurnRequestsEdgeRpcParams;
    response: JSONRPCResponseFor_MultipleVaultRequestsWireResponse;
  };
  'private/get_live_mint_requests': {
    request: JsonRpcRequestFor_GetLiveMintRequestsEdgeRpcParams;
    response: JSONRPCResponseFor_MultipleVaultRequestsWireResponse;
  };
  'private/get_live_vault_requests': {
    request: JsonRpcRequestFor_GetLiveVaultRequestsEdgeRpcParams;
    response: JSONRPCResponseFor_MultipleVaultRequestsWireResponse;
  };
  'private/get_mmp_config': {
    request: JsonRpcRequestFor_MmpScopeEdgeRpcParams;
    response: JSONRPCResponseFor_ArrayOf_MmpConfigResult;
  };
  'private/get_open_orders': {
    request: JsonRpcRequestFor_GetOpenOrdersEdgeRpcParams;
    response: JSONRPCResponseFor_AggregatedOrdersResult;
  };
  'private/get_option_settlement_history': {
    request: JsonRpcRequestFor_GetOptionSettlementHistoryParams;
    response: JSONRPCResponseFor_OptionSettlementHistoryResponse;
  };
  'private/get_order': {
    request: JsonRpcRequestFor_GetOrderEdgeRpcParams;
    response: JSONRPCResponseFor_OrderWireResponse;
  };
  'private/get_order_history': {
    request: JsonRpcRequestFor_GetOrderHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_PaginatedOrdersResult;
  };
  'private/get_positions': {
    request: JsonRpcRequestFor_GetPositionsEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateGetPositionsRPCResponse;
  };
  'private/get_quotes': {
    request: JsonRpcRequestFor_GetQuotesEdgeRpcParams;
    response: JSONRPCResponseFor_QuoteGetWireResponse;
  };
  'private/get_rfqs': {
    request: JsonRpcRequestFor_GetRfqsEdgeRpcParams;
    response: JSONRPCResponseFor_RFQGetWireResponse;
  };
  'private/get_shareholder_vaults': {
    request: JsonRpcRequestFor_GetShareholderVaultsEdgeRpcParams;
    response: JSONRPCResponseFor_VaultIdsWireResponse;
  };
  'private/get_subaccount': {
    request: JsonRpcRequestFor_GetSubaccountEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse;
  };
  'private/get_subaccounts': {
    request: JsonRpcRequestFor_GetSubaccountsEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateGetSubaccountsRPCResponse;
  };
  'private/get_trade_history': {
    request: JsonRpcRequestFor_GetTradeHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_PaginatedTradesResult;
  };
  'private/get_trigger_orders': {
    request: JsonRpcRequestFor_GetTriggerOrdersEdgeRpcParams;
    response: JSONRPCResponseFor_AggregatedTriggerOrdersResult;
  };
  'private/get_vault_request_history': {
    request: JsonRpcRequestFor_GetVaultRequestHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_PaginatedVaultRequestHistory;
  };
  'private/get_vault_shares': {
    request: JsonRpcRequestFor_GetVaultSharesEdgeRpcParams;
    response: JSONRPCResponseFor_VaultSharesWireResponse;
  };
  'private/get_withdrawal_history': {
    request: JsonRpcRequestFor_GetWithdrawalHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_WithdrawalHistoryResult;
  };
  'private/mint_vault_shares': {
    request: JsonRpcRequestFor_MintSharesEdgeRpcParams;
    response: JSONRPCResponseFor_VaultSettleWireResponse;
  };
  'private/order': {
    request: JsonRpcRequestFor_CreateOrderEdgeRpcParams;
    response: JSONRPCResponseFor_OrderCreatedWireResponse;
  };
  'private/order_debug': {
    request: JsonRpcRequestFor_CreateOrderEdgeRpcParams;
    response: JSONRPCResponseFor_SignedActionDebugEdgeRpcResponseFor_OrderActionDataEdgeRpcResponse;
  };
  'private/order_quote': {
    request: JsonRpcRequestFor_OrderQuoteEdgeRpcParams;
    response: JSONRPCResponseFor_OrderQuoteEdgeRpcResponse;
  };
  'private/poll_quotes': {
    request: JsonRpcRequestFor_PollQuotesEdgeRpcParams;
    response: JSONRPCResponseFor_QuotePollWireResponse;
  };
  'private/poll_rfqs': {
    request: JsonRpcRequestFor_PollRfqsEdgeRpcParams;
    response: JSONRPCResponseFor_RFQPollWireResponse;
  };
  'private/reject_deposit_request': {
    request: JsonRpcRequestFor_RejectDepositRequestEdgeRpcParams;
    response: JSONRPCResponseFor_VaultRequestAckWireResponse;
  };
  'private/replace': {
    request: JsonRpcRequestFor_ReplaceOrderEdgeRpcParams;
    response: JSONRPCResponseFor_ReplaceOrderWireResponse;
  };
  'private/replace_quote': {
    request: JsonRpcRequestFor_ReplaceQuoteEdgeRpcParams;
    response: JSONRPCResponseFor_QuoteReplaceWireResponse;
  };
  'private/request_vault_deposit': {
    request: JsonRpcRequestFor_RequestVaultDepositEdgeRpcParams;
    response: JSONRPCResponseFor_VaultRequestAckWireResponse;
  };
  'private/request_vault_withdraw': {
    request: JsonRpcRequestFor_RequestVaultWithdrawEdgeRpcParams;
    response: JSONRPCResponseFor_VaultRequestAckWireResponse;
  };
  'private/reset_mmp': {
    request: JsonRpcRequestFor_MmpScopeEdgeRpcParams;
    response: JSONRPCResponseFor_ResetMmpResponse;
  };
  'private/rfq_get_best_quote': {
    request: JsonRpcRequestFor_RfqGetBestQuoteEdgeRpcParams;
    response: JSONRPCResponseFor_RfqGetBestQuoteWireResponse;
  };
  'private/send_quote': {
    request: JsonRpcRequestFor_SendQuoteEdgeRpcParams;
    response: JSONRPCResponseFor_QuotePrivateWireResponse;
  };
  'private/send_rfq': {
    request: JsonRpcRequestFor_SendRfqEdgeRpcParams;
    response: JSONRPCResponseFor_RFQPrivateWireResponse;
  };
  'private/session_keys': {
    request: JsonRpcRequestFor_SessionKeysEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateSessionKeysRPCResponse;
  };
  'private/set_cancel_on_disconnect': {
    request: JsonRpcRequestFor_SetCancelOnDisconnectEdgeRpcParams;
    response: JSONRPCResponseFor_SetCancelOnDisconnectResponse;
  };
  'private/set_mmp_config': {
    request: JsonRpcRequestFor_SetMmpConfigEdgeRpcParams;
    response: JSONRPCResponseFor_SetMmpConfigResponse;
  };
  'private/transfer_positions': {
    request: JsonRpcRequestFor_TransferPositionsEdgeRpcParams;
    response: JSONRPCResponseFor_TransferPositionsWireResponse;
  };
  'private/transfer_spot': {
    request: JsonRpcRequestFor_PrivateTransferSpotEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateTransferSpotEdgeRpcResponse;
  };
  'private/transfer_spot_external': {
    request: JsonRpcRequestFor_PrivateTransferSpotExternalEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateTransferSpotExternalEdgeRpcResponse;
  };
  'private/update_vault_info': {
    request: JsonRpcRequestFor_UpdateVaultInfoEdgeRpcParams;
    response: JSONRPCResponseFor_OffchainAckWireResponse;
  };
  'private/update_whitelisted_recipients': {
    request: JsonRpcRequestFor_UpdateWhitelistedRecipientsEdgeRpcParams;
    response: JSONRPCResponseFor_UpdateWhitelistedRecipientsEdgeRpcResponse;
  };
  'private/withdraw': {
    request: JsonRpcRequestFor_PrivateWithdrawEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateWithdrawEdgeRpcResponse;
  };
  'public/execute_quote_debug': {
    request: JsonRpcRequestFor_PublicExecuteQuoteDebugEdgeRpcParams;
    response: JSONRPCResponseFor_QuoteExecuteDebugResult;
  };
  'public/get_all_currencies': {
    request: JsonRpcRequestFor_NoParams;
    response: JSONRPCResponseFor_ArrayOf_CurrencyResponse;
  };
  'public/get_all_instruments': {
    request: JsonRpcRequestFor_GetAllInstrumentsEdgeRpcParams;
    response: JSONRPCResponseFor_GetAllInstrumentsResponse;
  };
  'public/get_all_live_instruments': {
    request: JsonRpcRequestFor_NoParams;
    response: JSONRPCResponseFor_ArrayOf_String;
  };
  'public/get_all_referral_codes': {
    request: JsonRpcRequestFor_GetAllReferralCodesParams;
    response: JSONRPCResponseFor_ArrayOf_Referrer;
  };
  'public/get_assets': {
    request: JsonRpcRequestFor_GetAssetsEdgeRpcParams;
    response: JSONRPCResponseFor_ArrayOf_AssetResponsePublic;
  };
  'public/get_currency': {
    request: JsonRpcRequestFor_GetCurrencyEdgeRpcParams;
    response: JSONRPCResponseFor_CurrencyResponse;
  };
  'public/get_funding_rate_history': {
    request: JsonRpcRequestFor_GetFundingRateHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_FundingRateHistoryResult;
  };
  'public/get_index_chart_data': {
    request: JsonRpcRequestFor_GetIndexChartDataEdgeRpcParams;
    response: JSONRPCResponseFor_ArrayOf_IndexCandle;
  };
  'public/get_instrument': {
    request: JsonRpcRequestFor_GetInstrumentEdgeRpcParams;
    response: JSONRPCResponseFor_InstrumentPublicResponse;
  };
  'public/get_interest_rate_history': {
    request: JsonRpcRequestFor_GetInterestRateHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_InterestRateHistoryResult;
  };
  'public/get_latest_signed_feeds': {
    request: JsonRpcRequestFor_GetLatestSignedFeedsEdgeRpcParams;
    response: JSONRPCResponseFor_GetLatestSignedFeedsResponse;
  };
  'public/get_onchain_action_history': {
    request: JsonRpcRequestFor_GetOnchainActionHistoryParams;
    response: JSONRPCResponseFor_GetOnchainActionHistoryResponse;
  };
  'public/get_option_settlement_prices': {
    request: JsonRpcRequestFor_GetOptionSettlementPricesEdgeRpcParams;
    response: JSONRPCResponseFor_OptionSettlementPricesResult;
  };
  'public/get_pending_deposits': {
    request: JsonRpcRequestFor_GetPendingDepositsParams;
    response: JSONRPCResponseFor_GetPendingDepositsResult;
  };
  'public/get_referral_performance': {
    request: JsonRpcRequestFor_GetReferralPerformanceParams;
    response: JSONRPCResponseFor_GetReferralPerformanceResult;
  };
  'public/get_risk_universes': {
    request: JsonRpcRequestFor_NoParams;
    response: JSONRPCResponseFor_ArrayOf_RiskUniverseResponse;
  };
  'public/get_ticker': {
    request: JsonRpcRequestFor_GetTickerEdgeRpcParams;
    response: JSONRPCResponseFor_TickerSlimSnapshot;
  };
  'public/get_tickers': {
    request: JsonRpcRequestFor_GetTickersEdgeRpcParams;
    response: JSONRPCResponseFor_GetTickersResponse;
  };
  'public/get_time': {
    request: JsonRpcRequestFor_NoParams;
    response: JSONRPCResponseForInt64;
  };
  'public/get_trade_history': {
    request: JsonRpcRequestFor_GetPublicTradeHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_PublicTradesResult;
  };
  'public/get_tradingview_chart_data': {
    request: JsonRpcRequestFor_GetTradingviewChartDataEdgeRpcParams;
    response: JSONRPCResponseFor_ArrayOf_TradingviewCandle;
  };
  'public/get_transaction': {
    request: JsonRpcRequestFor_GetTransactionParams;
    response: JSONRPCResponseFor_GetTransactionResult;
  };
  'public/get_vault': {
    request: JsonRpcRequestFor_GetVaultEdgeRpcParams;
    response: JSONRPCResponseFor_VaultWireResponse;
  };
  'public/get_vault_action_history': {
    request: JsonRpcRequestFor_GetVaultActionHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_PaginatedVaultActionHistory;
  };
  'public/get_vault_performance_history': {
    request: JsonRpcRequestFor_GetVaultPerformanceHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_VaultPerformanceHistoryResult;
  };
  'public/get_vaults': {
    request: JsonRpcRequestFor_GetVaultsEdgeRpcParams;
    response: JSONRPCResponseFor_VaultsWireResponse;
  };
  'public/get_wallets_from_session_key': {
    request: JsonRpcRequestFor_GetWalletsFromSessionKeyEdgeRpcParams;
    response: JSONRPCResponseFor_PublicGetWalletsFromSessionKeyRPCResponse;
  };
  'public/getRateLimits': {
    request: JsonRpcRequestFor_NoParams;
    response: JSONRPCResponseFor_RateLimitResult;
  };
  'public/login': {
    request: JsonRpcRequestFor_LoginEdgeRpcParams;
    response: JSONRPCResponseFor_ArrayOfUint64;
  };
  'public/order_quote': {
    request: JsonRpcRequestFor_OrderQuoteEdgeRpcParams;
    response: JSONRPCResponseFor_OrderQuoteEdgeRpcResponse;
  };
  'public/register_deposit_address': {
    request: JsonRpcRequestFor_RegisterDepositAddressParams;
    response: JSONRPCResponseFor_RegisterDepositAddressResult;
  };
  'public/send_quote_debug': {
    request: JsonRpcRequestFor_PublicSendQuoteDebugEdgeRpcParams;
    response: JSONRPCResponseFor_QuoteSendDebugResult;
  };
  'public/withdraw_debug': {
    request: JsonRpcRequestFor_PublicWithdrawDebugEdgeRpcParams;
    response: JSONRPCResponseFor_AnyValue;
  };
  subscribe: {
    request: JsonRpcRequestFor_SubscribeParams;
    response: JSONRPCResponseFor_SubscribeResult;
  };
  unsubscribe: {
    request: JsonRpcRequestFor_UnsubscribeParams;
    response: JSONRPCResponseFor_UnsubscribeResult;
  };
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_BurnSharesEdgeRpcParams".
 */
export interface JsonRpcRequestFor_BurnSharesEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/burn_vault_shares';
  params: BurnSharesEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "BurnSharesEdgeRpcParams".
 */
export interface BurnSharesEdgeRpcParams {
  nonce: number;
  request_id: VaultRequestId;
  share_price: string;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
  withdraw_hash: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultRequestId".
 */
export interface VaultRequestId {
  vault_nonce: string;
  vault_subaccount_id: number;
  wallet: Address;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultSettleWireResponse".
 */
export interface VaultSettleWireResponse {
  op_uuid: string;
  operation_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RPCError".
 */
export interface RPCError {
  code: number;
  data?: string | null;
  message: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelOrderEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelOrderEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel';
  params: CancelOrderEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelOrderEdgeRpcParams".
 */
export interface CancelOrderEdgeRpcParams {
  instrument_name: string;
  order_id: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderWireResponse".
 */
export interface OrderWireResponse {
  algo_duration_sec?: number | null;
  algo_num_slices?: number | null;
  algo_slices_completed?: number | null;
  algo_type?: AlgoType | null;
  amount: string;
  average_price: string;
  cancel_reason?:
    | ''
    | 'user_request'
    | 'mmp_trigger'
    | 'insufficient_margin'
    | 'signed_max_fee_too_low'
    | 'cancel_on_disconnect'
    | 'ioc_or_market_partial_fill'
    | 'session_key_deregistered'
    | 'subaccount_withdrawn'
    | 'compliance'
    | 'trigger_failed'
    | 'validation_failed'
    | 'algo_completed';
  creation_timestamp: number;
  direction: Direction;
  extra_fee: string;
  filled_amount: string;
  instrument_name: string;
  is_transfer: boolean;
  label?: string;
  last_update_timestamp: number;
  limit_price: string;
  max_fee: string;
  mmp: boolean;
  nonce: string;
  order_fee: string;
  order_id: string;
  order_status: OrderStatus;
  order_type: OrderType;
  quote_id: string | null;
  replaced_order_id: string | null;
  signature: string;
  signature_expiry_sec: number;
  signed_limit_price: string | null;
  signer: string;
  subaccount_id: number;
  time_in_force: TimeInForce;
  trigger_price: string | null;
  trigger_price_type?: TriggerPriceType | null;
  trigger_reject_message?: string | null;
  trigger_type?: TriggerType | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelAlgoOrderEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelAlgoOrderEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_algo_order';
  params: CancelAlgoOrderEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelAlgoOrderEdgeRpcParams".
 */
export interface CancelAlgoOrderEdgeRpcParams {
  order_id: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelAllEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelAllEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_all';
  params: CancelAllEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelAllEdgeRpcParams".
 */
export interface CancelAllEdgeRpcParams {
  cancel_algo_orders?: boolean | null;
  cancel_trigger_orders?: boolean | null;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelAllAlgoOrdersEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelAllAlgoOrdersEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_all_algo_orders';
  params: CancelAllAlgoOrdersEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelAllAlgoOrdersEdgeRpcParams".
 */
export interface CancelAllAlgoOrdersEdgeRpcParams {
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelAllTriggerOrdersEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelAllTriggerOrdersEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_all_trigger_orders';
  params: CancelAllTriggerOrdersEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelAllTriggerOrdersEdgeRpcParams".
 */
export interface CancelAllTriggerOrdersEdgeRpcParams {
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelVaultRequestEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelVaultRequestEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_all_vault_requests';
  params: CancelVaultRequestEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelVaultRequestEdgeRpcParams".
 */
export interface CancelVaultRequestEdgeRpcParams {
  nonce: number;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
  vault_subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultCancelWireResponse".
 */
export interface VaultCancelWireResponse {
  cancelled_request_ids: VaultRequestId[];
  op_uuid: string;
  operation_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelBatchQuotesEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelBatchQuotesEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_batch_quotes';
  params: CancelBatchQuotesEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelBatchQuotesEdgeRpcParams".
 */
export interface CancelBatchQuotesEdgeRpcParams {
  label?: string | null;
  nonce?: number | null;
  quote_id?: string | null;
  rfq_id?: string | null;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelBatchResult".
 */
export interface CancelBatchResult {
  cancelled_ids: string[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelBatchRfqsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelBatchRfqsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_batch_rfqs';
  params: CancelBatchRfqsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelBatchRfqsEdgeRpcParams".
 */
export interface CancelBatchRfqsEdgeRpcParams {
  label?: string | null;
  nonce?: number | null;
  rfq_id?: string | null;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelBatchRfqsWireResponse".
 */
export interface CancelBatchRfqsWireResponse {
  cancelled_ids: string[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelByInstrumentEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelByInstrumentEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_by_instrument';
  params: CancelByInstrumentEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelByInstrumentEdgeRpcParams".
 */
export interface CancelByInstrumentEdgeRpcParams {
  instrument_name: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelByInstrumentWireResponse".
 */
export interface CancelByInstrumentWireResponse {
  cancelled_orders: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelByLabelEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelByLabelEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_by_label';
  params: CancelByLabelEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelByLabelEdgeRpcParams".
 */
export interface CancelByLabelEdgeRpcParams {
  instrument_name?: string | null;
  label: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelByLabelWireResponse".
 */
export interface CancelByLabelWireResponse {
  cancelled_orders: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelByNonceEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelByNonceEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_by_nonce';
  params: CancelByNonceEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelByNonceEdgeRpcParams".
 */
export interface CancelByNonceEdgeRpcParams {
  instrument_name: string;
  nonce: number;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelByNonceWireResponse".
 */
export interface CancelByNonceWireResponse {
  cancelled_orders: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelQuoteEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelQuoteEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_quote';
  params: CancelQuoteEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelQuoteEdgeRpcParams".
 */
export interface CancelQuoteEdgeRpcParams {
  label?: string | null;
  nonce?: number | null;
  quote_id: string;
  rfq_id?: string | null;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuotePrivateWireResponse".
 */
export interface QuotePrivateWireResponse {
  batch_status?: BatchStatus | null;
  cancel_reason: RFQCancelReason;
  creation_timestamp: number;
  direction: Direction;
  extra_fee: string;
  fee: string;
  fill_pct: string;
  is_transfer: boolean;
  label: string;
  last_update_timestamp: number;
  legs: PricedLegParamsAndResponse[];
  legs_hash: string;
  liquidity_role: LiquidityRole;
  max_fee: string;
  mmp: boolean;
  nonce: string;
  quote_id: string;
  rfq_id: string;
  signature_expiry_sec: number;
  status: RFQStatus;
  subaccount_id: number;
  tx_hash?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PricedLegParamsAndResponse".
 */
export interface PricedLegParamsAndResponse {
  amount: string;
  direction: Direction;
  instrument_name: string;
  price: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelRfqEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelRfqEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_rfq';
  params: CancelRfqEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelRfqEdgeRpcParams".
 */
export interface CancelRfqEdgeRpcParams {
  rfq_id: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CancelTriggerOrderEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CancelTriggerOrderEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/cancel_trigger_order';
  params: CancelTriggerOrderEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CancelTriggerOrderEdgeRpcParams".
 */
export interface CancelTriggerOrderEdgeRpcParams {
  order_id: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_ChangeSubaccountLabelEdgeRpcParams".
 */
export interface JsonRpcRequestFor_ChangeSubaccountLabelEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/change_subaccount_label';
  params: ChangeSubaccountLabelEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ChangeSubaccountLabelEdgeRpcParams".
 */
export interface ChangeSubaccountLabelEdgeRpcParams {
  label: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateChangeSubaccountLabelRPCResponse".
 */
export interface PrivateChangeSubaccountLabelRPCResponse {
  label: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CreateSessionKeyEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CreateSessionKeyEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/create_session_key';
  params: CreateSessionKeyEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CreateSessionKeyEdgeRpcParams".
 */
export interface CreateSessionKeyEdgeRpcParams {
  expiry_sec: number;
  ip_whitelist?: string[] | null;
  label?: string | null;
  nonce: string;
  offchain_scopes: string[];
  protocol_scopes: string[];
  public_session_key: string;
  signature: string;
  signature_expiry_sec: number;
  signer: string;
  subaccount_ids?: number[] | null;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateCreateSessionKeyEdgeRPCResponse".
 */
export interface PrivateCreateSessionKeyEdgeRPCResponse {
  expiry_sec: number;
  ip_whitelist: string[];
  label?: string | null;
  offchain_scopes: string[];
  protocol_scopes: string[];
  public_session_key: string;
  subaccount_ids: number[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CreateVaultEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CreateVaultEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/create_vault';
  params: CreateVaultEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CreateVaultEdgeRpcParams".
 */
export interface CreateVaultEdgeRpcParams {
  benchmark_asset?: Address | null;
  cooldown_sec: number;
  deposit_spot_asset: Address;
  initial_deposit: string;
  initial_share_price_usd: string;
  management_fee_bps: number;
  manager_id: number;
  max_fee_usd: string;
  max_slippage_bps: number;
  nonce: number;
  performance_fee_bps: number;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultCreateWireResponse".
 */
export interface VaultCreateWireResponse {
  op_uuid: string;
  operation_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_EditSessionKeyEdgeRpcParams".
 */
export interface JsonRpcRequestFor_EditSessionKeyEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/edit_session_key';
  params: EditSessionKeyEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "EditSessionKeyEdgeRpcParams".
 */
export interface EditSessionKeyEdgeRpcParams {
  ip_whitelist?: string[] | null;
  label?: string | null;
  offchain_scopes?: string[] | null;
  public_session_key: string;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SessionKeyResponse".
 */
export interface SessionKeyResponse {
  expiry_sec: number;
  ip_whitelist: string[];
  label: string;
  offchain_scopes: string[];
  protocol_scopes: string[];
  public_session_key: string;
  registered_sec: number;
  subaccount_ids: number[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_ExecuteQuoteEdgeRpcParams".
 */
export interface JsonRpcRequestFor_ExecuteQuoteEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/execute_quote';
  params: ExecuteQuoteEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ExecuteQuoteEdgeRpcParams".
 */
export interface ExecuteQuoteEdgeRpcParams {
  client?: string;
  direction: Direction;
  enable_taker_protection?: boolean;
  label?: string;
  legs: PricedLegParamsAndResponse[];
  max_fee: string;
  nonce: number;
  quote_id: string;
  referral_code?: string;
  rfq_id: string;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteExecuteWireResponse".
 */
export interface QuoteExecuteWireResponse {
  cancel_reason: RFQCancelReason;
  creation_timestamp: number;
  direction: Direction;
  extra_fee: string;
  fee: string;
  fill_pct: string;
  is_transfer: boolean;
  label: string;
  last_update_timestamp: number;
  legs: PricedLegParamsAndResponse[];
  legs_hash: string;
  liquidity_role: LiquidityRole;
  max_fee: string;
  mmp: boolean;
  nonce: string;
  quote_id: string;
  rfq_filled_pct: string;
  rfq_id: string;
  signature_expiry_sec: number;
  status: RFQStatus;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_ForceBurnEdgeRpcParams".
 */
export interface JsonRpcRequestFor_ForceBurnEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/force_burn';
  params: ForceBurnEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ForceBurnEdgeRpcParams".
 */
export interface ForceBurnEdgeRpcParams {
  holder: Address;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultForceBurnWireResponse".
 */
export interface VaultForceBurnWireResponse {
  op_uuid: string;
  operation_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetAccountEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetAccountEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_account';
  params: GetAccountEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetAccountEdgeRpcParams".
 */
export interface GetAccountEdgeRpcParams {
  wallet: Address;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateGetAccountEdgeRPCResponse".
 */
export interface PrivateGetAccountEdgeRPCResponse {
  cancel_on_disconnect: boolean;
  creation_timestamp_sec?: number | null;
  fee_info: AccountFeeInfo;
  is_rfq_maker: boolean;
  per_endpoint_tps: {
    [k: string]: number;
  };
  referral_code?: string | null;
  subaccount_ids: number[];
  wallet: string;
  websocket_matching_tps: number;
  websocket_non_matching_tps: number;
  websocket_option_tps: number;
  websocket_perp_tps: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AccountFeeInfo".
 */
export interface AccountFeeInfo {
  base_fee_discount: string;
  option_maker_fee?: string | null;
  option_taker_fee?: string | null;
  perp_maker_fee?: string | null;
  perp_taker_fee?: string | null;
  rfq_maker_discount: string;
  rfq_taker_discount: string;
  spot_maker_fee?: string | null;
  spot_taker_fee?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetAlgoOrdersEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetAlgoOrdersEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_algo_orders';
  params: GetAlgoOrdersEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetAlgoOrdersEdgeRpcParams".
 */
export interface GetAlgoOrdersEdgeRpcParams {
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetAllPortfoliosEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetAllPortfoliosEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_all_portfolios';
  params: GetAllPortfoliosEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetAllPortfoliosEdgeRpcParams".
 */
export interface GetAllPortfoliosEdgeRpcParams {
  wallet: Address;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateGetSubaccountRPCResponse_for_OrderWireResponse_and_VaultDepositHoldResponse".
 */
export interface PrivateGetSubaccountRPCResponseFor_OrderWireResponseAnd_VaultDepositHoldResponse {
  collaterals: CollateralResponse[];
  collaterals_initial_margin: string;
  collaterals_maintenance_margin: string;
  collaterals_value: string;
  currency: string[];
  failed_to_fetch: boolean;
  initial_margin: string;
  is_under_liquidation: boolean;
  label: string;
  maintenance_margin: string;
  manager_id: number;
  margin_type: string;
  open_orders: OrderWireResponse[];
  open_orders_margin: string;
  positions: PositionResponse[];
  positions_initial_margin: string;
  positions_maintenance_margin: string;
  positions_value: string;
  projected_margin_change: string;
  risk_universe_id: number;
  subaccount_id: number;
  subaccount_value: string;
  vault_deposit_holds: VaultDepositHoldResponse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CollateralResponse".
 */
export interface CollateralResponse {
  amount: string;
  amount_step: string;
  asset_name: string;
  asset_type: string;
  average_price: string;
  average_price_excl_fees: string;
  creation_timestamp: number;
  cumulative_interest: string;
  currency: string;
  delta: string;
  delta_currency: string;
  initial_margin: string;
  maintenance_margin: string;
  mark_price: string;
  mark_value: string;
  open_orders_margin: string;
  pending_interest: string;
  realized_pnl: string;
  realized_pnl_excl_fees: string;
  total_fees: string;
  unrealized_pnl: string;
  unrealized_pnl_excl_fees: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PositionResponse".
 */
export interface PositionResponse {
  amount: string;
  amount_step: string;
  average_price: string;
  average_price_excl_fees: string;
  creation_timestamp: number;
  cumulative_funding: string;
  delta: string;
  gamma: string;
  index_price: string;
  initial_margin: string;
  instrument_name: string;
  instrument_type: PublicAssetType;
  leverage?: string | null;
  liquidation_price?: string | null;
  maintenance_margin: string;
  mark_price: string;
  mark_value: string;
  net_settlements: string;
  open_orders_margin: string;
  pending_funding: string;
  realized_pnl: string;
  realized_pnl_excl_fees: string;
  theta: string;
  total_fees: string;
  unrealized_pnl: string;
  unrealized_pnl_excl_fees: string;
  vega: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultDepositHoldResponse".
 */
export interface VaultDepositHoldResponse {
  amount: string;
  asset_name: string;
  currency: string;
  vault_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetCollateralsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetCollateralsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_collaterals';
  params: GetCollateralsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetCollateralsEdgeRpcParams".
 */
export interface GetCollateralsEdgeRpcParams {
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateGetCollateralsRPCResponse".
 */
export interface PrivateGetCollateralsRPCResponse {
  collaterals: CollateralResponse[];
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetCuratedVaultsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetCuratedVaultsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_curated_vaults';
  params: GetCuratedVaultsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetCuratedVaultsEdgeRpcParams".
 */
export interface GetCuratedVaultsEdgeRpcParams {
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultIdsWireResponse".
 */
export interface VaultIdsWireResponse {
  subaccount_ids: number[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetDepositHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetDepositHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_deposit_history';
  params: GetDepositHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetDepositHistoryEdgeRpcParams".
 */
export interface GetDepositHistoryEdgeRpcParams {
  end_timestamp?: number | null;
  start_timestamp?: number | null;
  subaccount_id?: number | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "DepositHistoryResult".
 */
export interface DepositHistoryResult {
  deposits: DepositEntry[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "DepositEntry".
 */
export interface DepositEntry {
  action_id?: number | null;
  amount: string;
  asset: string;
  batch_status: BatchStatus;
  batch_uuid: string;
  fee: string;
  new_subaccount: boolean;
  operation_id: string;
  subaccount_id: number;
  timestamp: number;
  tx_hash?: string | null;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetErc20TransferHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetErc20TransferHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_erc20_transfer_history';
  params: GetErc20TransferHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetErc20TransferHistoryEdgeRpcParams".
 */
export interface GetErc20TransferHistoryEdgeRpcParams {
  end_timestamp?: number | null;
  start_timestamp?: number | null;
  subaccount_id?: number | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TransferHistoryResult".
 */
export interface TransferHistoryResult {
  transfers: TransferEntry[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TransferEntry".
 */
export interface TransferEntry {
  amount: string;
  asset: string;
  batch_status: BatchStatus;
  batch_uuid: string;
  fee: string;
  from_subaccount_id: number;
  from_wallet: string;
  is_outgoing: boolean;
  operation_id: string;
  timestamp: number;
  to_subaccount_id: number;
  to_wallet: string;
  tx_hash?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetFundingHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetFundingHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_funding_history';
  params: GetFundingHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetFundingHistoryEdgeRpcParams".
 */
export interface GetFundingHistoryEdgeRpcParams {
  end_timestamp?: number | null;
  instrument_name?: string | null;
  page?: number | null;
  page_size?: number | null;
  start_timestamp?: number | null;
  subaccount_id?: number | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PerpSettlementHistoryEdgeResponse".
 */
export interface PerpSettlementHistoryEdgeResponse {
  events: PerpSettlementEventEdgeResponse[];
  pagination: PaginationInfo;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PerpSettlementEventEdgeResponse".
 */
export interface PerpSettlementEventEdgeResponse {
  batch_status: BatchStatus;
  batch_uuid: string;
  funding: string;
  instrument_name: string;
  pnl: string;
  subaccount_id: number;
  timestamp: number;
  tx_hash?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PaginationInfo".
 */
export interface PaginationInfo {
  count: number;
  num_pages: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetInterestHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetInterestHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_interest_history';
  params: GetInterestHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetInterestHistoryEdgeRpcParams".
 */
export interface GetInterestHistoryEdgeRpcParams {
  end_timestamp?: number | null;
  start_timestamp?: number | null;
  subaccount_id?: number | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InterestHistoryResult".
 */
export interface InterestHistoryResult {
  events: InterestPayment[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InterestPayment".
 */
export interface InterestPayment {
  interest: string;
  subaccount_id: number;
  timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetLiveBurnRequestsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetLiveBurnRequestsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_live_burn_requests';
  params: GetLiveBurnRequestsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetLiveBurnRequestsEdgeRpcParams".
 */
export interface GetLiveBurnRequestsEdgeRpcParams {
  limit: number;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MultipleVaultRequestsWireResponse".
 */
export interface MultipleVaultRequestsWireResponse {
  requests: VaultRequestWireResponse[];
  total: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultRequestWireResponse".
 */
export interface VaultRequestWireResponse {
  creation_timestamp_ms: number;
  id: VaultRequestId;
  signed_action: SignedAction;
  subaccount_id: number;
  user_action_hash: string;
  wallet: Address;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SignedAction".
 */
export interface SignedAction {
  action: Action;
  signature: number[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "Action".
 */
export interface Action {
  data: number[];
  expiry: number;
  module: Address;
  nonce: number;
  owner: Address;
  signer: Address;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetLiveMintRequestsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetLiveMintRequestsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_live_mint_requests';
  params: GetLiveMintRequestsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetLiveMintRequestsEdgeRpcParams".
 */
export interface GetLiveMintRequestsEdgeRpcParams {
  limit: number;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetLiveVaultRequestsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetLiveVaultRequestsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_live_vault_requests';
  params: GetLiveVaultRequestsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetLiveVaultRequestsEdgeRpcParams".
 */
export interface GetLiveVaultRequestsEdgeRpcParams {
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_MmpScopeEdgeRpcParams".
 */
export interface JsonRpcRequestFor_MmpScopeEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/reset_mmp';
  params: MmpScopeEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MmpScopeEdgeRpcParams".
 */
export interface MmpScopeEdgeRpcParams {
  currency?: string | null;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MmpConfigResult".
 */
export interface MmpConfigResult {
  currency: string;
  is_frozen: boolean;
  mmp_amount_limit: string;
  mmp_delta_limit: string;
  mmp_frozen_time: number;
  mmp_interval: number;
  mmp_unfreeze_time: number;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetOpenOrdersEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetOpenOrdersEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_open_orders';
  params: GetOpenOrdersEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetOpenOrdersEdgeRpcParams".
 */
export interface GetOpenOrdersEdgeRpcParams {
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AggregatedOrdersResult".
 */
export interface AggregatedOrdersResult {
  orders: OrderWireResponse[];
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetOptionSettlementHistoryParams".
 */
export interface JsonRpcRequestFor_GetOptionSettlementHistoryParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_option_settlement_history';
  params: GetOptionSettlementHistoryParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetOptionSettlementHistoryParams".
 */
export interface GetOptionSettlementHistoryParams {
  subaccount_id?: number | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OptionSettlementHistoryResponse".
 */
export interface OptionSettlementHistoryResponse {
  settlements: OptionSettlementResponse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OptionSettlementResponse".
 */
export interface OptionSettlementResponse {
  amount: string;
  expiry: number;
  instrument_name: string;
  settlement_price: string;
  settlement_value: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetOrderEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetOrderEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_order';
  params: GetOrderEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetOrderEdgeRpcParams".
 */
export interface GetOrderEdgeRpcParams {
  order_id: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetOrderHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetOrderHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_order_history';
  params: GetOrderHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetOrderHistoryEdgeRpcParams".
 */
export interface GetOrderHistoryEdgeRpcParams {
  from_timestamp?: number | null;
  page?: number | null;
  page_size?: number | null;
  subaccount_id?: number | null;
  to_timestamp?: number | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PaginatedOrdersResult".
 */
export interface PaginatedOrdersResult {
  orders: OrderWireResponse[];
  pagination: PaginationInfo;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetPositionsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetPositionsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_positions';
  params: GetPositionsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetPositionsEdgeRpcParams".
 */
export interface GetPositionsEdgeRpcParams {
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateGetPositionsRPCResponse".
 */
export interface PrivateGetPositionsRPCResponse {
  positions: PositionResponse[];
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetQuotesEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetQuotesEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_quotes';
  params: GetQuotesEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetQuotesEdgeRpcParams".
 */
export interface GetQuotesEdgeRpcParams {
  from_timestamp?: number;
  page?: number;
  page_size?: number;
  quote_id?: string | null;
  rfq_id?: string | null;
  status?: string | null;
  subaccount_id: number;
  to_timestamp?: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteGetWireResponse".
 */
export interface QuoteGetWireResponse {
  pagination: PaginationInfo;
  quotes: QuotePrivateWireResponse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetRfqsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetRfqsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_rfqs';
  params: GetRfqsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetRfqsEdgeRpcParams".
 */
export interface GetRfqsEdgeRpcParams {
  from_timestamp?: number;
  page?: number;
  page_size?: number;
  rfq_id?: string | null;
  status?: string | null;
  subaccount_id: number;
  to_timestamp?: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RFQGetWireResponse".
 */
export interface RFQGetWireResponse {
  pagination: PaginationInfo;
  rfqs: RFQPrivateWireResponse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RFQPrivateWireResponse".
 */
export interface RFQPrivateWireResponse {
  ask_total_cost: string | null;
  bid_total_cost: string | null;
  cancel_reason: RFQCancelReason;
  counterparties?: Address[] | null;
  creation_timestamp: number;
  filled_direction?: Direction | null;
  filled_pct: string;
  label: string;
  last_update_timestamp: number;
  legs: LegUnpricedParams[];
  mark_total_cost: string | null;
  max_total_cost: string | null;
  min_total_cost: string | null;
  partial_fill_step: string;
  rfq_id: string;
  status: RFQStatus;
  subaccount_id: number;
  total_cost: string | null;
  valid_until: number;
  wallet: Address;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "LegUnpricedParams".
 */
export interface LegUnpricedParams {
  amount: string;
  direction: Direction;
  instrument_name: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetShareholderVaultsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetShareholderVaultsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_shareholder_vaults';
  params: GetShareholderVaultsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetShareholderVaultsEdgeRpcParams".
 */
export interface GetShareholderVaultsEdgeRpcParams {
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetSubaccountEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetSubaccountEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_subaccount';
  params: GetSubaccountEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetSubaccountEdgeRpcParams".
 */
export interface GetSubaccountEdgeRpcParams {
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetSubaccountsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetSubaccountsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_subaccounts';
  params: GetSubaccountsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetSubaccountsEdgeRpcParams".
 */
export interface GetSubaccountsEdgeRpcParams {
  wallet: Address;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateGetSubaccountsRPCResponse".
 */
export interface PrivateGetSubaccountsRPCResponse {
  subaccount_ids: number[];
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetTradeHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetTradeHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_trade_history';
  params: GetTradeHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetTradeHistoryEdgeRpcParams".
 */
export interface GetTradeHistoryEdgeRpcParams {
  from_timestamp?: number | null;
  instrument_name?: string | null;
  order_id?: string | null;
  page?: number | null;
  page_size?: number | null;
  quote_id?: string | null;
  subaccount_id?: number | null;
  to_timestamp?: number | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PaginatedTradesResult".
 */
export interface PaginatedTradesResult {
  pagination: PaginationInfo;
  subaccount_id: number;
  trades: TradeHistoryResponse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TradeHistoryResponse".
 */
export interface TradeHistoryResponse {
  batch_status?: BatchStatus | null;
  direction: Direction;
  expected_rebate: string;
  extra_fee: string;
  index_price: string;
  instrument_name: string;
  is_transfer: boolean;
  label: string;
  liquidity_role: LiquidityRole;
  mark_price: string;
  op_uuid: string;
  order_id: string;
  quote_id: string | null;
  realized_pnl: string;
  realized_pnl_excl_fees: string;
  rfq_id: string | null;
  subaccount_id: number;
  timestamp: number;
  trade_amount: string;
  trade_fee: string;
  trade_id: string;
  trade_price: string;
  tx_hash?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetTriggerOrdersEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetTriggerOrdersEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_trigger_orders';
  params: GetTriggerOrdersEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetTriggerOrdersEdgeRpcParams".
 */
export interface GetTriggerOrdersEdgeRpcParams {
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AggregatedTriggerOrdersResult".
 */
export interface AggregatedTriggerOrdersResult {
  orders: OrderWireResponse[];
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetVaultRequestHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetVaultRequestHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_vault_request_history';
  params: GetVaultRequestHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetVaultRequestHistoryEdgeRpcParams".
 */
export interface GetVaultRequestHistoryEdgeRpcParams {
  page?: number | null;
  page_size?: number | null;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PaginatedVaultRequestHistory".
 */
export interface PaginatedVaultRequestHistory {
  actions: VaultActionEdgeRpcResponse[];
  pagination: PaginationInfo;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultActionEdgeRpcResponse".
 */
export interface VaultActionEdgeRpcResponse {
  after_shares: string;
  amount: string;
  before_shares: string;
  creation_timestamp_ms: number;
  entry_price: string;
  error_reason: string;
  event_ts: number;
  event_type: string;
  exit_price: string;
  operation_id: number;
  operation_uuid: string;
  share_price: string;
  shares_delta: string;
  shares_requested: string;
  status: string;
  user_action_hash: string;
  vault_nonce: string;
  vault_subaccount_id: number;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetVaultSharesEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetVaultSharesEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_vault_shares';
  params: GetVaultSharesEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetVaultSharesEdgeRpcParams".
 */
export interface GetVaultSharesEdgeRpcParams {
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultSharesWireResponse".
 */
export interface VaultSharesWireResponse {
  vaults: VaultShareEntryWireResponse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultShareEntryWireResponse".
 */
export interface VaultShareEntryWireResponse {
  shares: string;
  vault: VaultWireResponse;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultWireResponse".
 */
export interface VaultWireResponse {
  benchmark_price?: string | null;
  curator: Address;
  curator_shares: string;
  description: string;
  mtm_cap?: string | null;
  name: string;
  nav_benchmark?: string | null;
  nav_usd?: string | null;
  protocol: ProtocolVaultWireResponse;
  simulated_share_price_usd?: string | null;
  whitelist_only: boolean;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ProtocolVaultWireResponse".
 */
export interface ProtocolVaultWireResponse {
  closed: boolean;
  config: VaultConfig;
  global_hwm: string;
  last_fee_settled_at_sec: number;
  protocol_fee_share_bps: number;
  subaccount_id: number;
  total_shares: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultConfig".
 */
export interface VaultConfig {
  benchmark_asset?: Address | null;
  cooldown_sec: number;
  deposit_spot_asset: Address;
  management_fee_bps: number;
  max_slippage_bps: number;
  performance_fee_bps: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetWithdrawalHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetWithdrawalHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_withdrawal_history';
  params: GetWithdrawalHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetWithdrawalHistoryEdgeRpcParams".
 */
export interface GetWithdrawalHistoryEdgeRpcParams {
  end_timestamp?: number | null;
  start_timestamp?: number | null;
  subaccount_id?: number | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "WithdrawalHistoryResult".
 */
export interface WithdrawalHistoryResult {
  withdrawals: WithdrawalEntry[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "WithdrawalEntry".
 */
export interface WithdrawalEntry {
  amount: string;
  asset: string;
  batch_status: BatchStatus;
  batch_uuid: string;
  erc20_address: string;
  fee: string;
  operation_id: string;
  recipient: string;
  subaccount_id: number;
  timestamp: number;
  tx_hash?: string | null;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_MintSharesEdgeRpcParams".
 */
export interface JsonRpcRequestFor_MintSharesEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/mint_vault_shares';
  params: MintSharesEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MintSharesEdgeRpcParams".
 */
export interface MintSharesEdgeRpcParams {
  deposit_hash: string;
  nonce: number;
  request_id: VaultRequestId;
  share_price: string;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_CreateOrderEdgeRpcParams".
 */
export interface JsonRpcRequestFor_CreateOrderEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/order_debug';
  params: CreateOrderEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CreateOrderEdgeRpcParams".
 */
export interface CreateOrderEdgeRpcParams {
  algo_duration_sec?: number | null;
  algo_num_slices?: number | null;
  algo_type?: AlgoType | null;
  amount: string;
  client?: string | null;
  direction: Direction;
  extra_fee?: string | null;
  instrument_name: string;
  is_atomic_signing?: boolean | null;
  label?: string | null;
  limit_price: string;
  max_fee: string;
  mmp?: boolean | null;
  nonce: string;
  order_type?: 'limit' | 'market';
  reduce_only?: boolean | null;
  referral_code?: string | null;
  reject_post_only?: boolean | null;
  reject_timestamp?: number | null;
  signature: string;
  signature_expiry_sec: number;
  signer: string;
  subaccount_id: number;
  time_in_force?: 'gtc' | 'post_only' | 'fok' | 'ioc';
  trigger_price?: string | null;
  trigger_price_type?: TriggerPriceType | null;
  trigger_type?: TriggerType | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderCreatedWireResponse".
 */
export interface OrderCreatedWireResponse {
  order: OrderWireResponse;
  trades: TradeWireResponse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TradeWireResponse".
 */
export interface TradeWireResponse {
  batch_status?: BatchStatus | null;
  direction: Direction;
  expected_rebate: string;
  extra_fee: string;
  index_price: string;
  instrument_name: string;
  is_transfer: boolean;
  label?: string;
  liquidity_role: LiquidityRole;
  mark_price: string;
  op_uuid: string;
  order_id: string;
  quote_id: string | null;
  realized_pnl: string;
  realized_pnl_excl_fees: string;
  rfq_id: string | null;
  subaccount_id: number;
  timestamp: number;
  trade_amount: string;
  trade_fee: string;
  trade_id: string;
  trade_price: string;
  tx_hash?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SignedActionDebugEdgeRpcResponse_for_OrderActionDataEdgeRpcResponse".
 */
export interface SignedActionDebugEdgeRpcResponseFor_OrderActionDataEdgeRpcResponse {
  action_hash: string;
  action_typehash: string;
  domain_separator: string;
  encoded_data: string;
  encoded_data_hashed: string;
  expected_signer: string;
  input_data: ActionInputDataEdgeRpcResponseFor_OrderActionDataEdgeRpcResponse;
  module: string;
  owner: string;
  recovered_signer?: string | null;
  typed_data_hash: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ActionInputDataEdgeRpcResponse_for_OrderActionDataEdgeRpcResponse".
 */
export interface ActionInputDataEdgeRpcResponseFor_OrderActionDataEdgeRpcResponse {
  data: OrderActionDataEdgeRpcResponse;
  expiry: number;
  module: string;
  nonce: number;
  owner: string;
  signer: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderActionDataEdgeRpcResponse".
 */
export interface OrderActionDataEdgeRpcResponse {
  asset_address: string;
  asset_sub_id: string;
  desired_amount: string;
  is_bid: boolean;
  limit_price: string;
  recipient_id: number;
  worst_fee: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_OrderQuoteEdgeRpcParams".
 */
export interface JsonRpcRequestFor_OrderQuoteEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/order_quote';
  params: OrderQuoteEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderQuoteEdgeRpcParams".
 */
export interface OrderQuoteEdgeRpcParams {
  amount: string;
  client?: string;
  direction: Direction;
  extra_fee?: string | null;
  instrument_name: string;
  is_atomic_signing?: boolean;
  label?: string;
  limit_price: string;
  max_fee: string;
  mmp?: boolean;
  nonce: string;
  order_type?: 'limit' | 'market';
  reduce_only?: boolean;
  referral_code?: string;
  reject_post_only?: boolean;
  reject_timestamp?: number;
  signature: string;
  signature_expiry_sec: number;
  signer: string;
  subaccount_id: number;
  time_in_force?: 'gtc' | 'post_only' | 'fok' | 'ioc';
  trigger_price?: string | null;
  trigger_price_type?: TriggerPriceType | null;
  trigger_type?: TriggerType | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderQuoteEdgeRpcResponse".
 */
export interface OrderQuoteEdgeRpcResponse {
  estimated_fee: string;
  estimated_fill_amount: string;
  estimated_fill_price: string;
  estimated_order_status: OrderStatus;
  estimated_realized_pnl: string;
  estimated_realized_pnl_excl_fees: string;
  invalid_reason?: string | null;
  is_valid: boolean;
  max_amount?: string | null;
  post_initial_margin: string;
  post_liquidation_price?: string | null;
  pre_initial_margin: string;
  suggested_max_fee: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_PollQuotesEdgeRpcParams".
 */
export interface JsonRpcRequestFor_PollQuotesEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/poll_quotes';
  params: PollQuotesEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PollQuotesEdgeRpcParams".
 */
export interface PollQuotesEdgeRpcParams {
  from_timestamp?: number;
  page?: number;
  page_size?: number;
  quote_id?: string | null;
  rfq_id?: string | null;
  status?: string | null;
  subaccount_id: number;
  to_timestamp?: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuotePollWireResponse".
 */
export interface QuotePollWireResponse {
  pagination: PaginationInfo;
  quotes: QuoteResultPublic[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteResultPublic".
 */
export interface QuoteResultPublic {
  cancel_reason: RFQCancelReason;
  creation_timestamp: number;
  direction: Direction;
  fill_pct: string;
  last_update_timestamp: number;
  legs: PricedLegParamsAndResponse[];
  legs_hash: string;
  liquidity_role: LiquidityRole;
  quote_id: string;
  rfq_id: string;
  status: RFQStatus;
  subaccount_id: number;
  wallet: Address;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_PollRfqsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_PollRfqsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/poll_rfqs';
  params: PollRfqsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PollRfqsEdgeRpcParams".
 */
export interface PollRfqsEdgeRpcParams {
  from_timestamp?: number;
  page?: number;
  page_size?: number;
  rfq_id?: string | null;
  rfq_subaccount_id?: number | null;
  status?: string | null;
  subaccount_id: number;
  to_timestamp?: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RFQPollWireResponse".
 */
export interface RFQPollWireResponse {
  pagination: PaginationInfo;
  rfqs: RFQResultPublic[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RFQResultPublic".
 */
export interface RFQResultPublic {
  cancel_reason: RFQCancelReason;
  creation_timestamp: number;
  fill_rate: string | null;
  filled_direction?: Direction | null;
  filled_pct: string;
  last_update_timestamp: number;
  legs: LegUnpricedParams[];
  partial_fill_step: string;
  recent_fill_rate: string | null;
  rfq_id: string;
  status: RFQStatus;
  subaccount_id: number;
  total_cost: string | null;
  valid_until: number;
  wallet: Address;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_RejectDepositRequestEdgeRpcParams".
 */
export interface JsonRpcRequestFor_RejectDepositRequestEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/reject_deposit_request';
  params: RejectDepositRequestEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RejectDepositRequestEdgeRpcParams".
 */
export interface RejectDepositRequestEdgeRpcParams {
  reason?: string | null;
  request_id: VaultRequestId;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultRequestAckWireResponse".
 */
export interface VaultRequestAckWireResponse {
  request_id: VaultRequestId;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_ReplaceOrderEdgeRpcParams".
 */
export interface JsonRpcRequestFor_ReplaceOrderEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/replace';
  params: ReplaceOrderEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ReplaceOrderEdgeRpcParams".
 */
export interface ReplaceOrderEdgeRpcParams {
  algo_duration_sec?: number | null;
  algo_num_slices?: number | null;
  algo_type?: AlgoType | null;
  amount: string;
  client?: string | null;
  direction: Direction;
  expected_filled_amount?: string | null;
  extra_fee?: string | null;
  instrument_name: string;
  is_atomic_signing?: boolean | null;
  label?: string | null;
  limit_price: string;
  max_fee: string;
  mmp?: boolean | null;
  nonce: string;
  nonce_to_cancel?: number | null;
  order_id_to_cancel?: string | null;
  order_type?: 'limit' | 'market';
  reduce_only?: boolean | null;
  referral_code?: string | null;
  reject_post_only?: boolean | null;
  reject_timestamp?: number | null;
  signature: string;
  signature_expiry_sec: number;
  signer: string;
  subaccount_id: number;
  time_in_force?: 'gtc' | 'post_only' | 'fok' | 'ioc';
  trigger_price?: string | null;
  trigger_price_type?: TriggerPriceType | null;
  trigger_type?: TriggerType | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ReplaceOrderWireResponse".
 */
export interface ReplaceOrderWireResponse {
  cancelled_order: OrderWireResponse;
  create_order_error?: RPCError | null;
  order?: OrderWireResponse | null;
  trades?: TradeWireResponse[] | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_ReplaceQuoteEdgeRpcParams".
 */
export interface JsonRpcRequestFor_ReplaceQuoteEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/replace_quote';
  params: ReplaceQuoteEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ReplaceQuoteEdgeRpcParams".
 */
export interface ReplaceQuoteEdgeRpcParams {
  client?: string;
  direction: Direction;
  extra_fee?: string;
  label?: string;
  legs: PricedLegParamsAndResponse[];
  max_fee: string;
  mmp?: boolean;
  nonce: number;
  nonce_to_cancel?: number | null;
  quote_id_to_cancel?: string | null;
  referral_code?: string;
  rfq_id: string;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteReplaceWireResponse".
 */
export interface QuoteReplaceWireResponse {
  cancelled_quote: QuotePrivateWireResponse;
  create_quote_error?: RPCError | null;
  quote?: QuotePrivateWireResponse | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_RequestVaultDepositEdgeRpcParams".
 */
export interface JsonRpcRequestFor_RequestVaultDepositEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/request_vault_deposit';
  params: RequestVaultDepositEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RequestVaultDepositEdgeRpcParams".
 */
export interface RequestVaultDepositEdgeRpcParams {
  amount: string;
  deposit_spot_asset: Address;
  nonce: number;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
  vault_subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_RequestVaultWithdrawEdgeRpcParams".
 */
export interface JsonRpcRequestFor_RequestVaultWithdrawEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/request_vault_withdraw';
  params: RequestVaultWithdrawEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RequestVaultWithdrawEdgeRpcParams".
 */
export interface RequestVaultWithdrawEdgeRpcParams {
  nonce: number;
  shares_to_burn: string;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
  vault_subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_RfqGetBestQuoteEdgeRpcParams".
 */
export interface JsonRpcRequestFor_RfqGetBestQuoteEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/rfq_get_best_quote';
  params: RfqGetBestQuoteEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RfqGetBestQuoteEdgeRpcParams".
 */
export interface RfqGetBestQuoteEdgeRpcParams {
  client?: string;
  direction?: 'buy' | 'sell';
  extra_fee?: string;
  legs?: LegUnpricedParams[];
  rfq_id?: string | null;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RfqGetBestQuoteWireResponse".
 */
export interface RfqGetBestQuoteWireResponse {
  best_quote?: QuoteResultPublic | null;
  direction: Direction;
  down_liquidation_price: string | null;
  estimated_fee: string;
  estimated_realized_pnl: string;
  estimated_realized_pnl_excl_fees: string;
  estimated_total_cost: string;
  filled_pct: string;
  invalid_reason?: string | null;
  is_valid: boolean;
  orderbook_total_cost: string | null;
  post_initial_margin: string;
  post_liquidation_price: string | null;
  pre_initial_margin: string;
  suggested_max_fee: string;
  up_liquidation_price: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_SendQuoteEdgeRpcParams".
 */
export interface JsonRpcRequestFor_SendQuoteEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/send_quote';
  params: SendQuoteEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SendQuoteEdgeRpcParams".
 */
export interface SendQuoteEdgeRpcParams {
  client?: string;
  direction: Direction;
  extra_fee?: string;
  label?: string;
  legs: PricedLegParamsAndResponse[];
  max_fee: string;
  mmp?: boolean;
  nonce: number;
  referral_code?: string;
  rfq_id: string;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_SendRfqEdgeRpcParams".
 */
export interface JsonRpcRequestFor_SendRfqEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/send_rfq';
  params: SendRfqEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SendRfqEdgeRpcParams".
 */
export interface SendRfqEdgeRpcParams {
  client?: string;
  counterparties?: string[] | null;
  extra_fee?: string;
  label?: string;
  legs: LegUnpricedParams[];
  max_total_cost?: string | null;
  min_total_cost?: string | null;
  partial_fill_step?: string;
  referral_code?: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_SessionKeysEdgeRpcParams".
 */
export interface JsonRpcRequestFor_SessionKeysEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/session_keys';
  params: SessionKeysEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SessionKeysEdgeRpcParams".
 */
export interface SessionKeysEdgeRpcParams {
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateSessionKeysRPCResponse".
 */
export interface PrivateSessionKeysRPCResponse {
  public_session_keys: SessionKeyResponse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_SetCancelOnDisconnectEdgeRpcParams".
 */
export interface JsonRpcRequestFor_SetCancelOnDisconnectEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/set_cancel_on_disconnect';
  params: SetCancelOnDisconnectEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SetCancelOnDisconnectEdgeRpcParams".
 */
export interface SetCancelOnDisconnectEdgeRpcParams {
  enabled?: boolean | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_SetMmpConfigEdgeRpcParams".
 */
export interface JsonRpcRequestFor_SetMmpConfigEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/set_mmp_config';
  params: SetMmpConfigEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SetMmpConfigEdgeRpcParams".
 */
export interface SetMmpConfigEdgeRpcParams {
  currency: string;
  mmp_amount_limit?: string;
  mmp_delta_limit?: string;
  mmp_frozen_time: number;
  mmp_interval: number;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SetMmpConfigResponse".
 */
export interface SetMmpConfigResponse {
  currency: string;
  mmp_amount_limit: string;
  mmp_delta_limit: string;
  mmp_frozen_time: number;
  mmp_interval: number;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_TransferPositionsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_TransferPositionsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/transfer_positions';
  params: TransferPositionsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TransferPositionsEdgeRpcParams".
 */
export interface TransferPositionsEdgeRpcParams {
  maker_params: SignedTransferQuoteEdgeRpcParams;
  taker_params: SignedTransferQuoteEdgeRpcParams;
  wallet: Address;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SignedTransferQuoteEdgeRpcParams".
 */
export interface SignedTransferQuoteEdgeRpcParams {
  direction: Direction;
  legs: PricedLegParamsAndResponse[];
  max_fee: string;
  nonce: string;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TransferPositionsWireResponse".
 */
export interface TransferPositionsWireResponse {
  maker_quote: QuotePrivateWireResponse;
  taker_quote: QuotePrivateWireResponse;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_PrivateTransferSpotEdgeRpcParams".
 */
export interface JsonRpcRequestFor_PrivateTransferSpotEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/transfer_spot';
  params: PrivateTransferSpotEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateTransferSpotEdgeRpcParams".
 */
export interface PrivateTransferSpotEdgeRpcParams {
  amount: string;
  asset_name: string;
  max_fee_usd: string;
  new_subaccount_manager: number;
  nonce: number;
  signature: string;
  signature_expiry_sec: number;
  signer: string;
  sub_id: number;
  subaccount_id: number;
  to_subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateTransferSpotEdgeRpcResponse".
 */
export interface PrivateTransferSpotEdgeRpcResponse {
  op_uuid: string;
  operation_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_PrivateTransferSpotExternalEdgeRpcParams".
 */
export interface JsonRpcRequestFor_PrivateTransferSpotExternalEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/transfer_spot_external';
  params: PrivateTransferSpotExternalEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateTransferSpotExternalEdgeRpcParams".
 */
export interface PrivateTransferSpotExternalEdgeRpcParams {
  amount: string;
  asset_name: string;
  max_fee_usd: string;
  new_subaccount_manager: number;
  nonce: number;
  recipient_address: string;
  signature: string;
  signature_expiry_sec: number;
  signer: string;
  sub_id: number;
  subaccount_id: number;
  to_subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateTransferSpotExternalEdgeRpcResponse".
 */
export interface PrivateTransferSpotExternalEdgeRpcResponse {
  op_uuid: string;
  operation_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_UpdateVaultInfoEdgeRpcParams".
 */
export interface JsonRpcRequestFor_UpdateVaultInfoEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/update_vault_info';
  params: UpdateVaultInfoEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "UpdateVaultInfoEdgeRpcParams".
 */
export interface UpdateVaultInfoEdgeRpcParams {
  description?: string | null;
  mtm_cap?: string | null;
  name?: string | null;
  subaccount_id: number;
  whitelist_only?: boolean | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OffchainAckWireResponse".
 */
export interface OffchainAckWireResponse {
  status: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_UpdateWhitelistedRecipientsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_UpdateWhitelistedRecipientsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/update_whitelisted_recipients';
  params: UpdateWhitelistedRecipientsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "UpdateWhitelistedRecipientsEdgeRpcParams".
 */
export interface UpdateWhitelistedRecipientsEdgeRpcParams {
  add: string[];
  nonce: number;
  remove: string[];
  signature: string;
  signature_expiry_sec: number;
  signer: string;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "UpdateWhitelistedRecipientsEdgeRpcResponse".
 */
export interface UpdateWhitelistedRecipientsEdgeRpcResponse {
  op_uuid: string;
  operation_id: number;
  whitelisted_recipients: string[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_PrivateWithdrawEdgeRpcParams".
 */
export interface JsonRpcRequestFor_PrivateWithdrawEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/withdraw';
  params: PrivateWithdrawEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateWithdrawEdgeRpcParams".
 */
export interface PrivateWithdrawEdgeRpcParams {
  amount_in_underlying: string;
  asset_name: string;
  force_batch: boolean;
  max_fee_usd: string;
  nonce: number;
  signature: string;
  signature_expiry_sec: number;
  signer: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateWithdrawEdgeRpcResponse".
 */
export interface PrivateWithdrawEdgeRpcResponse {
  op_uuid: string;
  operation_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_PublicExecuteQuoteDebugEdgeRpcParams".
 */
export interface JsonRpcRequestFor_PublicExecuteQuoteDebugEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/execute_quote_debug';
  params: PublicExecuteQuoteDebugEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PublicExecuteQuoteDebugEdgeRpcParams".
 */
export interface PublicExecuteQuoteDebugEdgeRpcParams {
  direction: Direction;
  legs: PricedLegParamsAndResponse[];
  max_fee: string;
  nonce: number;
  quote_id: string;
  rfq_id: string;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteExecuteDebugResult".
 */
export interface QuoteExecuteDebugResult {
  action_hash: string;
  encoded_data: string;
  encoded_data_hashed: string;
  encoded_legs: string;
  legs_hash: string;
  typed_data_hash: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_NoParams".
 */
export interface JsonRpcRequestFor_NoParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_time';
  params: NoParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CurrencyResponse".
 */
export interface CurrencyResponse {
  currency: string;
  managers: UniverseManagers[];
  market_type: MarketType;
  option?: AssetEntry | null;
  perp?: AssetEntry | null;
  spot: SpotAssetEntry[];
  spot_price: string;
  spot_price_24h?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "UniverseManagers".
 */
export interface UniverseManagers {
  pm?: number | null;
  risk_universe_id: number;
  risk_universe_name?: string | null;
  sm?: number | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AssetEntry".
 */
export interface AssetEntry {
  address: string;
  name: string;
  universes: AssetUniverse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AssetUniverse".
 */
export interface AssetUniverse {
  oi: OpenInterestStats;
  risk_universe_id: number;
  risk_universe_name?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OpenInterestStats".
 */
export interface OpenInterestStats {
  current_open_interest: string;
  interest_cap: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SpotAssetEntry".
 */
export interface SpotAssetEntry {
  address: string;
  erc20: Erc20Details;
  min_deposit_usd: string;
  name: string;
  universes: SpotUniverse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "Erc20Details".
 */
export interface Erc20Details {
  decimals: number;
  underlying_erc20?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SpotUniverse".
 */
export interface SpotUniverse {
  lending?: LendingDetails | null;
  oi: OpenInterestStats;
  pm2_im_discount: string;
  pm2_mm_discount: string;
  risk_universe_id: number;
  srm_im_discount: string;
  srm_mm_discount: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "LendingDetails".
 */
export interface LendingDetails {
  borrow_apy: string;
  supply_apy: string;
  total_borrow: string;
  total_borrow_cap: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetAllInstrumentsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetAllInstrumentsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_all_instruments';
  params: GetAllInstrumentsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetAllInstrumentsEdgeRpcParams".
 */
export interface GetAllInstrumentsEdgeRpcParams {
  currency?: string | null;
  expired: boolean;
  instrument_type: PublicAssetType;
  page?: number | null;
  page_size?: number | null;
  risk_universe_id?: number | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetAllInstrumentsResponse".
 */
export interface GetAllInstrumentsResponse {
  instruments: InstrumentPublicResponse[];
  pagination: PaginationInfo2;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InstrumentPublicResponse".
 */
export interface InstrumentPublicResponse {
  amount_step: string;
  base_asset_address: string;
  base_asset_sub_id: string;
  base_currency: string;
  base_fee: string;
  erc20_details?: SpotPublicDetails | null;
  fifo_min_allocation: string;
  instrument_name: string;
  instrument_type: PublicAssetType;
  is_active: boolean;
  maker_fee_rate: string;
  mark_price_fee_rate_cap?: string | null;
  maximum_amount: string;
  minimum_amount: string;
  option_details?: OptionPublicDetails | null;
  perp_details?: PerpPublicDetails | null;
  pro_rata_amount_step: string;
  pro_rata_fraction: string;
  quote_currency: string;
  scheduled_activation: number;
  scheduled_deactivation: number;
  taker_fee_rate: string;
  tick_size: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SpotPublicDetails".
 */
export interface SpotPublicDetails {
  borrow_index: string;
  decimals: number;
  supply_index: string;
  underlying_erc20_address: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OptionPublicDetails".
 */
export interface OptionPublicDetails {
  expiry: number;
  index: string;
  option_type: string;
  settlement_price?: string | null;
  strike: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PerpPublicDetails".
 */
export interface PerpPublicDetails {
  aggregate_funding: string;
  funding_rate: string;
  index: string;
  max_rate_per_hour: string;
  min_rate_per_hour: string;
  static_interest_rate: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PaginationInfo2".
 */
export interface PaginationInfo2 {
  count: number;
  num_pages: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetAllReferralCodesParams".
 */
export interface JsonRpcRequestFor_GetAllReferralCodesParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_all_referral_codes';
  params: GetAllReferralCodesParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetAllReferralCodesParams".
 */
export interface GetAllReferralCodesParams {}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "Referrer".
 */
export interface Referrer {
  receiving_wallet?: string | null;
  referral_code: string;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetAssetsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetAssetsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_assets';
  params: GetAssetsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetAssetsEdgeRpcParams".
 */
export interface GetAssetsEdgeRpcParams {
  asset_type: PublicAssetType;
  currency: string;
  expired: boolean;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AssetResponsePublic".
 */
export interface AssetResponsePublic {
  address: string;
  asset_id: string;
  asset_name: string;
  asset_type: PublicAssetType;
  currency: string;
  erc20_details?: SpotPublicDetails | null;
  is_collateral: boolean;
  is_position: boolean;
  option_details?: OptionPublicDetails | null;
  perp_details?: PerpPublicDetails | null;
  sub_id: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetCurrencyEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetCurrencyEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_currency';
  params: GetCurrencyEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetCurrencyEdgeRpcParams".
 */
export interface GetCurrencyEdgeRpcParams {
  currency: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetFundingRateHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetFundingRateHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_funding_rate_history';
  params: GetFundingRateHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetFundingRateHistoryEdgeRpcParams".
 */
export interface GetFundingRateHistoryEdgeRpcParams {
  end_timestamp?: number | null;
  instrument_name: string;
  period?: number | null;
  start_timestamp?: number | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "FundingRateHistoryResult".
 */
export interface FundingRateHistoryResult {
  funding_rate_history: FundingRateCandle[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "FundingRateCandle".
 */
export interface FundingRateCandle {
  close: string;
  currency: string;
  funding_rate: string;
  high: string;
  low: string;
  open: string;
  risk_universe_id: number;
  timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetIndexChartDataEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetIndexChartDataEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_index_chart_data';
  params: GetIndexChartDataEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetIndexChartDataEdgeRpcParams".
 */
export interface GetIndexChartDataEdgeRpcParams {
  currency: string;
  end_timestamp: number;
  period: number;
  start_timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "IndexCandle".
 */
export interface IndexCandle {
  close_price: string;
  high_price: string;
  low_price: string;
  open_price: string;
  price: string;
  timestamp: number;
  timestamp_bucket: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetInstrumentEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetInstrumentEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_instrument';
  params: GetInstrumentEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetInstrumentEdgeRpcParams".
 */
export interface GetInstrumentEdgeRpcParams {
  instrument_name: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetInterestRateHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetInterestRateHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_interest_rate_history';
  params: GetInterestRateHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetInterestRateHistoryEdgeRpcParams".
 */
export interface GetInterestRateHistoryEdgeRpcParams {
  currency: string;
  end_timestamp?: number | null;
  period?: number | null;
  risk_universe_id?: number | null;
  start_timestamp?: number | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InterestRateHistoryResult".
 */
export interface InterestRateHistoryResult {
  interest_rate_history: InterestRateCandle[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InterestRateCandle".
 */
export interface InterestRateCandle {
  borrow_apy: Ohlc;
  risk_universe_id: number;
  supply_apy: Ohlc;
  timestamp: number;
  total_borrow: string;
  total_supply: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "Ohlc".
 */
export interface Ohlc {
  close: string;
  high: string;
  low: string;
  open: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetLatestSignedFeedsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetLatestSignedFeedsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_latest_signed_feeds';
  params: GetLatestSignedFeedsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetLatestSignedFeedsEdgeRpcParams".
 */
export interface GetLatestSignedFeedsEdgeRpcParams {
  currency?: string | null;
  expiry?: number | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetLatestSignedFeedsResponse".
 */
export interface GetLatestSignedFeedsResponse {
  fwd_data: {
    [k: string]: {
      [k: string]: ForwardFeedDataResponse;
    };
  };
  perp_data: {
    [k: string]: {
      [k: string]: PerpFeedDataResponse;
    };
  };
  rate_data: {
    [k: string]: {
      [k: string]: RateFeedDataResponse;
    };
  };
  spot_data: {
    [k: string]: SpotFeedDataResponse;
  };
  vol_data: {
    [k: string]: {
      [k: string]: VolFeedDataResponse;
    };
  };
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ForwardFeedDataResponse".
 */
export interface ForwardFeedDataResponse {
  confidence: string;
  currency: string;
  deadline: number;
  expiry: number;
  fwd_diff: string;
  signatures: OracleSignatureDataResponse;
  spot_aggregate_latest: string;
  spot_aggregate_start: string;
  timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OracleSignatureDataResponse".
 */
export interface OracleSignatureDataResponse {
  signatures: string[];
  signers: Address[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PerpFeedDataResponse".
 */
export interface PerpFeedDataResponse {
  confidence: string;
  currency: string;
  deadline: number;
  signatures: OracleSignatureDataResponse;
  spot_diff_value: string;
  timestamp: number;
  type: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RateFeedDataResponse".
 */
export interface RateFeedDataResponse {
  confidence: string;
  currency: string;
  deadline: number;
  expiry: number;
  rate: string;
  signatures: OracleSignatureDataResponse;
  timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SpotFeedDataResponse".
 */
export interface SpotFeedDataResponse {
  confidence: string;
  currency: string;
  deadline: number;
  feed_source_type?: string | null;
  price: string;
  signatures: OracleSignatureDataResponse;
  timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VolFeedDataResponse".
 */
export interface VolFeedDataResponse {
  confidence: string;
  currency: string;
  deadline: number;
  expiry: number;
  signatures: OracleSignatureDataResponse;
  timestamp: number;
  vol_data: VolSVIParamDataResponse;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VolSVIParamDataResponse".
 */
export interface VolSVIParamDataResponse {
  SVI_a: string;
  SVI_b: string;
  SVI_fwd: string;
  SVI_m: string;
  SVI_refTau: string;
  SVI_rho: string;
  SVI_sigma: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetOnchainActionHistoryParams".
 */
export interface JsonRpcRequestFor_GetOnchainActionHistoryParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_onchain_action_history';
  params: GetOnchainActionHistoryParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetOnchainActionHistoryParams".
 */
export interface GetOnchainActionHistoryParams {
  action_type?: number | null;
  end_timestamp?: number | null;
  page?: number | null;
  page_size?: number | null;
  start_timestamp?: number | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetOnchainActionHistoryResponse".
 */
export interface GetOnchainActionHistoryResponse {
  actions: OnchainActionHistoryEntry[];
  pagination: PaginationInfo;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OnchainActionHistoryEntry".
 */
export interface OnchainActionHistoryEntry {
  acc: string;
  action_id: number;
  action_type: number;
  action_type_label: string;
  block_number: number;
  data: string;
  error_code?: number | null;
  error_message?: string | null;
  fallback_at?: number | null;
  first_failed_at?: number | null;
  l1_sender: string;
  last_failed_at?: number | null;
  op_uuid?: string | null;
  queue: string;
  status: string;
  tx_hash?: string | null;
  updated_at: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetOptionSettlementPricesEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetOptionSettlementPricesEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_option_settlement_prices';
  params: GetOptionSettlementPricesEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetOptionSettlementPricesEdgeRpcParams".
 */
export interface GetOptionSettlementPricesEdgeRpcParams {
  currency: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OptionSettlementPricesResult".
 */
export interface OptionSettlementPricesResult {
  expiries: ExpirySettlementPrice[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ExpirySettlementPrice".
 */
export interface ExpirySettlementPrice {
  expiry_date: string;
  price?: string | null;
  utc_expiry_sec: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetPendingDepositsParams".
 */
export interface JsonRpcRequestFor_GetPendingDepositsParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_pending_deposits';
  params: GetPendingDepositsParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetPendingDepositsParams".
 */
export interface GetPendingDepositsParams {
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetPendingDepositsResult".
 */
export interface GetPendingDepositsResult {
  pending_deposits: PendingDepositEntry[];
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PendingDepositEntry".
 */
export interface PendingDepositEntry {
  action_id: number;
  action_type: string;
  amount: string;
  asset: string;
  block_number: number;
  credit_nonce?: string | null;
  deposit_type: string;
  log_index: number;
  manager_id: number;
  status: string;
  subaccount_id: number;
  timestamp: number;
  tx_hash: string;
  updated_at_ms: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetReferralPerformanceParams".
 */
export interface JsonRpcRequestFor_GetReferralPerformanceParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_referral_performance';
  params: GetReferralPerformanceParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetReferralPerformanceParams".
 */
export interface GetReferralPerformanceParams {
  end_ms: number;
  referral_code?: string | null;
  start_ms: number;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetReferralPerformanceResult".
 */
export interface GetReferralPerformanceResult {
  fee_share_percentage: string;
  referral_code: string;
  rewards: {
    [k: string]: {
      [k: string]: {
        [k: string]: ReferralPerformanceByInstrumentType;
      };
    };
  };
  stdrv_balance: string;
  total_builder_fee_collected: string;
  total_fee_rewards: string;
  total_notional_volume: string;
  total_referred_fees: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ReferralPerformanceByInstrumentType".
 */
export interface ReferralPerformanceByInstrumentType {
  builder_fee: string;
  fee_reward: string;
  notional_volume: string;
  referred_fee: string;
  unique_traders_referred: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RiskUniverseResponse".
 */
export interface RiskUniverseResponse {
  description?: string | null;
  managers: RiskUniverseManager[];
  name?: string | null;
  risk_universe_id: number;
  security_module: SecurityModuleDetails;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RiskUniverseManager".
 */
export interface RiskUniverseManager {
  collaterals: ManagerCollateral[];
  instruments: string[];
  manager_id: number;
  margin_type: MarginType;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ManagerCollateral".
 */
export interface ManagerCollateral {
  address: string;
  erc20: Erc20Details;
  im_discount: string;
  min_deposit_usd: string;
  mm_discount: string;
  name: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SecurityModuleDetails".
 */
export interface SecurityModuleDetails {
  cash_asset: string;
  cash_currency: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetTickerEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetTickerEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_ticker';
  params: GetTickerEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetTickerEdgeRpcParams".
 */
export interface GetTickerEdgeRpcParams {
  instrument_name: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TickerSlimSnapshot".
 */
export interface TickerSlimSnapshot {
  A: string;
  B: string;
  I: string;
  M: string;
  a: string;
  b: string;
  f?: string | null;
  maxp: string;
  minp: string;
  option_pricing?: OptionPricing | null;
  stats: DailyTradingStatistics;
  t: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OptionPricing".
 */
export interface OptionPricing {
  ai: string;
  bi: string;
  d: string;
  df: string;
  f: string;
  g: string;
  i: string;
  m: string;
  r: string;
  t: string;
  v: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "DailyTradingStatistics".
 */
export interface DailyTradingStatistics {
  c: string;
  h: string;
  l: string;
  n: number;
  oi: string;
  p: string;
  pr: string;
  v: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetTickersEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetTickersEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_tickers';
  params: GetTickersEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetTickersEdgeRpcParams".
 */
export interface GetTickersEdgeRpcParams {
  currency?: string | null;
  expiry_date?: number | null;
  instrument_type: PublicAssetType;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetTickersResponse".
 */
export interface GetTickersResponse {
  tickers: {
    [k: string]: TickerSlimSnapshot;
  };
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetPublicTradeHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetPublicTradeHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_trade_history';
  params: GetPublicTradeHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetPublicTradeHistoryEdgeRpcParams".
 */
export interface GetPublicTradeHistoryEdgeRpcParams {
  batch_status?: BatchStatus | null;
  currency?: string | null;
  from_timestamp?: number | null;
  instrument_name?: string | null;
  instrument_type?: PublicAssetType | null;
  page?: number | null;
  page_size?: number | null;
  subaccount_id?: number | null;
  to_timestamp?: number | null;
  trade_id?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PublicTradesResult".
 */
export interface PublicTradesResult {
  pagination: PaginationInfo;
  trades: TradeSettledPublicResponse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TradeSettledPublicResponse".
 */
export interface TradeSettledPublicResponse {
  batch_status?: BatchStatus | null;
  direction: Direction;
  expected_rebate: string;
  extra_fee: string;
  index_price: string;
  instrument_name: string;
  liquidity_role: LiquidityRole;
  mark_price: string;
  quote_id: string | null;
  realized_pnl: string;
  realized_pnl_excl_fees: string;
  rfq_id: string | null;
  subaccount_id: number;
  timestamp: number;
  trade_amount: string;
  trade_fee: string;
  trade_id: string;
  trade_price: string;
  tx_hash: string;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetTradingviewChartDataEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetTradingviewChartDataEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_tradingview_chart_data';
  params: GetTradingviewChartDataEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetTradingviewChartDataEdgeRpcParams".
 */
export interface GetTradingviewChartDataEdgeRpcParams {
  end_timestamp: number;
  instrument_name: string;
  period: number;
  start_timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TradingviewCandle".
 */
export interface TradingviewCandle {
  close_price: string;
  high_price: string;
  low_price: string;
  open_price: string;
  timestamp: number;
  timestamp_bucket: number;
  volume_contracts: string;
  volume_usd: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetTransactionParams".
 */
export interface JsonRpcRequestFor_GetTransactionParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_transaction';
  params: GetTransactionParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetTransactionParams".
 */
export interface GetTransactionParams {
  op_uuid: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetTransactionResult".
 */
export interface GetTransactionResult {
  data: string;
  error_log?: string | null;
  status?: BatchStatus | null;
  transaction_hash?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetVaultEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetVaultEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_vault';
  params: GetVaultEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetVaultEdgeRpcParams".
 */
export interface GetVaultEdgeRpcParams {
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetVaultActionHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetVaultActionHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_vault_action_history';
  params: GetVaultActionHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetVaultActionHistoryEdgeRpcParams".
 */
export interface GetVaultActionHistoryEdgeRpcParams {
  event_type?: string | null;
  page?: number | null;
  page_size?: number | null;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PaginatedVaultActionHistory".
 */
export interface PaginatedVaultActionHistory {
  events: PublicVaultActionEdgeRpcResponse[];
  pagination: PaginationInfo;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PublicVaultActionEdgeRpcResponse".
 */
export interface PublicVaultActionEdgeRpcResponse {
  curator_shares_minted: string;
  event_ts: number;
  event_type: string;
  holder: string;
  management_shares_minted: string;
  nav: string;
  new_high_water_mark: string;
  old_high_water_mark: string;
  operation_uuid: string;
  performance_shares_minted: string;
  protocol_shares_minted: string;
  share_price: string;
  shares_delta: string;
  status: string;
  subaccount_id: number;
  total_shares: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetVaultPerformanceHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetVaultPerformanceHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_vault_performance_history';
  params: GetVaultPerformanceHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetVaultPerformanceHistoryEdgeRpcParams".
 */
export interface GetVaultPerformanceHistoryEdgeRpcParams {
  from?: number | null;
  limit?: number | null;
  resolution: PerformanceResolution;
  subaccount_id: number;
  to?: number | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultPerformanceHistoryResult".
 */
export interface VaultPerformanceHistoryResult {
  points: VaultPerformancePointResponse[];
  resolution: PerformanceResolution;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultPerformancePointResponse".
 */
export interface VaultPerformancePointResponse {
  benchmark_price: string | null;
  curator_shares: string;
  global_hwm: string;
  nav: string | null;
  nav_benchmark: string | null;
  share_price: string;
  total_shares: string;
  ts: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetVaultsEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetVaultsEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_vaults';
  params: GetVaultsEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetVaultsEdgeRpcParams".
 */
export interface GetVaultsEdgeRpcParams {
  page?: number;
  page_size?: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultsWireResponse".
 */
export interface VaultsWireResponse {
  pagination: PaginationInfo;
  vaults: VaultWireResponse[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_GetWalletsFromSessionKeyEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetWalletsFromSessionKeyEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_wallets_from_session_key';
  params: GetWalletsFromSessionKeyEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetWalletsFromSessionKeyEdgeRpcParams".
 */
export interface GetWalletsFromSessionKeyEdgeRpcParams {
  public_session_key: string;
  scope?: OffchainKeyScope | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PublicGetWalletsFromSessionKeyRPCResponse".
 */
export interface PublicGetWalletsFromSessionKeyRPCResponse {
  wallets: string[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RateLimitResult".
 */
export interface RateLimitResult {
  remaining_connections?: RateLimitInfo | null;
  remaining_matching: RateLimitInfo;
  remaining_non_matching: RateLimitInfo;
  remaining_per_endpoint: {
    [k: string]: RateLimitInfo;
  };
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RateLimitInfo".
 */
export interface RateLimitInfo {
  consumedPoints: number;
  isFirstInDuration: boolean;
  msBeforeNext: number;
  remainingPoints: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_LoginEdgeRpcParams".
 */
export interface JsonRpcRequestFor_LoginEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/login';
  params: LoginEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "LoginEdgeRpcParams".
 */
export interface LoginEdgeRpcParams {
  signature?: string | null;
  timestamp?: number | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_RegisterDepositAddressParams".
 */
export interface JsonRpcRequestFor_RegisterDepositAddressParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/register_deposit_address';
  params: RegisterDepositAddressParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RegisterDepositAddressParams".
 */
export interface RegisterDepositAddressParams {
  deposit_type: DepositType;
  manager_id?: number | null;
  subaccount_id?: number;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RegisterDepositAddressResult".
 */
export interface RegisterDepositAddressResult {
  deposit_address: string;
  deposit_type: DepositType;
  manager_id?: number | null;
  subaccount_id?: number | null;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_PublicSendQuoteDebugEdgeRpcParams".
 */
export interface JsonRpcRequestFor_PublicSendQuoteDebugEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/send_quote_debug';
  params: PublicSendQuoteDebugEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PublicSendQuoteDebugEdgeRpcParams".
 */
export interface PublicSendQuoteDebugEdgeRpcParams {
  direction: Direction;
  legs: PricedLegParamsAndResponse[];
  max_fee: string;
  nonce: number;
  rfq_id: string;
  signature: string;
  signature_expiry_sec: number;
  signer: Address;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteSendDebugResult".
 */
export interface QuoteSendDebugResult {
  action_hash: string;
  encoded_data: string;
  encoded_data_hashed: string;
  typed_data_hash: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_PublicWithdrawDebugEdgeRpcParams".
 */
export interface JsonRpcRequestFor_PublicWithdrawDebugEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/withdraw_debug';
  params: PublicWithdrawDebugEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PublicWithdrawDebugEdgeRpcParams".
 */
export interface PublicWithdrawDebugEdgeRpcParams {
  amount_in_underlying: string;
  asset_name: string;
  force_batch: boolean;
  max_fee_usd: string;
  nonce: number;
  signature_expiry_sec: number;
  signer: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_SubscribeParams".
 */
export interface JsonRpcRequestFor_SubscribeParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'subscribe';
  params: SubscribeParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SubscribeParams".
 */
export interface SubscribeParams {
  channels: string[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SubscribeResult".
 */
export interface SubscribeResult {
  current_subscriptions: string[];
  status: {
    [k: string]: unknown;
  };
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "JsonRpcRequest_for_UnsubscribeParams".
 */
export interface JsonRpcRequestFor_UnsubscribeParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'unsubscribe';
  params: UnsubscribeParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "UnsubscribeParams".
 */
export interface UnsubscribeParams {
  channels?: string[] | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "UnsubscribeResult".
 */
export interface UnsubscribeResult {
  remaining_subscriptions: string[];
  status: {
    [k: string]: unknown;
  };
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ChannelSchemaMap".
 */
export interface ChannelSchemaMap {
  '{subaccount_id}.balances': {
    params: {
      subaccount_id: string;
    };
    data: BalanceUpdate[];
  };
  '{subaccount_id}.best.quotes': {
    params: {
      subaccount_id: string;
    };
    data: BestQuoteChannelResult[];
  };
  '{subaccount_id}.orders': {
    params: {
      subaccount_id: string;
    };
    data: OrderWireResponse[];
  };
  '{subaccount_id}.quotes': {
    params: {
      subaccount_id: string;
    };
    data: QuotePublishResult[];
  };
  '{subaccount_id}.trades': {
    params: {
      subaccount_id: string;
    };
    data: TradeWireResponse[];
  };
  '{subaccount_id}.trades.{batch_status}': {
    params: {
      subaccount_id: string;
      batch_status:
        | 'Batching'
        | 'Executing'
        | 'Proving'
        | 'Settling'
        | 'Settled'
        | 'BatchingError'
        | 'ExecutingError'
        | 'ProvingError'
        | 'SettlingError'
        | 'SettledError';
    };
    data: TradeWireResponse[];
  };
  '{wallet}.rfqs': {
    params: {
      wallet: string;
    };
    data: RFQResultPublic[];
  };
  'auctions.watch': {
    params: {};
    data: AuctionResult[];
  };
  'margin.watch': {
    params: {};
    data: MarginWatchResult[];
  };
  'orderbook.{instrument_name}.{group}.{depth}': {
    params: {
      instrument_name: string;
      group: '1' | '10' | '100';
      depth: '1' | '10' | '20' | '100';
    };
    data: OrderbookSnapshot;
  };
  'spot_feed.{currency}': {
    params: {
      currency: string;
    };
    data: SpotFeedPayload;
  };
  'ticker_slim.{instrument_name}.{interval}': {
    params: {
      instrument_name: string;
      interval: '100' | '1000';
    };
    data: TickerSlimPayload;
  };
  'trades.{instrument_name}': {
    params: {
      instrument_name: string;
    };
    data: TradePublicResponseDoc[];
  };
  'trades.{instrument_type}.{currency}': {
    params: {
      instrument_type: 'erc20' | 'option' | 'perp';
      currency: string;
    };
    data: TradePublicResponseDoc[];
  };
  'trades.{instrument_type}.{currency}.{batch_status}': {
    params: {
      instrument_type: 'erc20' | 'option' | 'perp';
      currency: string;
      batch_status:
        | 'Batching'
        | 'Executing'
        | 'Proving'
        | 'Settling'
        | 'Settled'
        | 'BatchingError'
        | 'ExecutingError'
        | 'ProvingError'
        | 'SettlingError'
        | 'SettledError';
    };
    data: TradeSettledPublicResponse[];
  };
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "BalanceUpdate".
 */
export interface BalanceUpdate {
  name: string;
  new_balance: string;
  previous_balance: string;
  update_type: BalanceUpdateType;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "BestQuoteChannelResult".
 */
export interface BestQuoteChannelResult {
  error?: RPCError | null;
  result?: RfqGetBestQuoteWireResponse | null;
  rfq_id: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuotePublishResult".
 */
export interface QuotePublishResult {
  batch_status?: BatchStatus | null;
  cancel_reason?: RFQCancelReason | null;
  creation_timestamp: number;
  direction: Direction;
  extra_fee: string;
  fee: string;
  fill_pct: string;
  is_transfer: boolean;
  label: string;
  last_update_timestamp: number;
  legs: PricedLegParamsAndResponse[];
  legs_hash: string;
  liquidity_role: LiquidityRole;
  max_fee: string;
  mmp: boolean;
  nonce: string;
  quote_id: string;
  rfq_id: string;
  signature: string;
  signature_expiry_sec: number;
  signer: string;
  status: RFQStatus;
  subaccount_id: number;
  tx_hash?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AuctionResult".
 */
export interface AuctionResult {
  details?: AuctionDetails | null;
  state: AuctionStateType;
  subaccount_id: number;
  timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AuctionDetails".
 */
export interface AuctionDetails {
  currency?: string | null;
  estimated_bid_price: string;
  estimated_discount_pnl: string;
  estimated_mtm: string;
  estimated_percent_bid: string;
  last_seen_trade_id: number;
  margin_type: string;
  min_cash_transfer: string;
  min_price_limit: string;
  subaccount_balances: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MarginWatchResult".
 */
export interface MarginWatchResult {
  collaterals: unknown[];
  currency: string;
  initial_margin: string;
  maintenance_margin: string;
  margin_type: string;
  positions: unknown[];
  subaccount_id: number;
  subaccount_value: string;
  valuation_timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderbookSnapshot".
 */
export interface OrderbookSnapshot {
  asks: OrderSnapshot[];
  bids: OrderSnapshot[];
  instrument_name: string;
  publish_id: number;
  timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderSnapshot".
 */
export interface OrderSnapshot {
  amount: string;
  price: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SpotFeedPayload".
 */
export interface SpotFeedPayload {
  feeds: {
    [k: string]: SpotFeedEntry;
  };
  timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SpotFeedEntry".
 */
export interface SpotFeedEntry {
  confidence: string;
  confidence_prev_daily: string;
  price: string;
  price_prev_daily: string;
  timestamp_prev_daily: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TickerSlimPayload".
 */
export interface TickerSlimPayload {
  instrument_ticker: TickerSlimSnapshot;
  timestamp: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TradePublicResponseDoc".
 */
export interface TradePublicResponseDoc {
  direction: Direction2;
  index_price: string;
  instrument_name: string;
  mark_price: string;
  quote_id?: string | null;
  rfq_id?: string | null;
  timestamp: number;
  trade_amount: string;
  trade_id: string;
  trade_price: string;
}
