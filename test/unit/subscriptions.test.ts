import { describe, expect, it } from 'vitest';
import type { ClientContext } from '../../src/api/context';
import { channel } from '../../src/subscriptions/channels';
import { Subscriptions } from '../../src/subscriptions/subscriptions';
import type { WsTransport } from '../../src/transport/ws';

describe('channel()', () => {
  it('substitutes every template param', () => {
    const ch = channel('orderbook.{instrument_name}.{group}.{depth}', {
      instrument_name: 'ETH-PERP',
      group: '10',
      depth: '20',
    });
    expect(ch.name).toBe('orderbook.ETH-PERP.10.20');
  });

  it('stringifies numeric params', () => {
    // The generated param types are strings, but the wire also tolerates callers holding numbers.
    const ch = channel('{subaccount_id}.orders', { subaccount_id: 123 as unknown as string });
    expect(ch.name).toBe('123.orders');
  });

  it('rejects unknown params', () => {
    expect(() => channel('spot_feed.{currency}', { currency: 'ETH', extra: 'x' } as never)).toThrow(
      /unknown param 'extra'/,
    );
  });

  it('rejects missing params', () => {
    expect(() => channel('spot_feed.{currency}', {} as never)).toThrow(/missing value for \{currency\}/);
  });

  it('rejects empty params', () => {
    expect(() => channel('spot_feed.{currency}', { currency: '' })).toThrow(/missing value for \{currency\}/);
  });

  it('handles param-less templates', () => {
    expect(channel('auctions.watch', {}).name).toBe('auctions.watch');
  });
});

/**
 * Minimal ctx + ws doubles. `subscribe`/`unsubscribe` go over the ws
 * transport (they are ws-only), so the ws fake's `send` records calls
 * and answers with per-channel statuses; the ctx fake only logs.
 */
function makeFakes(subscribeStatus: Record<string, string> = {}) {
  const calls: Array<{ method: string; params: unknown }> = [];
  const logs: Array<{ level: string; message: string }> = [];
  const ctx = {
    logger: (level: string, message: string) => logs.push({ level, message }),
  } as unknown as ClientContext;
  const ws = {
    onNotification: undefined,
    send: async (method: string, params: unknown) => {
      calls.push({ method, params });
      const channels = (params as { channels: string[] }).channels;
      const status = Object.fromEntries(channels.map((c) => [c, subscribeStatus[c] ?? 'ok']));
      return { status };
    },
  } as unknown as WsTransport;
  const subs = new Subscriptions(ctx, ws);
  const notify = (channelName: string, data: unknown) => ws.onNotification!(channelName, data);
  return { subs, notify, calls, logs };
}

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('Subscriptions', () => {
  const ticker = channel('spot_feed.{currency}', { currency: 'ETH' });

  it('routes notifications to the subscribed handler only', async () => {
    const { subs, notify, calls } = makeFakes();
    const received: unknown[] = [];
    await subs.subscribe(ticker, (data) => received.push(data));
    expect(calls).toEqual([{ method: 'subscribe', params: { channels: ['spot_feed.ETH'] } }]);
    notify('spot_feed.ETH', { price: '1' });
    notify('spot_feed.BTC', { price: '2' });
    expect(received).toEqual([{ price: '1' }]);
  });

  it('throws when the exchange reports a non-ok status', async () => {
    const { subs } = makeFakes({ 'spot_feed.ETH': 'error: no such channel' });
    await expect(subs.subscribe(ticker, () => {})).rejects.toThrow('error: no such channel');
  });

  it('drops notifications with no handler at debug', () => {
    const { notify, logs } = makeFakes();
    notify('spot_feed.ETH', {});
    expect(logs).toEqual([{ level: 'debug', message: 'dropping notification for unhandled channel spot_feed.ETH' }]);
  });

  it('sends the unsubscribe RPC only when the last handler is removed, idempotently', async () => {
    const { subs, notify, calls } = makeFakes();
    const seen: string[] = [];
    const first = await subs.subscribe(ticker, () => seen.push('first'));
    const second = await subs.subscribe(ticker, () => seen.push('second'));
    const unsubscribes = () => calls.filter((c) => c.method === 'unsubscribe');

    await first.unsubscribe();
    notify('spot_feed.ETH', {});
    expect(seen).toEqual(['second']);
    expect(unsubscribes()).toHaveLength(0);

    await second.unsubscribe();
    expect(unsubscribes()).toEqual([{ method: 'unsubscribe', params: { channels: ['spot_feed.ETH'] } }]);
    await second.unsubscribe();
    expect(unsubscribes()).toHaveLength(1);
  });

  it('a throwing handler does not break the others', async () => {
    const { subs, notify, logs } = makeFakes();
    const seen: unknown[] = [];
    await subs.subscribe(ticker, () => {
      throw new Error('boom');
    });
    await subs.subscribe(ticker, (data) => seen.push(data));
    notify('spot_feed.ETH', 1);
    expect(seen).toEqual([1]);
    expect(logs.filter((l) => l.level === 'error')).toHaveLength(1);
  });

  it('resubscribeAll re-sends subscribe for every active channel', async () => {
    const { subs, calls } = makeFakes();
    await subs.subscribe(ticker, () => {});
    await subs.subscribe(channel('auctions.watch', {}), () => {});
    calls.length = 0;
    await subs.resubscribeAll();
    expect(calls).toEqual([{ method: 'subscribe', params: { channels: ['spot_feed.ETH', 'auctions.watch'] } }]);
  });

  it('stream subscribes lazily and yields notifications in order', async () => {
    const { subs, notify, calls } = makeFakes();
    const iterator = subs.stream(ticker);
    expect(calls).toHaveLength(0);

    const first = iterator.next();
    await flush();
    expect(calls).toEqual([{ method: 'subscribe', params: { channels: ['spot_feed.ETH'] } }]);

    notify('spot_feed.ETH', 1);
    notify('spot_feed.ETH', 2);
    expect((await first).value).toBe(1);
    expect((await iterator.next()).value).toBe(2);

    await iterator.return!();
    expect(calls.at(-1)).toEqual({ method: 'unsubscribe', params: { channels: ['spot_feed.ETH'] } });
    expect((await iterator.next()).done).toBe(true);
  });

  it('stream drops the oldest beyond the buffer limit with a single warning', async () => {
    const { subs, notify, logs } = makeFakes();
    const iterator = subs.stream(ticker);
    const first = iterator.next();
    await flush();
    notify('spot_feed.ETH', 0);
    await first; // consume the pending waiter so later notifications buffer

    for (let i = 1; i <= 10_002; i++) notify('spot_feed.ETH', i);
    expect((await iterator.next()).value).toBe(3); // 1 and 2 were dropped
    expect(logs.filter((l) => l.level === 'warn')).toHaveLength(1);
    await iterator.return!();
  });

  it('stream return() before the first next() never subscribes', async () => {
    const { subs, calls } = makeFakes();
    const iterator = subs.stream(ticker);
    await iterator.return!();
    expect(calls).toHaveLength(0);
  });

  it('stream return() resolves a pending next() as done', async () => {
    const { subs } = makeFakes();
    const iterator = subs.stream(ticker);
    const pending = iterator.next();
    await flush();
    await iterator.return!();
    expect((await pending).done).toBe(true);
  });
});
