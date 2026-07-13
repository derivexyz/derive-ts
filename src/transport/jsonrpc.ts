import { DeriveRpcError } from '../errors';
import { isPublicApiMethod, WS_CONTROL_METHODS } from '../methodGuard';

export interface RpcErrorShape {
  code: number;
  message: string;
  data?: unknown;
}

/** The raw JSON-RPC response envelope as it arrives off the wire. */
export interface RawRpcResponse {
  id?: number | string | null;
  result?: unknown;
  error?: RpcErrorShape;
}

/**
 * A well-formed public method is `namespace/name`, both lowercase
 * snake-case. Rejecting anything else stops a crafted string containing
 * path traversal from escaping the path when the HTTP transport
 * interpolates the method into the request URL.
 */
const METHOD_FORMAT = /^[a-z]+\/[a-z0-9_]+$/;

/**
 * Runtime companion to the compile-time EndpointMap restriction: even a
 * raw string can only address a `public/`/`private/` method, and can never
 * escape the request path, through the SDK.
 */
export function assertPublicMethod(method: string): void {
  if (WS_CONTROL_METHODS.has(method)) return;
  if (!METHOD_FORMAT.test(method)) {
    throw new Error(`invalid method '${method}': expected the form namespace/name`);
  }
  if (!isPublicApiMethod(method)) {
    throw new Error(`${method} is not part of the public Derive API`);
  }
}

/** Unwraps a JSON-RPC response, throwing `DeriveRpcError` on the error variant. */
export function unwrapResponse<T>(method: string, raw: RawRpcResponse): T {
  if (raw.error) throw new DeriveRpcError(method, raw.error);
  if (!('result' in raw)) throw new Error(`${method}: malformed response — neither result nor error present`);
  return raw.result as T;
}
