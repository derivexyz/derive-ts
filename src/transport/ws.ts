import type { Logger } from '../config/types';
import { DeriveConnectionError, DeriveTimeoutError } from '../errors';
import { assertPublicMethod, unwrapResponse, type RawRpcResponse } from './jsonrpc';
import type { ParamsOf, ResultFor, RpcMethod } from '../types';

/** The subset of the WebSocket interface the SDK relies on; satisfied by both `ws` and the browser WebSocket. */
export interface WebSocketLike {
  readonly readyState: number;
  send(data: string): void;
  close(code?: number, reason?: string): void;
  onopen: ((event?: unknown) => void) | null;
  onmessage: ((event: { data: unknown }) => void) | null;
  onclose: ((event: { code?: number; reason?: unknown }) => void) | null;
  onerror: ((event: unknown) => void) | null;
}

export type WebSocketFactory = (url: string) => WebSocketLike | Promise<WebSocketLike>;

const WS_OPEN = 1;
const RECONNECT_MAX_ATTEMPTS = 5;
const RECONNECT_BASE_DELAY_MS = 500;
const RECONNECT_MAX_DELAY_MS = 8_000;

async function defaultWebSocketFactory(url: string): Promise<WebSocketLike> {
  const globalWs = (globalThis as { WebSocket?: new (url: string) => WebSocketLike }).WebSocket;
  if (globalWs) return new globalWs(url);
  const { WebSocket: nodeWs } = await import('ws');
  return new nodeWs(url) as unknown as WebSocketLike;
}

export interface WsTransportOptions {
  url: string;
  timeoutMs: number;
  logger: Logger;
  wsFactory?: WebSocketFactory;
}

interface PendingRequest {
  method: string;
  resolve: (raw: RawRpcResponse) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

/**
 * WebSocket transport with id-correlated request/response handling and
 * automatic reconnect. On an unexpected close every in-flight request is
 * rejected (mutating requests are never silently replayed); after the
 * socket is re-established `onReconnected` lets the client re-login and
 * re-subscribe.
 */
export class WsTransport {
  /** Set by the subscriptions layer; receives every pub/sub notification. */
  onNotification?: (channel: string, data: unknown) => void;
  /** Set by the client; runs after an automatic reconnect succeeds. */
  onReconnected?: () => Promise<void>;

  private socket?: WebSocketLike;
  private nextId = 0;
  private readonly pending = new Map<number, PendingRequest>();
  private intentionallyClosed = false;
  private connecting?: Promise<void>;

  constructor(private readonly options: WsTransportOptions) {}

  get connected(): boolean {
    return this.socket?.readyState === WS_OPEN;
  }

  async connect(): Promise<void> {
    if (this.connected) return;
    // Coalesce concurrent connect() calls so they can't open rival sockets.
    this.connecting ??= (async () => {
      this.intentionallyClosed = false;
      this.socket = await this.open();
    })().finally(() => {
      this.connecting = undefined;
    });
    return this.connecting;
  }

  private async open(): Promise<WebSocketLike> {
    const factory = this.options.wsFactory ?? defaultWebSocketFactory;
    const socket = await factory(this.options.url);
    await new Promise<void>((resolve, reject) => {
      if (socket.readyState === WS_OPEN) return resolve();
      socket.onopen = () => resolve();
      socket.onerror = (event) =>
        reject(new DeriveConnectionError(`failed to connect to ${this.options.url}`, { cause: event }));
    });
    socket.onerror = (event) => this.options.logger('warn', 'websocket error', event);
    socket.onmessage = (event) => this.handleMessage(event.data);
    socket.onclose = (event) => this.handleClose(event.code);
    return socket;
  }

  async send<M extends RpcMethod>(method: M, params: ParamsOf<M>): Promise<ResultFor<M>> {
    assertPublicMethod(method);
    if (!this.connected) {
      throw new DeriveConnectionError('websocket is not connected — call connect() first');
    }
    const id = ++this.nextId;
    const raw = await new Promise<RawRpcResponse>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new DeriveTimeoutError(`${method}: no response within ${this.options.timeoutMs}ms`));
      }, this.options.timeoutMs);
      this.pending.set(id, { method, resolve, reject, timer });
      this.options.logger('debug', `WS ${method}`, params);
      try {
        this.socket!.send(JSON.stringify({ id, method, params }));
      } catch (cause) {
        clearTimeout(timer);
        this.pending.delete(id);
        reject(new DeriveConnectionError('websocket send failed', { cause }));
      }
    });
    return unwrapResponse<ResultFor<M>>(method, raw);
  }

  async close(): Promise<void> {
    this.intentionallyClosed = true;
    const socket = this.socket;
    if (!socket || socket.readyState !== WS_OPEN) return;
    this.rejectAllPending(new DeriveConnectionError('websocket closed by client'));
    await new Promise<void>((resolve) => {
      // Resolve on the close frame, but don't hang if the peer is slow to
      // complete the closing handshake — detach handlers and move on.
      const timer = setTimeout(() => {
        socket.onclose = null;
        socket.onerror = null;
        resolve();
      }, 1_000);
      socket.onclose = () => {
        clearTimeout(timer);
        resolve();
      };
      socket.close();
    });
  }

  private handleMessage(payload: unknown): void {
    let message: RawRpcResponse & { method?: string; params?: { channel?: string; data?: unknown } };
    try {
      message = JSON.parse(String(payload));
    } catch {
      this.options.logger('warn', 'ignoring non-JSON websocket message');
      return;
    }
    if (typeof message.id === 'number' && this.pending.has(message.id)) {
      const request = this.pending.get(message.id)!;
      this.pending.delete(message.id);
      clearTimeout(request.timer);
      request.resolve(message);
      return;
    }
    if (message.method === 'subscription' && message.params?.channel) {
      this.onNotification?.(message.params.channel, message.params.data);
      return;
    }
    this.options.logger('debug', 'unmatched websocket message', message);
  }

  private handleClose(code?: number): void {
    this.rejectAllPending(new DeriveTimeoutError('websocket closed before a response was received'));
    if (this.intentionallyClosed) return;
    this.options.logger('warn', `websocket closed unexpectedly (code ${code}); reconnecting`);
    void this.reconnect();
  }

  private rejectAllPending(error: Error): void {
    for (const request of this.pending.values()) {
      clearTimeout(request.timer);
      request.reject(error);
    }
    this.pending.clear();
  }

  private async reconnect(): Promise<void> {
    for (let attempt = 1; attempt <= RECONNECT_MAX_ATTEMPTS; attempt++) {
      const delay = Math.min(RECONNECT_BASE_DELAY_MS * 2 ** (attempt - 1), RECONNECT_MAX_DELAY_MS);
      await new Promise((resolve) => setTimeout(resolve, delay));
      if (this.intentionallyClosed) return;
      let socket: WebSocketLike | undefined;
      try {
        socket = await this.open();
        this.socket = socket;
        await this.onReconnected?.();
        this.options.logger('info', `websocket reconnected after ${attempt} attempt(s)`);
        return;
      } catch (error) {
        // Close the socket opened this attempt so a failing onReconnected
        // (e.g. re-login) can't leave an orphaned live socket behind.
        try {
          socket?.close();
        } catch {
          /* already closing */
        }
        this.options.logger('warn', `reconnect attempt ${attempt}/${RECONNECT_MAX_ATTEMPTS} failed`, error);
      }
    }
    this.options.logger('error', 'websocket reconnection failed; connection abandoned');
  }
}
