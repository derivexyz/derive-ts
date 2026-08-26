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
  | 'compliance'
  | 'validation_failed';
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
 * via the `definition` "JSONRPCResponse_for_SubaccountValueHistoryResult".
 */
export type JSONRPCResponseFor_SubaccountValueHistoryResult = JSONRPCResponseFor_SubaccountValueHistoryResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_SubaccountValueHistoryResult1 =
  | {
      result: SubaccountValueHistoryResult;
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
 * via the `definition` "JSONRPCResponse_for_PrivateLiquidateEdgeRpcResponse".
 */
export type JSONRPCResponseFor_PrivateLiquidateEdgeRpcResponse = JSONRPCResponseFor_PrivateLiquidateEdgeRpcResponse1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_PrivateLiquidateEdgeRpcResponse1 =
  | {
      result: PrivateLiquidateEdgeRpcResponse;
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
 * via the `definition` "JSONRPCResponse_for_PrivateSetSessionKeyEdgeRPCResponse".
 */
export type JSONRPCResponseFor_PrivateSetSessionKeyEdgeRPCResponse =
  JSONRPCResponseFor_PrivateSetSessionKeyEdgeRPCResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PrivateSetSessionKeyEdgeRPCResponse1 =
  | {
      result: PrivateSetSessionKeyEdgeRPCResponse;
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
 * via the `definition` "JSONRPCResponse_for_LiquidationHistoryResult".
 */
export type JSONRPCResponseFor_LiquidationHistoryResult = JSONRPCResponseFor_LiquidationHistoryResult1 & {
  id: JsonRpcId;
};
export type JSONRPCResponseFor_LiquidationHistoryResult1 =
  | {
      result: LiquidationHistoryResult;
    }
  | {
      error: RPCError;
    };
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AuctionType".
 */
export type AuctionType = 'solvent' | 'insolvent';
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
export type OffchainKeyScope = 'account_info';
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
 * via the `definition` "JSONRPCResponse_for_PublicStartAuctionEdgeRpcResponse".
 */
export type JSONRPCResponseFor_PublicStartAuctionEdgeRpcResponse =
  JSONRPCResponseFor_PublicStartAuctionEdgeRpcResponse1 & {
    id: JsonRpcId;
  };
export type JSONRPCResponseFor_PublicStartAuctionEdgeRpcResponse1 =
  | {
      result: PublicStartAuctionEdgeRpcResponse;
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
 * via the `definition` "LiquidityRole2".
 */
export type LiquidityRole2 = 'maker' | 'taker';
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
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RpcErrorCatalog".
 */
export type RpcErrorCatalog =
  | ParseError
  | InternalError
  | InvalidParams
  | MethodNotFound
  | InvalidRequest
  | ConcurrentWsClientExceeded
  | RateLimitExceeded
  | Unauthorized
  | Forbidden
  | RestrictedRegion
  | FeedsNotFound
  | CounterpartyInsufficientFunds
  | CounterpartyMaxFeeTooLow
  | OrderConfirmationTimeout
  | EngineConfirmationTimeout
  | AssetNotErc20
  | SameAccountTransfer
  | MultipleCurrenciesNotSupported
  | MaxSessionKeysPerWallet
  | MaxAssetsPerSubaccountExceeded
  | PmrmOnlySupportsQuoteAsset
  | Pm2OnlySupportSingleCurrencyOptionsAndPerps
  | Pm2DoesNotSupportThisCollateral
  | InsufficientFunds
  | OrderDoesNotExist
  | SelfCrossingDisallowed
  | PostOnlyReject
  | ZeroLiquidityForTakerOrder
  | OrderInvalidSignatureExpiry
  | InvalidAmount
  | OrderInvalidLimitPrice
  | FokNotFilled
  | MmpFrozen
  | NonUniqueNonce
  | OrderInvalidNonce
  | TooManyOrders
  | NegativeErc20Balance
  | InstrumentNotLive
  | RejectTimestampExceeded
  | MaxFeeTooLow
  | ReduceOnlyNotSupported
  | ReduceOnlyReject
  | UndergoingLiquidation
  | ReplaceOrderFilledAmountMismatch
  | OiCapExceeded
  | FeeConsumesAmount
  | WithdrawalRoundsToZero
  | TransferBelowMin
  | TransferNotWhitelisted
  | WithdrawalsBlockedInsolventAuction
  | NonIncreasingNonce
  | NonceOutsideWindow
  | NewSubaccountInFallbackUniverse
  | DepositBelowSubaccountCreationFee
  | TriggerOrderAlreadyCancelledOrExpired
  | InvalidTriggerPrice
  | TooManyTriggerOrders
  | TriggerPriceTypeNotSupported
  | CannotReplaceOrBeReplacedByTriggerOrders
  | UnfillableMarketTriggerOrder
  | LegInstrumentsNotUnique
  | RfqNotFound
  | QuoteNotFound
  | QuoteLegMismatchVsRfq
  | QuoteRfqNotOpen
  | QuoteRfqIdMismatch
  | RfqInvalidCounterparty
  | QuoteMakerCostTooHigh
  | RfqPartialFillPctTooHigh
  | RfqFilledDirectionCannotBeChanged
  | QuoteTakerCostTooHigh
  | RfqDisabledForAccount
  | RfqTooManyLegs
  | RfqTooManyCounterparties
  | InstrumentNotFound
  | CurrencyNotFound
  | AssetNotFound
  | InvalidChannels
  | AccountNotFound
  | SubaccountNotFound
  | StringIsNotEthereumAddress
  | InvalidSignature
  | AuthHeaderMismatch
  | IpNotWhitelisted
  | InvalidSigner
  | SessionKeyNotFound
  | UnauthorizedAsRfqMaker
  | CrossCurrencyRfqNotSupported
  | SessionKeyExpired
  | UnauthorizedKeyScope
  | AccountNotAtomicWhitelisted
  | SessionKeyAlreadyRegistered
  | MalformedSignature
  | ModuleMismatch
  | ActionOutlivesSessionKey
  | SessionKeyValidityTooShort
  | AccountDisabled
  | OfacBlocked
  | CrossUniverseTrade
  | UnknownRiskUniverse
  | ManagerCannotRiskCurrency
  | AssetNotInRiskUniverse
  | VaultNotFound
  | ExceededMaxUserRequests
  | MaxShareholderVaultsReached
  | VaultClosed
  | VaultCooldownActive
  | VaultCreationDepositBelowMin
  | VaultCuratorStakeBelowMin
  | VaultSlippageExceeded
  | VaultAmountBelowMin
  | VaultSignatureExpiryTooLong
  | VaultBenchmarkPriceUnavailable
  | VaultInitialSharePriceTooFarFromBenchmark
  | VaultDepositExceedsMargin
  | ProtocolReject;

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
  'private/get_subaccount_value_history': {
    request: JsonRpcRequestFor_GetSubaccountValueHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_SubaccountValueHistoryResult;
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
  'private/liquidate': {
    request: JsonRpcRequestFor_PrivateLiquidateEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateLiquidateEdgeRpcResponse;
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
  'private/set_session_key': {
    request: JsonRpcRequestFor_SetSessionKeyEdgeRpcParams;
    response: JSONRPCResponseFor_PrivateSetSessionKeyEdgeRPCResponse;
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
  'public/get_liquidation_history': {
    request: JsonRpcRequestFor_GetLiquidationHistoryEdgeRpcParams;
    response: JSONRPCResponseFor_LiquidationHistoryResult;
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
  'public/start_auction': {
    request: JsonRpcRequestFor_PublicStartAuctionEdgeRpcParams;
    response: JSONRPCResponseFor_PublicStartAuctionEdgeRpcResponse;
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
  fallback_subaccount_id: number;
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
  whitelisted_recipients: string[];
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
  mm_credits: string;
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
 * via the `definition` "JsonRpcRequest_for_GetSubaccountValueHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetSubaccountValueHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/get_subaccount_value_history';
  params: GetSubaccountValueHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetSubaccountValueHistoryEdgeRpcParams".
 */
export interface GetSubaccountValueHistoryEdgeRpcParams {
  end_timestamp?: number | null;
  page?: number | null;
  page_size?: number | null;
  period?: number | null;
  start_timestamp?: number | null;
  subaccount_id?: number | null;
  wallet?: string | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SubaccountValueHistoryResult".
 */
export interface SubaccountValueHistoryResult {
  pagination: PaginationInfo;
  subaccount_value_history: SubaccountValueEntry[];
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SubaccountValueEntry".
 */
export interface SubaccountValueEntry {
  currency: string;
  initial_margin: string;
  maintenance_margin: string;
  margin_type: string;
  subaccount_id: number;
  subaccount_value: string;
  timestamp: number;
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
 * via the `definition` "JsonRpcRequest_for_PrivateLiquidateEdgeRpcParams".
 */
export interface JsonRpcRequestFor_PrivateLiquidateEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/liquidate';
  params: PrivateLiquidateEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateLiquidateEdgeRpcParams".
 */
export interface PrivateLiquidateEdgeRpcParams {
  liquidate_subaccount_id: number;
  nonce: number;
  percent_of_acc: string;
  price_limit: string;
  signature: string;
  signature_expiry_sec: number;
  signer: string;
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PrivateLiquidateEdgeRpcResponse".
 */
export interface PrivateLiquidateEdgeRpcResponse {
  op_uuid: string;
  operation_id: number;
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
 * via the `definition` "JsonRpcRequest_for_SetSessionKeyEdgeRpcParams".
 */
export interface JsonRpcRequestFor_SetSessionKeyEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'private/set_session_key';
  params: SetSessionKeyEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SetSessionKeyEdgeRpcParams".
 */
export interface SetSessionKeyEdgeRpcParams {
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
 * via the `definition` "PrivateSetSessionKeyEdgeRPCResponse".
 */
export interface PrivateSetSessionKeyEdgeRPCResponse {
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
  recipient?: string | null;
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
  funding_data: {
    [k: string]: FundingFeedDataResponse;
  };
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
 * via the `definition` "FundingFeedDataResponse".
 */
export interface FundingFeedDataResponse {
  confidence: string;
  currency: string;
  deadline: number;
  funding_rate: string;
  signatures: OracleSignatureDataResponse;
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
 * via the `definition` "JsonRpcRequest_for_GetLiquidationHistoryEdgeRpcParams".
 */
export interface JsonRpcRequestFor_GetLiquidationHistoryEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/get_liquidation_history';
  params: GetLiquidationHistoryEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "GetLiquidationHistoryEdgeRpcParams".
 */
export interface GetLiquidationHistoryEdgeRpcParams {
  end_timestamp?: number | null;
  page?: number | null;
  page_size?: number | null;
  start_timestamp?: number | null;
  subaccount_id?: number | null;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "LiquidationHistoryResult".
 */
export interface LiquidationHistoryResult {
  auctions: AuctionHistory[];
  pagination: PaginationInfo;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AuctionHistory".
 */
export interface AuctionHistory {
  auction_id: string;
  auction_type: AuctionType;
  bids: AuctionBidEvent[];
  end_timestamp?: number | null;
  fee: string;
  start_timestamp: number;
  subaccount_id: number;
  tx_hash: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AuctionBidEvent".
 */
export interface AuctionBidEvent {
  amounts_liquidated: {
    [k: string]: string;
  };
  cash_received: string;
  discount_pnl: string;
  percent_liquidated: string;
  positions_realized_pnl: {
    [k: string]: string;
  };
  positions_realized_pnl_excl_fees: {
    [k: string]: string;
  };
  realized_pnl: string;
  realized_pnl_excl_fees: string;
  timestamp: number;
  tx_hash: string;
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
 * via the `definition` "JsonRpcRequest_for_PublicStartAuctionEdgeRpcParams".
 */
export interface JsonRpcRequestFor_PublicStartAuctionEdgeRpcParams {
  headers?: {
    [k: string]: unknown;
  } | null;
  id: JsonRpcId;
  method: 'public/start_auction';
  params: PublicStartAuctionEdgeRpcParams;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PublicStartAuctionEdgeRpcParams".
 */
export interface PublicStartAuctionEdgeRpcParams {
  subaccount_id: number;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PublicStartAuctionEdgeRpcResponse".
 */
export interface PublicStartAuctionEdgeRpcResponse {
  op_uuid: string;
  operation_id: number;
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
  recipient?: string | null;
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
    data: OrderbookPayloadDoc;
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
  margin_type: string;
  min_price_limit: string;
  subaccount_balances: {
    [k: string]: string;
  };
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
 * via the `definition` "OrderbookPayloadDoc".
 */
export interface OrderbookPayloadDoc {
  asks: [string, string][];
  bids: [string, string][];
  instrument_name: string;
  publish_id: number;
  timestamp: number;
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
  expected_rebate: string;
  extra_fee: string;
  index_price: string;
  instrument_name: string;
  liquidity_role: LiquidityRole2;
  mark_price: string;
  quote_id?: string | null;
  realized_pnl: string;
  realized_pnl_excl_fees: string;
  rfq_id?: string | null;
  subaccount_id: number;
  timestamp: number;
  trade_amount: string;
  trade_fee: string;
  trade_id: string;
  trade_price: string;
  wallet: string;
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ParseError".
 */
export interface ParseError {
  code: -32700;
  data?: string | null;
  message: 'Error parsing message';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InternalError".
 */
export interface InternalError {
  code: -32603;
  data?: string | null;
  message: 'Internal error';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InvalidParams".
 */
export interface InvalidParams {
  code: -32602;
  data?: string | null;
  message: 'Invalid params';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MethodNotFound".
 */
export interface MethodNotFound {
  code: -32601;
  data?: string | null;
  message: 'Method not found';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InvalidRequest".
 */
export interface InvalidRequest {
  code: -32600;
  data?: string | null;
  message: 'Invalid Request';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ConcurrentWsClientExceeded".
 */
export interface ConcurrentWsClientExceeded {
  code: -32100;
  data?: string | null;
  message: 'Number of concurrent websocket clients limit exceeded';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RateLimitExceeded".
 */
export interface RateLimitExceeded {
  code: -32000;
  data?: string | null;
  message: 'Rate limit exceeded';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "Unauthorized".
 */
export interface Unauthorized {
  code: 401;
  data?: string | null;
  message: 'Unauthorized';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "Forbidden".
 */
export interface Forbidden {
  code: 403;
  data?: string | null;
  message: 'Forbidden';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RestrictedRegion".
 */
export interface RestrictedRegion {
  code: 403;
  data?: string | null;
  message: 'You are in a restricted region that violates our terms of service.';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "FeedsNotFound".
 */
export interface FeedsNotFound {
  code: 8200;
  data?: string | null;
  message: 'Feeds not found';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CounterpartyInsufficientFunds".
 */
export interface CounterpartyInsufficientFunds {
  code: 8500;
  data?: string | null;
  message: 'Counterparty insufficient funds';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CounterpartyMaxFeeTooLow".
 */
export interface CounterpartyMaxFeeTooLow {
  code: 8501;
  data?: string | null;
  message: 'Max fee for one or more counterparties is too low';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderConfirmationTimeout".
 */
export interface OrderConfirmationTimeout {
  code: 9000;
  data?: string | null;
  message: 'Order confirmation timeout';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "EngineConfirmationTimeout".
 */
export interface EngineConfirmationTimeout {
  code: 9001;
  data?: string | null;
  message: 'Engine confirmation timeout';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AssetNotErc20".
 */
export interface AssetNotErc20 {
  code: 10001;
  data?: string | null;
  message: 'Asset is not an ERC20 token';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SameAccountTransfer".
 */
export interface SameAccountTransfer {
  code: 10003;
  data?: string | null;
  message: 'Sender and recipient subaccount IDs are the same';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MultipleCurrenciesNotSupported".
 */
export interface MultipleCurrenciesNotSupported {
  code: 10004;
  data?: string | null;
  message: 'Multiple currencies not supported';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MaxSessionKeysPerWallet".
 */
export interface MaxSessionKeysPerWallet {
  code: 10006;
  data?: string | null;
  message: 'Maximum number of session keys per wallet reached';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MaxAssetsPerSubaccountExceeded".
 */
export interface MaxAssetsPerSubaccountExceeded {
  code: 10007;
  data?: string | null;
  message: 'Maximum number of assets per subaccount reached';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PmrmOnlySupportsQuoteAsset".
 */
export interface PmrmOnlySupportsQuoteAsset {
  code: 10010;
  data?: string | null;
  message: 'PMRM only supports USDC asset collateral. Cannot trade spot markets.';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "Pm2OnlySupportSingleCurrencyOptionsAndPerps".
 */
export interface Pm2OnlySupportSingleCurrencyOptionsAndPerps {
  code: 10015;
  data?: string | null;
  message: 'PortfolioMargin2 supports multiple collaterals but only options and perps of the same currency';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "Pm2DoesNotSupportThisCollateral".
 */
export interface Pm2DoesNotSupportThisCollateral {
  code: 10016;
  data?: string | null;
  message: 'PortfolioMargin2 does not support this collateral. Please use a subaccount with Portfolio Manager that supports this currency or Standard Manager.';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InsufficientFunds".
 */
export interface InsufficientFunds {
  code: 11000;
  data?: string | null;
  message: 'Insufficient funds';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderDoesNotExist".
 */
export interface OrderDoesNotExist {
  code: 11006;
  data?: string | null;
  message: 'Does not exist';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SelfCrossingDisallowed".
 */
export interface SelfCrossingDisallowed {
  code: 11007;
  data?: string | null;
  message: 'Self-crossing disallowed';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "PostOnlyReject".
 */
export interface PostOnlyReject {
  code: 11008;
  data?: string | null;
  message: 'Post only order cannot cross the market';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ZeroLiquidityForTakerOrder".
 */
export interface ZeroLiquidityForTakerOrder {
  code: 11009;
  data?: string | null;
  message: 'Zero liquidity for market or IOC/FOK order';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderInvalidSignatureExpiry".
 */
export interface OrderInvalidSignatureExpiry {
  code: 11011;
  data?: string | null;
  message: 'Invalid signature expiry';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InvalidAmount".
 */
export interface InvalidAmount {
  code: 11012;
  data?: string | null;
  message: 'Invalid amount';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderInvalidLimitPrice".
 */
export interface OrderInvalidLimitPrice {
  code: 11013;
  data?: string | null;
  message: 'Invalid limit price';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "FokNotFilled".
 */
export interface FokNotFilled {
  code: 11014;
  data?: string | null;
  message: 'Fill-or-kill not filled';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MmpFrozen".
 */
export interface MmpFrozen {
  code: 11015;
  data?: string | null;
  message: 'MMP frozen';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "NonUniqueNonce".
 */
export interface NonUniqueNonce {
  code: 11017;
  data?: string | null;
  message: 'Non unique nonce';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OrderInvalidNonce".
 */
export interface OrderInvalidNonce {
  code: 11018;
  data?: string | null;
  message: 'Invalid nonce date';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TooManyOrders".
 */
export interface TooManyOrders {
  code: 11019;
  data?: string | null;
  message: 'Open orders limit exceeded';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "NegativeErc20Balance".
 */
export interface NegativeErc20Balance {
  code: 11020;
  data?: string | null;
  message: 'Negative ERC20 balance';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InstrumentNotLive".
 */
export interface InstrumentNotLive {
  code: 11021;
  data?: string | null;
  message: 'Instrument is not live';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RejectTimestampExceeded".
 */
export interface RejectTimestampExceeded {
  code: 11022;
  data?: string | null;
  message: 'Reject timestamp exceeded';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MaxFeeTooLow".
 */
export interface MaxFeeTooLow {
  code: 11023;
  data?: string | null;
  message: 'Max fee order param is too low';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ReduceOnlyNotSupported".
 */
export interface ReduceOnlyNotSupported {
  code: 11024;
  data?: string | null;
  message: 'Reduce only not supported with this time in force';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ReduceOnlyReject".
 */
export interface ReduceOnlyReject {
  code: 11025;
  data?: string | null;
  message: 'Reduce only reject';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "UndergoingLiquidation".
 */
export interface UndergoingLiquidation {
  code: 11027;
  data?: string | null;
  message: 'Subaccount undergoing liquidation';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ReplaceOrderFilledAmountMismatch".
 */
export interface ReplaceOrderFilledAmountMismatch {
  code: 11028;
  data?: string | null;
  message: 'Replaced order filled amount does not match expected state.';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OiCapExceeded".
 */
export interface OiCapExceeded {
  code: 11029;
  data?: string | null;
  message: 'Trade or transfer rejected: open interest cap would be exceeded';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "FeeConsumesAmount".
 */
export interface FeeConsumesAmount {
  code: 11030;
  data?: string | null;
  message: 'Fee consumes entire amount';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "WithdrawalRoundsToZero".
 */
export interface WithdrawalRoundsToZero {
  code: 11031;
  data?: string | null;
  message: 'Withdrawal rounds to zero';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TransferBelowMin".
 */
export interface TransferBelowMin {
  code: 11032;
  data?: string | null;
  message: 'Transfer below minimum';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TransferNotWhitelisted".
 */
export interface TransferNotWhitelisted {
  code: 11033;
  data?: string | null;
  message: 'Transfer recipient not whitelisted';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "WithdrawalsBlockedInsolventAuction".
 */
export interface WithdrawalsBlockedInsolventAuction {
  code: 11034;
  data?: string | null;
  message: 'Withdrawals blocked by insolvent auction';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "NonIncreasingNonce".
 */
export interface NonIncreasingNonce {
  code: 11035;
  data?: string | null;
  message: 'Non increasing nonce';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "NonceOutsideWindow".
 */
export interface NonceOutsideWindow {
  code: 11036;
  data?: string | null;
  message: 'Nonce outside valid window';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "NewSubaccountInFallbackUniverse".
 */
export interface NewSubaccountInFallbackUniverse {
  code: 11037;
  data?: string | null;
  message: 'Cannot create a new subaccount in the fallback risk universe';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "DepositBelowSubaccountCreationFee".
 */
export interface DepositBelowSubaccountCreationFee {
  code: 11038;
  data?: string | null;
  message: 'Deposit does not cover the subaccount creation fee';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TriggerOrderAlreadyCancelledOrExpired".
 */
export interface TriggerOrderAlreadyCancelledOrExpired {
  code: 11050;
  data?: string | null;
  message: 'Trigger order was cancelled between the time worker sent order and engine processed order';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InvalidTriggerPrice".
 */
export interface InvalidTriggerPrice {
  code: 11051;
  data?: string | null;
  message: 'Trigger price must be higher than the current price for stop orders and vice versa for take orders';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TooManyTriggerOrders".
 */
export interface TooManyTriggerOrders {
  code: 11052;
  data?: string | null;
  message: 'Trigger order limit exceeded (separate limit from regular orders)';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "TriggerPriceTypeNotSupported".
 */
export interface TriggerPriceTypeNotSupported {
  code: 11053;
  data?: string | null;
  message: 'Index and last-trade trigger price types not supported yet';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CannotReplaceOrBeReplacedByTriggerOrders".
 */
export interface CannotReplaceOrBeReplacedByTriggerOrders {
  code: 11054;
  data?: string | null;
  message: 'Trigger orders cannot replace or be replaced';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "UnfillableMarketTriggerOrder".
 */
export interface UnfillableMarketTriggerOrder {
  code: 11055;
  data?: string | null;
  message: 'Market order limit_price is unfillable at the given trigger price';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "LegInstrumentsNotUnique".
 */
export interface LegInstrumentsNotUnique {
  code: 11100;
  data?: string | null;
  message: 'Leg instruments are not unique';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RfqNotFound".
 */
export interface RfqNotFound {
  code: 11101;
  data?: string | null;
  message: 'RFQ not found';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteNotFound".
 */
export interface QuoteNotFound {
  code: 11102;
  data?: string | null;
  message: 'Quote not found';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteLegMismatchVsRfq".
 */
export interface QuoteLegMismatchVsRfq {
  code: 11103;
  data?: string | null;
  message: 'Quote leg does not match RFQ leg';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteRfqNotOpen".
 */
export interface QuoteRfqNotOpen {
  code: 11104;
  data?: string | null;
  message: 'Requested quote or RFQ is not open';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteRfqIdMismatch".
 */
export interface QuoteRfqIdMismatch {
  code: 11105;
  data?: string | null;
  message: 'Quote references a different RFQ than requested';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RfqInvalidCounterparty".
 */
export interface RfqInvalidCounterparty {
  code: 11106;
  data?: string | null;
  message: 'Invalid RFQ counterparty';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteMakerCostTooHigh".
 */
export interface QuoteMakerCostTooHigh {
  code: 11107;
  data?: string | null;
  message: 'Quote maker total cost too high';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RfqPartialFillPctTooHigh".
 */
export interface RfqPartialFillPctTooHigh {
  code: 11108;
  data?: string | null;
  message: 'RFQ partial fill percentage too high';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RfqFilledDirectionCannotBeChanged".
 */
export interface RfqFilledDirectionCannotBeChanged {
  code: 11109;
  data?: string | null;
  message: 'RFQ filled direction cannot be changed';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "QuoteTakerCostTooHigh".
 */
export interface QuoteTakerCostTooHigh {
  code: 11110;
  data?: string | null;
  message: 'Quote taker total cost too high';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RfqDisabledForAccount".
 */
export interface RfqDisabledForAccount {
  code: 11111;
  data?: string | null;
  message: 'RFQ functionality is disabled for this account';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RfqTooManyLegs".
 */
export interface RfqTooManyLegs {
  code: 11112;
  data?: string | null;
  message: 'RFQ has too many legs';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "RfqTooManyCounterparties".
 */
export interface RfqTooManyCounterparties {
  code: 11113;
  data?: string | null;
  message: 'RFQ has too many counterparties';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InstrumentNotFound".
 */
export interface InstrumentNotFound {
  code: 12001;
  data?: string | null;
  message: 'Instrument not found';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CurrencyNotFound".
 */
export interface CurrencyNotFound {
  code: 12002;
  data?: string | null;
  message: 'Currency not found';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AssetNotFound".
 */
export interface AssetNotFound {
  code: 12003;
  data?: string | null;
  message: 'Asset not found';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InvalidChannels".
 */
export interface InvalidChannels {
  code: 13000;
  data?: string | null;
  message: 'Invalid channels';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AccountNotFound".
 */
export interface AccountNotFound {
  code: 14000;
  data?: string | null;
  message: 'Account not found';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SubaccountNotFound".
 */
export interface SubaccountNotFound {
  code: 14001;
  data?: string | null;
  message: 'Subaccount not found';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "StringIsNotEthereumAddress".
 */
export interface StringIsNotEthereumAddress {
  code: 14013;
  data?: string | null;
  message: 'String is not a valid ethereum address';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InvalidSignature".
 */
export interface InvalidSignature {
  code: 14014;
  data?: string | null;
  message: 'Signature invalid for message or transaction';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AuthHeaderMismatch".
 */
export interface AuthHeaderMismatch {
  code: 14020;
  data?: string | null;
  message: 'The X-DeriveWallet header does not match the requested subaccount_id or wallet';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "IpNotWhitelisted".
 */
export interface IpNotWhitelisted {
  code: 14021;
  data?: string | null;
  message: 'IP not whitelisted';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "InvalidSigner".
 */
export interface InvalidSigner {
  code: 14023;
  data?: string | null;
  message: 'Signer in on-chain related request is not wallet owner or registered session key';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SessionKeyNotFound".
 */
export interface SessionKeyNotFound {
  code: 14026;
  data?: string | null;
  message: 'Session key not found';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "UnauthorizedAsRfqMaker".
 */
export interface UnauthorizedAsRfqMaker {
  code: 14027;
  data?: string | null;
  message: 'Unauthorized as RFQ maker';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CrossCurrencyRfqNotSupported".
 */
export interface CrossCurrencyRfqNotSupported {
  code: 14028;
  data?: string | null;
  message: 'Cross currency RFQ not supported';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SessionKeyExpired".
 */
export interface SessionKeyExpired {
  code: 14030;
  data?: string | null;
  message: 'Session key expired';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "UnauthorizedKeyScope".
 */
export interface UnauthorizedKeyScope {
  code: 14031;
  data?: string | null;
  message: 'Unauthorized Key Scope';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AccountNotAtomicWhitelisted".
 */
export interface AccountNotAtomicWhitelisted {
  code: 14033;
  data?: string | null;
  message: 'Account not whitelisted for atomic orders';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SessionKeyAlreadyRegistered".
 */
export interface SessionKeyAlreadyRegistered {
  code: 14035;
  data?: string | null;
  message: 'Session key already registered';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MalformedSignature".
 */
export interface MalformedSignature {
  code: 14036;
  data?: string | null;
  message: 'Signature is malformed';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ModuleMismatch".
 */
export interface ModuleMismatch {
  code: 14037;
  data?: string | null;
  message: 'Action signed for the wrong module';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ActionOutlivesSessionKey".
 */
export interface ActionOutlivesSessionKey {
  code: 14038;
  data?: string | null;
  message: 'Action expiry exceeds session key expiry';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "SessionKeyValidityTooShort".
 */
export interface SessionKeyValidityTooShort {
  code: 14039;
  data?: string | null;
  message: 'Session key expires too soon';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AccountDisabled".
 */
export interface AccountDisabled {
  code: 16001;
  data?: string | null;
  message: 'Account is disabled due to compliance violations, please contact support to enable it.';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "OfacBlocked".
 */
export interface OfacBlocked {
  code: 16002;
  data?: string | null;
  message: 'Account is blocked due to OFAC compliance violations.';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "CrossUniverseTrade".
 */
export interface CrossUniverseTrade {
  code: 17000;
  data?: string | null;
  message: 'Instrument not supported by this manager / risk universe';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "UnknownRiskUniverse".
 */
export interface UnknownRiskUniverse {
  code: 17001;
  data?: string | null;
  message: 'Unknown risk universe';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ManagerCannotRiskCurrency".
 */
export interface ManagerCannotRiskCurrency {
  code: 17002;
  data?: string | null;
  message: "The subaccount's risk manager has no configuration for this currency and cannot margin a position in it";
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "AssetNotInRiskUniverse".
 */
export interface AssetNotInRiskUniverse {
  code: 17003;
  data?: string | null;
  message: 'Asset is not registered in the destination risk universe';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultNotFound".
 */
export interface VaultNotFound {
  code: 18007;
  data?: string | null;
  message: 'Vault not found';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ExceededMaxUserRequests".
 */
export interface ExceededMaxUserRequests {
  code: 18008;
  data?: string | null;
  message: 'Exceeded maximum number of pending vault requests';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "MaxShareholderVaultsReached".
 */
export interface MaxShareholderVaultsReached {
  code: 18009;
  data?: string | null;
  message: 'Exceeded maximum number of shareholder vaults';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultClosed".
 */
export interface VaultClosed {
  code: 18010;
  data?: string | null;
  message: 'Vault is closed';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultCooldownActive".
 */
export interface VaultCooldownActive {
  code: 18011;
  data?: string | null;
  message: 'Vault withdrawal cooldown active';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultCreationDepositBelowMin".
 */
export interface VaultCreationDepositBelowMin {
  code: 18012;
  data?: string | null;
  message: 'Vault creation deposit below minimum';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultCuratorStakeBelowMin".
 */
export interface VaultCuratorStakeBelowMin {
  code: 18013;
  data?: string | null;
  message: 'Curator stake below minimum';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultSlippageExceeded".
 */
export interface VaultSlippageExceeded {
  code: 18014;
  data?: string | null;
  message: 'Vault quote outside slippage band';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultAmountBelowMin".
 */
export interface VaultAmountBelowMin {
  code: 18015;
  data?: string | null;
  message: 'Vault amount below minimum';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultSignatureExpiryTooLong".
 */
export interface VaultSignatureExpiryTooLong {
  code: 18016;
  data?: string | null;
  message: 'Vault signature expiry too far out';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultBenchmarkPriceUnavailable".
 */
export interface VaultBenchmarkPriceUnavailable {
  code: 18017;
  data?: string | null;
  message: 'Vault HWM benchmark price unavailable';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultInitialSharePriceTooFarFromBenchmark".
 */
export interface VaultInitialSharePriceTooFarFromBenchmark {
  code: 18018;
  data?: string | null;
  message: 'Vault initial share price too far from benchmark';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "VaultDepositExceedsMargin".
 */
export interface VaultDepositExceedsMargin {
  code: 18019;
  data?: string | null;
  message: 'Insufficient margin for vault deposit';
}
/**
 * This interface was referenced by `DeriveApi`'s JSON-Schema
 * via the `definition` "ProtocolReject".
 */
export interface ProtocolReject {
  code: 20000;
  data?: string | null;
  message: 'Protocol rejected operation';
}
