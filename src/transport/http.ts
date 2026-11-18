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
    const timeout = AbortSignal.timeout(timeoutMs);
    let response: Response | undefined;
    let body: RawRpcResponse;
    try {
      response = await fetch(`${baseUrl}/${method}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
        // Never follow a redirect: it would forward the signed X-Derive*
        // auth headers to the redirect target.
        redirect: 'error',
        signal: timeout,
      });
      body = (await readJson(response, timeout)) as RawRpcResponse;
    } catch (cause) {
      if (timeout.aborted) {
        throw new DeriveTimeoutError(`${method}: no response within ${timeoutMs}ms`);
      }
      if (response) {
        throw new Error(`${method}: non-JSON response with HTTP status ${response.status}`, { cause });
      }
      throw cause;
    }
    logger('debug', `HTTP ${method} response (${response.status})`, body);
    return unwrapResponse<ResultFor<M>>(method, body);
  }
}

/**
 * Reads the JSON body and cancels the read at `timeout`. The fetch signal
 * does not always do this in Node after the response headers arrive.
 */
async function readJson(response: Response, timeout: AbortSignal): Promise<unknown> {
  const reader = response.body?.getReader();
  if (!reader) return response.json();

  // Cancel rejects if the body has failed already.
  const cancel = () => reader.cancel(timeout.reason).catch(() => {});
  timeout.addEventListener('abort', cancel, { once: true });
  try {
    const decoder = new TextDecoder();
    let text = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
    // A cancelled read ends the same way as a complete body.
    timeout.throwIfAborted();
    return JSON.parse(text + decoder.decode());
  } finally {
    timeout.removeEventListener('abort', cancel);
  }
}
