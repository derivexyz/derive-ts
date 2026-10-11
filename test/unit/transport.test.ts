import { createServer, type Server, type ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { DeriveTimeoutError } from '../../src/errors';
import { HttpTransport } from '../../src/transport/http';
import { assertPublicMethod } from '../../src/transport/jsonrpc';

describe('assertPublicMethod', () => {
  it('accepts the camelCase public/getRateLimits route', () => {
    expect(() => assertPublicMethod('public/getRateLimits')).not.toThrow();
  });

  it.each(['public/../admin/x', 'public/get_time/../../admin', 'public/get%2Ftime', 'public/get.time'])(
    'rejects %s, which could escape the request path',
    (method) => {
      expect(() => assertPublicMethod(method)).toThrow(/invalid method/);
    },
  );
});

/**
 * Local server whose routes answer in ways a slow or broken API would:
 * stall before the headers, stall mid-body, or send a non-JSON body.
 */
const routes: Record<string, (res: ServerResponse) => void> = {
  'public/stall_headers': () => {},
  'public/stall_body': (res) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.write('{"jsonrpc":"2.0","res');
  },
  'public/not_json': (res) => {
    res.writeHead(502, { 'content-type': 'text/html' });
    res.end('<html>Bad Gateway</html>');
  },
};

let server: Server;
let transport: HttpTransport;

beforeAll(async () => {
  server = createServer((req, res) => routes[req.url!.slice(1)]!(res));
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;
  transport = new HttpTransport({ baseUrl: `http://127.0.0.1:${port}`, timeoutMs: 300, logger: () => {} });
});

afterAll(() => {
  server.closeAllConnections();
  server.close();
});

describe('HttpTransport timeouts', () => {
  // Callers retry on DeriveTimeoutError; a timeout surfaced as any other
  // error is treated as a hard failure.
  it.each(['public/stall_headers', 'public/stall_body'])('throws DeriveTimeoutError when %s', async (method) => {
    await expect(transport.send(method as never, {} as never)).rejects.toBeInstanceOf(DeriveTimeoutError);
  });

  it('reports a non-JSON body as such, not as a timeout', async () => {
    const sent = transport.send('public/not_json' as never, {} as never);
    await expect(sent).rejects.toThrow(/non-JSON response with HTTP status 502/);
    await expect(sent).rejects.not.toBeInstanceOf(DeriveTimeoutError);
  });
});
