/**
 * The endpoint map — request/response type for every public RPC method,
 * keyed by method string. Import this to get fully-typed params/results
 * without pulling in the runtime client. See the "Type-only usage" README section.
 */
import type { EndpointMap } from '../generated';
import type { RequestParamsType, ResultOf } from '../helpers';

export type { EndpointMap };

/** Every public RPC method literal. */
export type RpcMethod = keyof EndpointMap & string;
/** Request params type for a method. */
export type ParamsOf<M extends RpcMethod> = RequestParamsType<EndpointMap[M]>;
/** Result payload type for a method. */
export type ResultFor<M extends RpcMethod> = ResultOf<EndpointMap[M]>;
