import type { ChannelSchemaMap } from './generated';

export * from './generated';
export * from './helpers';
export type { RpcMethod, ParamsOf, ResultFor } from './endpoints/endpointMap';

export type ChannelTemplate = keyof ChannelSchemaMap & string;
