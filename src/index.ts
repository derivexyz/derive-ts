export { SDK_VERSION } from './version';

export { DeriveClient } from './client';
export type { ClientContext } from './api/context';
export { MarketDataApi } from './api/marketData';
export { SubaccountsApi } from './api/subaccounts';
export { OrdersApi, type PlaceOrderParams } from './api/orders';
export { RfqApi, type RfqLeg, type PricedRfqLeg, type SendQuoteParams, type ExecuteQuoteParams } from './api/rfq';
export { PositionTransfersApi, type PositionTransferLeg, type TransferPositionsParams } from './api/positionTransfers';
export {
  SpotTransfersApi,
  type ExternalSpotTransferParams,
  type InternalSpotTransferParams,
  type SpotAssetInfo,
} from './api/spotTransfers';
export { WithdrawalsApi } from './api/withdrawals';
export { ContractCallDeposits, DepositAddressDeposits, DepositsApi } from './api/deposits';
export {
  CuratorVaultsApi,
  ShareholderVaultsApi,
  VaultsApi,
  type BurnVaultSharesRequest,
  type CreateVaultRequest,
  type MintVaultSharesRequest,
  type UpdateVaultInfoRequest,
  type VaultCancelRequest,
  type VaultDepositRequest,
  type VaultWithdrawRequest,
} from './api/vaults';
export { SessionKeysApi, type CreateSessionKeyParams } from './api/sessionKeys';
export { OffchainScope, ProtocolScopeCode, ProtocolScopeWireString } from './auth/scopes';
export { authHeaders, loginParams, type AuthCredentials, type AuthSigner } from './auth/auth';
export { channel, type TypedChannel } from './subscriptions/channels';
export { Subscriptions, type Subscription } from './subscriptions/subscriptions';
export { NETWORKS, resolveNetwork } from './config/networks';
export type {
  ContractAddresses,
  DeriveClientOptions,
  Logger,
  ModuleAddresses,
  NetworkConfig,
  NetworkName,
} from './config/types';
export { DeriveConnectionError, DeriveRpcError, DeriveTimeoutError } from './errors';
export { SignedAction, type ActionFields } from './signing/action';
export { ACTION_TYPEHASH, domainSeparator } from './signing/eip712';
export { expiresIn, randomNonce, toE18, toScaled, type DecimalLike } from './signing/encoding';
export { V3_MODULE_ADDRESSES } from './signing/modules';
export type { WebSocketFactory, WebSocketLike } from './transport/ws';
export type { ChannelSchemaMap, ChannelTemplate, EndpointMap, ParamsOf, ResultFor, RpcMethod } from './types';
