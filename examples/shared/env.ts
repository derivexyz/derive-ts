import { DeriveClient, type NetworkName } from '@derivexyz/derive-ts';

/**
 * Shared example bootstrap. Every example reads the same two env vars:
 *   DERIVE_NETWORK  mainnet | testnet | local   (default: testnet)
 *   PRIVATE_KEY     0x-prefixed account owner key
 *
 * Examples are runnable with `tsx examples/<name>.ts`. They favor clarity
 * over cleverness — copy freely.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var ${name}. See examples/README.md.`);
    process.exit(1);
  }
  return value;
}

export function network(): NetworkName {
  const value = (process.env.DERIVE_NETWORK ?? 'testnet') as NetworkName;
  if (value === 'mainnet') {
    console.warn('⚠️  DERIVE_NETWORK=mainnet — this example will place REAL orders/transfers.');
  }
  return value;
}

/** A client authenticated with the owner key in PRIVATE_KEY. */
export function ownerClient(): DeriveClient {
  return new DeriveClient({
    network: network(),
    wallet: requireEnv('PRIVATE_KEY'),
    logger: (level, message) => {
      if (level === 'warn' || level === 'error') console.error(`[${level}] ${message}`);
    },
  });
}

/** Runs an async example body, printing errors and exiting non-zero on failure. */
export function run(main: () => Promise<void>): void {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
