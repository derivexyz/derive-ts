import { describe, expect, it } from 'vitest';
import { ProtocolScopeCode } from '../../src/auth/scopes';
import { encodeCreateSessionKeyActionData } from '../../src/codecs/sessionKey';

/** Right-align a bare hex value in a 32-byte word. */
const word = (hex: string) => hex.padStart(64, '0');

describe('encodeCreateSessionKeyActionData', () => {
  /**
   * Synthetic vector for the layout `[key][expiry][S][A][scopes…][subaccounts…]`:
   *   word 0: address 0x42×20, left-padded          → 12 zero bytes ‖ 42×20
   *   word 1: expiry 1_700_000_000 = 0x6553f100     → right-aligned
   *   word 2: scope count 3
   *   word 3: subaccount count 3
   *   words 4-6: scope codes 5, 12, 15 (trade:orderbook:perp,
   *              transfer:existing_subaccount, create_session_key)
   *   words 7-9: subaccount ids 1, 7, u64::MAX = 0xffffffffffffffff
   * Total (4 + 3 + 3) × 32 = 320 bytes — no ABI offset/length head words.
   */
  it('packs the documented hand-rolled word layout', () => {
    const encoded = encodeCreateSessionKeyActionData({
      sessionKey: '0x4242424242424242424242424242424242424242',
      expirySec: 1_700_000_000,
      scopes: [
        ProtocolScopeCode.TradeOrderbookPerp,
        ProtocolScopeCode.TransferExistingSubaccount,
        ProtocolScopeCode.CreateSessionKey,
      ],
      subaccountIds: [1, 7, 0xffffffffffffffffn],
    });
    expect(encoded).toBe(
      '0x' +
        word('4242424242424242424242424242424242424242') +
        word('6553f100') +
        word('03') +
        word('03') +
        word('05') +
        word('0c') +
        word('0f') +
        word('01') +
        word('07') +
        word('ffffffffffffffff'),
    );
    expect(encoded.length).toBe(2 + (4 + 3 + 3) * 64);
  });

  it('encodes empty scope/subaccount lists as the bare 4-word head', () => {
    const encoded = encodeCreateSessionKeyActionData({
      sessionKey: '0x0000000000000000000000000000000000000001',
      expirySec: 1,
      scopes: [],
      subaccountIds: [],
    });
    expect(encoded).toBe('0x' + word('01') + word('01') + word('00') + word('00'));
  });

  it('encodes the admin scope (code 0) as an all-zero word', () => {
    const encoded = encodeCreateSessionKeyActionData({
      sessionKey: '0x4242424242424242424242424242424242424242',
      expirySec: 1_700_000_000,
      scopes: [ProtocolScopeCode.Admin],
      subaccountIds: [],
    });
    // word 4 (the single scope word) must be 32 zero bytes
    expect(encoded.slice(2 + 4 * 64)).toBe(word('00'));
  });

  it('is case-insensitive on the session key address', () => {
    const fields = { expirySec: 1_700_000_000, scopes: [], subaccountIds: [] };
    expect(
      encodeCreateSessionKeyActionData({ sessionKey: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', ...fields }),
    ).toBe(encodeCreateSessionKeyActionData({ sessionKey: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', ...fields }));
  });

  it('encodes an arbitrary scope code (the server is the scope authority)', () => {
    // The typed ProtocolScopeCode enum guides callers; the low-level codec
    // passes any code through so the server can reject unknown ones.
    const data = encodeCreateSessionKeyActionData({
      sessionKey: '0x4242424242424242424242424242424242424242',
      expirySec: 1_700_000_000,
      scopes: [23],
      subaccountIds: [],
    });
    expect(data.endsWith('17')).toBe(true); // 23 == 0x17 in the trailing scope word
  });

  it('allows expiry 0 (deactivation) but rejects negative/fractional expiry', () => {
    expect(() =>
      encodeCreateSessionKeyActionData({
        sessionKey: '0x4242424242424242424242424242424242424242',
        expirySec: 0,
        scopes: [],
        subaccountIds: [],
      }),
    ).not.toThrow();
    for (const expirySec of [-1, 1.5]) {
      expect(() =>
        encodeCreateSessionKeyActionData({
          sessionKey: '0x4242424242424242424242424242424242424242',
          expirySec,
          scopes: [],
          subaccountIds: [],
        }),
      ).toThrow(/expirySec/);
    }
  });

  it('rejects malformed addresses and negative subaccount ids', () => {
    expect(() =>
      encodeCreateSessionKeyActionData({ sessionKey: '0x1234', expirySec: 1, scopes: [], subaccountIds: [] }),
    ).toThrow();
    expect(() =>
      encodeCreateSessionKeyActionData({
        sessionKey: '0x4242424242424242424242424242424242424242',
        expirySec: 1,
        scopes: [],
        subaccountIds: [-1],
      }),
    ).toThrow(/non-negative integer/);
  });
});
