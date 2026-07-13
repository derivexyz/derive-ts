import type { ClientContext } from '../api/context';
import type { WsTransport } from '../transport/ws';
import type { TypedChannel } from './channels';

/** A live channel subscription; `unsubscribe` is idempotent. */
export interface Subscription {
  channel: string;
  unsubscribe(): Promise<void>;
}

/** Streams buffer at most this many unconsumed notifications; beyond it the oldest are dropped. */
const STREAM_BUFFER_LIMIT = 10_000;

/**
 * Pub/sub over the websocket transport. Owns notification routing:
 * every `subscription` message the transport receives is dispatched to
 * the handlers registered for its channel. The exchange keys
 * subscriptions to the connection, so the client calls `resubscribeAll`
 * from its reconnect hook to restore them on a fresh socket.
 */
export class Subscriptions {
  private readonly handlers = new Map<string, Set<(data: unknown) => void>>();

  constructor(
    private readonly ctx: ClientContext,
    private readonly ws: WsTransport,
  ) {
    ws.onNotification = (channelName, data) => this.dispatch(channelName, data);
  }

  /**
   * Subscribes to a channel and registers `handler` for its
   * notifications. Multiple handlers share one wire subscription per
   * channel: the `subscribe` RPC is sent only for the first handler on a
   * channel, and `unsubscribe` only when the last is removed.
   */
  async subscribe<D>(ch: TypedChannel<D>, handler: (data: D) => void): Promise<Subscription> {
    // A fresh wrapper per call keeps each Subscription independently
    // removable even when the same handler function is registered twice.
    const entry = (data: unknown): void => handler(data as D);
    const existing = this.handlers.get(ch.name);
    if (existing) {
      existing.add(entry);
    } else {
      const set = new Set([entry]);
      this.handlers.set(ch.name, set);
      try {
        await this.sendChannelRpc('subscribe', [ch.name]);
      } catch (error) {
        set.delete(entry);
        if (set.size === 0) this.handlers.delete(ch.name);
        throw error;
      }
    }
    return {
      channel: ch.name,
      unsubscribe: async () => {
        const current = this.handlers.get(ch.name);
        if (!current?.delete(entry)) return;
        if (current.size === 0) {
          this.handlers.delete(ch.name);
          await this.sendChannelRpc('unsubscribe', [ch.name]);
        }
      },
    };
  }

  /**
   * The channel as an async iterator: subscribes on the first `next()`,
   * buffers notifications the consumer has not yet read (dropping the
   * oldest beyond `STREAM_BUFFER_LIMIT`), and unsubscribes when the
   * loop ends (`break` / `return()` / `throw()`).
   */
  stream<D>(ch: TypedChannel<D>): AsyncIterableIterator<D> {
    const queue: D[] = [];
    const waiters: Array<(result: IteratorResult<D>) => void> = [];
    let subscribing: Promise<Subscription> | undefined;
    let done = false;
    let overflowWarned = false;

    const onData = (data: D): void => {
      if (done) return;
      const waiter = waiters.shift();
      if (waiter) {
        waiter({ value: data, done: false });
        return;
      }
      queue.push(data);
      if (queue.length > STREAM_BUFFER_LIMIT) {
        queue.shift();
        if (!overflowWarned) {
          overflowWarned = true;
          this.ctx.logger(
            'warn',
            `stream ${ch.name}: buffer exceeded ${STREAM_BUFFER_LIMIT} notifications; dropping oldest`,
          );
        }
      }
    };

    const finish = async (): Promise<void> => {
      if (done) return;
      done = true;
      for (const waiter of waiters.splice(0)) waiter({ value: undefined, done: true });
      // A failed subscribe is swallowed here: next() already surfaced it.
      const subscription = await subscribing?.catch(() => undefined);
      await subscription?.unsubscribe();
    };

    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      next: async (): Promise<IteratorResult<D>> => {
        if (done) return { value: undefined, done: true };
        subscribing ??= this.subscribe(ch, onData);
        await subscribing;
        if (done) return { value: undefined, done: true };
        if (queue.length > 0) return { value: queue.shift()!, done: false };
        return new Promise((resolve) => waiters.push(resolve));
      },
      return: async (): Promise<IteratorResult<D>> => {
        await finish();
        return { value: undefined, done: true };
      },
      throw: async (error?: unknown): Promise<IteratorResult<D>> => {
        await finish();
        throw error;
      },
    };
  }

  /** Re-sends `subscribe` for every active channel; the client calls this after a websocket reconnect. */
  async resubscribeAll(): Promise<void> {
    const channels = [...this.handlers.keys()];
    if (channels.length === 0) return;
    const result = await this.ws.send('subscribe', { channels });
    for (const name of channels) {
      const status = result.status[name];
      // 'already subscribed' is fine here; only a genuine failure is logged.
      // Logged rather than thrown: one bad channel must not abort the reconnect flow.
      if (status !== 'ok' && status !== 'already subscribed') {
        this.ctx.logger('error', `resubscribe to ${name} failed`, status);
      }
    }
  }

  /**
   * `subscribe`/`unsubscribe` exist only over the websocket, so they go
   * straight to the ws transport (never the client's HTTP fallback). A
   * per-channel `status` other than 'ok'/'already subscribed' throws.
   */
  private async sendChannelRpc(method: 'subscribe' | 'unsubscribe', channels: string[]): Promise<void> {
    const result = await this.ws.send(method, { channels });
    for (const name of channels) {
      const status = result.status[name];
      if (status !== 'ok' && status !== 'already subscribed') {
        throw new Error(`${method} ${name} failed: ${String(status)}`);
      }
    }
  }

  private dispatch(channelName: string, data: unknown): void {
    const set = this.handlers.get(channelName);
    if (!set || set.size === 0) {
      this.ctx.logger('debug', `dropping notification for unhandled channel ${channelName}`);
      return;
    }
    for (const handler of set) {
      try {
        handler(data);
      } catch (error) {
        this.ctx.logger('error', `subscription handler for ${channelName} threw`, error);
      }
    }
  }
}
