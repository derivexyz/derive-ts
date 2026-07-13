import type { ChannelDataOf, ChannelParamsOf, ChannelSchemaMap, ChannelTemplate } from '../types';

/**
 * A concrete channel name carrying its notification payload type as a
 * phantom parameter, so `Subscriptions.subscribe`/`stream` can type the
 * data without the caller restating it.
 */
export interface TypedChannel<Data> {
  name: string;
  /** Phantom type marker — never present at runtime. */
  readonly __data?: Data;
}

/**
 * Builds a concrete channel name from a template in the generated
 * `ChannelSchemaMap`, e.g.
 * `channel('orderbook.{instrument_name}.{group}.{depth}', { instrument_name: 'ETH-PERP', group: '1', depth: '10' })`
 * → `orderbook.ETH-PERP.1.10`. Channel address params are always
 * strings on the wire, so values are stringified even when numeric.
 * Missing, empty, and unknown params are rejected.
 */
export function channel<T extends ChannelTemplate>(
  template: T,
  params: ChannelParamsOf<ChannelSchemaMap[T]>,
): TypedChannel<ChannelDataOf<ChannelSchemaMap[T]>> {
  const values = params as Record<string, unknown>;
  const used = new Set<string>();
  const name = template.replace(/\{(\w+)\}/g, (_token, key: string) => {
    const value = values[key];
    if (value === undefined || value === null || String(value) === '') {
      throw new Error(`channel ${template}: missing value for {${key}}`);
    }
    used.add(key);
    return String(value);
  });
  for (const key of Object.keys(values)) {
    if (!used.has(key)) {
      throw new Error(`channel ${template}: unknown param '${key}'`);
    }
  }
  return { name };
}
