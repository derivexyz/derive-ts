import type { Logger } from '../config/types';
import { DeriveTimeoutError } from '../errors';
import { SDK_VERSION } from '../version';
import { assertPublicMethod, unwrapResponse, type RawRpcResponse } from './jsonrpc';
import type { ParamsOf, ResultFor, RpcMethod } from '../types';

export interface HttpTransportOptions {
  baseUrl: string;
  timeoutMs: number;
  logger: Logger;
  /** Produces auth headers for private methods; absent for public-only clients. */
  authHeaders?: () => Promise<Record<string, string>>;
}

/**
 * REST transport: each method is POSTed to `<baseUrl>/<method>` with the
 * params object as the JSON body; the response body is the JSON-RPC
 * response envelope. Private methods carry signed auth headers.
 */
export class HttpTransport {
  constructor(private readonly options: HttpTransportOptions) {}

  async send<M extends RpcMethod>(method: M, params: ParamsOf<M>): Promise<ResultFor<M>> {
    assertPublicMethod(method);
    const { baseUrl, timeoutMs, logger, authHeaders } = this.options;
    const headers: Record<string, string> = {
      'content-type': 'application/json',
      // The API rejects UA-less requests; browsers ignore this
      // (the browser UA is a forbidden header) and send their own.
      'user-agent': `derive-ts/${SDK_VERSION}`,
    };
    if (method.startsWith('private/')) {
      if (!authHeaders) {
        throw new Error(`${method} requires authentication — construct the client with a wallet or session key`);
      }
      Object.assign(headers, await authHeaders());
    }

    logger('debug', `HTTP ${method}`, params);
    let response: Response;
    try {
      response = await fetch(`${baseUrl}/${method}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
        // Never follow a redirect: it would forward the signed X-Lyra*
        // auth headers to the redirect target.
        redirect: 'error',
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === 'TimeoutError') {
        throw new DeriveTimeoutError(`${method}: no response within ${timeoutMs}ms`);
      }
      throw cause;
    }

    let body: RawRpcResponse;
    try {
      body = (await response.json()) as RawRpcResponse;
    } catch {
      throw new Error(`${method}: non-JSON response with HTTP status ${response.status}`);
    }
    return unwrapResponse<ResultFor<M>>(method, body);
  }
}
