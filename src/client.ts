import { Wallet, type BaseWallet } from 'ethers';
import { DepositsApi } from './api/deposits';
import { MarketDataApi } from './api/marketData';
import { OnchainActionsApi } from './api/onchainActions';
import { OrdersApi } from './api/orders';
import { PositionTransfersApi } from './api/positionTransfers';
import { RfqApi } from './api/rfq';
import { SessionKeysApi } from './api/sessionKeys';
import { SpotTransfersApi } from './api/spotTransfers';
import { SubaccountsApi } from './api/subaccounts';
import { VaultsApi } from './api/vaults';
import { WithdrawalsApi } from './api/withdrawals';
import { authHeaders, loginParams, type AuthCredentials } from './auth/auth';
import { resolveNetwork } from './config/networks';
import type { DeriveClientOptions, Logger, NetworkConfig } from './config/types';
import { Subscriptions } from './subscriptions/subscriptions';
import { HttpTransport } from './transport/http';
import { WsTransport } from './transport/ws';
import type { ParamsOf, ResultFor, RpcMethod } from './types';

const noopLogger: Logger = () => {};

function toWallet(input: string | BaseWallet | undefined): BaseWallet | undefined {
  return typeof input === 'string' ? new Wallet(input) : input;
}

export class DeriveClient {
  readonly network: NetworkConfig;
  readonly ws: WsTransport;
  readonly http: HttpTransport;

  readonly marketData: MarketDataApi;
  readonly subaccounts: SubaccountsApi;
  readonly orders: OrdersApi;
  readonly rfq: RfqApi;
  readonly spotTransfers: SpotTransfersApi;
  readonly positionTransfers: PositionTransfersApi;
  readonly withdrawals: WithdrawalsApi;
  readonly deposits: DepositsApi;
  readonly vaults: VaultsApi;
  readonly sessionKeys: SessionKeysApi;
  readonly onchainActions: OnchainActionsApi;
  readonly subscriptions: Subscriptions;

  readonly logger: Logger;
  private readonly owner?: BaseWallet;
  private readonly sessionKey?: BaseWallet;
  private readonly accountOwner?: string;
  private loggedIn = false;

  constructor(options: DeriveClientOptions) {
    this.network = resolveNetwork(options.network);
    this.logger = options.logger ?? noopLogger;
    this.owner = toWallet(options.wallet);
    this.sessionKey = toWallet(options.sessionKey);
    this.accountOwner = options.ownerAddress ?? this.owner?.address;
    if (this.sessionKey && !this.accountOwner) {
      throw new Error('a session key acts for an account owner — also pass `wallet` or `ownerAddress`');
    }

    const timeoutMs = options.requestTimeoutMs ?? 20_000;
    this.http = new HttpTransport({
      baseUrl: this.network.httpUrl,
      timeoutMs,
      logger: this.logger,
      authHeaders: () => authHeaders(this.credentials()),
    });
    this.ws = new WsTransport({
      url: this.network.wsUrl,
      timeoutMs,
      logger: this.logger,
      wsFactory: options.wsFactory,
    });
    this.ws.onReconnected = async () => {
      if (this.loggedIn) await this.login();
      await this.subscriptions.resubscribeAll();
    };

    this.marketData = new MarketDataApi(this);
    this.subaccounts = new SubaccountsApi(this);
    this.orders = new OrdersApi(this, this.marketData);
    this.rfq = new RfqApi(this);
    this.spotTransfers = new SpotTransfersApi(this);
    this.positionTransfers = new PositionTransfersApi(this);
    this.withdrawals = new WithdrawalsApi(this);
    this.deposits = new DepositsApi(this);
    this.vaults = new VaultsApi(this);
    this.sessionKeys = new SessionKeysApi(this);
    this.onchainActions = new OnchainActionsApi(this);
    this.subscriptions = new Subscriptions(this, this.ws);
  }

  /**
   * The identity requests act as: the owner address plus whichever
   * wallet signs (session key when configured, otherwise the owner).
   */
  credentials(): AuthCredentials {
    const signer = this.sessionKey ?? this.owner;
    if (!signer || !this.accountOwner) {
      throw new Error('this operation requires authentication — construct DeriveClient with a wallet or session key');
    }
    return { ownerAddress: this.accountOwner, signer };
  }

  /** Opens the websocket. REST-only usage can skip this. */
  async connect(): Promise<void> {
    await this.ws.connect();
  }

  /**
   * Authenticates the websocket connection (REST requests instead carry
   * signed headers per request). Re-runs automatically after reconnects.
   */
  async login(): Promise<ResultFor<'public/login'>> {
    if (!this.ws.connected) {
      throw new Error('login runs over the websocket — call connect() first');
    }
    const result = await this.ws.send('public/login', await loginParams(this.credentials()));
    this.loggedIn = true;
    return result;
  }

  async close(): Promise<void> {
    this.loggedIn = false;
    await this.ws.close();
  }

  /**
   * Typed escape hatch for any public RPC method: uses the websocket
   * when connected, REST otherwise.
   */
  send<M extends RpcMethod>(method: M, params: ParamsOf<M>): Promise<ResultFor<M>> {
    return this.ws.connected ? this.ws.send(method, params) : this.http.send(method, params);
  }
}
