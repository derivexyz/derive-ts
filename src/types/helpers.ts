/** Extracts the method literal from a EndpointMap entry. */
export type MethodOf<T> = T extends { request: { method: infer M } } ? M : never;
/** Extracts the request params type from a EndpointMap entry. */
export type RequestParamsType<T> = T extends { request: { params: infer P } } ? P : never;
/** Extracts the full response type (result-or-error union) from a EndpointMap entry. */
export type ResponseType<T> = T extends { response: infer S } ? S : never;
/** Extracts the response `result` payload from a EndpointMap entry. */
export type ResultOf<T> = ResponseType<T> extends infer S ? (S extends { result: infer R } ? R : never) : never;
/** Extracts the notification `data` payload from a ChannelSchemaMap entry. */
export type ChannelDataOf<T> = T extends { data: infer D } ? D : never;
/** Extracts the address params from a ChannelSchemaMap entry. */
export type ChannelParamsOf<T> = T extends { params: infer P } ? P : never;
