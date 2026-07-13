/** An error response returned by the exchange for a JSON-RPC request. */
export class DeriveRpcError extends Error {
  readonly code: number;
  readonly data: unknown;
  readonly method: string;

  constructor(method: string, error: { code: number; message: string; data?: unknown }) {
    super(
      `${method}: [${error.code}] ${error.message}${
        error.data !== undefined ? ` — ${JSON.stringify(error.data)}` : ''
      }`,
    );
    this.name = 'DeriveRpcError';
    this.method = method;
    this.code = error.code;
    this.data = error.data;
  }
}

/** A request that received no response within the transport timeout, or was in flight when the connection dropped. */
export class DeriveTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DeriveTimeoutError';
  }
}

/** A websocket connection failure (initial connect or reconnect exhaustion). */
export class DeriveConnectionError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'DeriveConnectionError';
  }
}
