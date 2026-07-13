import type { AuthCredentials } from '../auth/auth';
import type { Logger, NetworkConfig } from '../config/types';
import type { ParamsOf, ResultFor, RpcMethod } from '../types';

/**
 * What every API namespace needs from the client: the network config,
 * a typed RPC pipe, and the signing identities. Kept as an interface so
 * namespaces stay independently testable.
 */
export interface ClientContext {
  network: NetworkConfig;
  logger: Logger;
  send<M extends RpcMethod>(method: M, params: ParamsOf<M>): Promise<ResultFor<M>>;
  /**
   * The acting identity: the account owner's address (the `owner` field
   * of every signed action) plus the wallet that signs requests and
   * actions — the session key when configured, otherwise the owner.
   */
  credentials(): AuthCredentials;
}
