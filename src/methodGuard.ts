export const PUBLIC_METHOD_PREFIXES: readonly string[] = ['public/', 'private/'];

export const WS_CONTROL_METHODS: ReadonlySet<string> = new Set(['subscribe', 'unsubscribe']);

export function isPublicApiMethod(method: string): boolean {
  return PUBLIC_METHOD_PREFIXES.some((prefix) => method.startsWith(prefix));
}
