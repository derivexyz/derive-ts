import { AbiCoder } from 'ethers';
import { describe, expect, it } from 'vitest';
import { ProtocolScopeCode } from '../../src/auth/scopes';
import { encodeSetSessionKeyActionData } from '../../src/codecs/sessionKey';

/** Right-align a bare hex value in a 32-byte word. */
const word = (hex: string) => hex.padStart(64, '0');

describe('encodeSetSessionKeyActionData', () => {
  /**
   * Canonical `abi.encode(address, uint256, uint256[], uint256[])`:
   *   word 0: address 0x42×20, left-padded        → 12 zero bytes ‖ 42×20
   *   word 1: expiry 1_700_000_000 = 0x6553f100   → right-aligned
   *   word 2: offset to scopes tail       = 0x80
   *   word 3: offset to subaccounts tail  = 0x80 + 32·(1+3) = 0x100
   *   word 4: scope count 3
   *   words 5-7: scope codes 5, 12, 15 (trade:orderbook:perp,
   *              transfer:existing_subaccount, set_session_key)
   *   word 8: subaccount count 3
   *   words 9-11: subaccount ids 1, 7, u64::MAX = 0xffffffffffffffff
   * Total (6 + 3 + 3) × 32 = 384 bytes.
   */
  it('produces the canonical dynamic-ABI word layout', () => {
    const fields = {
      sessionKey: '0x4242424242424242424242424242424242424242',
      expirySec: 1_700_000_000,
      scopes: [
        ProtocolScopeCode.TradeOrderbookPerp,
        ProtocolScopeCode.TransferExistingSubaccount,
        ProtocolScopeCode.SetSessionKey,
      ],
      subaccountIds: [1, 7, 0xffffffffffffffffn],
    };
    const encoded = encodeSetSessionKeyActionData(fields);
    expect(encoded).toBe(
      '0x' +
        word('4242424242424242424242424242424242424242') +
        word('6553f100') +
        word('80') +
        word('0100') +
        word('03') +
        word('05') +
        word('0c') +
        word('0f') +
        word('03') +
        word('01') +
        word('07') +
        word('ffffffffffffffff'),
    );
    expect(encoded.length).toBe(2 + (6 + 3 + 3) * 64);
    // Byte-identical to a from-scratch AbiCoder encoding of the same tuple.
    expect(encoded).toBe(
      AbiCoder.defaultAbiCoder().encode(
        ['address', 'uint256', 'uint256[]', 'uint256[]'],
        [fields.sessionKey, fields.expirySec, fields.scopes, fields.subaccountIds],
      ),
    );
  });

  it('encodes empty scope/subaccount lists as the 6-word head+lengths form', () => {
    const encoded = encodeSetSessionKeyActionData({
      sessionKey: '0x0000000000000000000000000000000000000001',
      expirySec: 1,
      scopes: [],
      subaccountIds: [],
    });
    expect(encoded).toBe('0x' + word('01') + word('01') + word('80') + word('a0') + word('00') + word('00'));
  });

  it('encodes the admin scope (code 0) as an all-zero word', () => {
    const encoded = encodeSetSessionKeyActionData({
      sessionKey: '0x4242424242424242424242424242424242424242',
      expirySec: 1_700_000_000,
      scopes: [ProtocolScopeCode.Admin],
      subaccountIds: [],
    });
    // word 5 (the single scope word) must be 32 zero bytes
    expect(encoded.slice(2 + 5 * 64, 2 + 6 * 64)).toBe(word('00'));
  });

  it('is case-insensitive on the session key address', () => {
    const fields = { expirySec: 1_700_000_000, scopes: [], subaccountIds: [] };
    expect(encodeSetSessionKeyActionData({ sessionKey: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', ...fields })).toBe(
      encodeSetSessionKeyActionData({ sessionKey: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', ...fields }),
    );
  });

  it('encodes an arbitrary scope code (the server is the scope authority)', () => {
    // The typed ProtocolScopeCode enum guides callers; the low-level codec
    // passes any code through so the server can reject unknown ones.
    const data = encodeSetSessionKeyActionData({
      sessionKey: '0x4242424242424242424242424242424242424242',
      expirySec: 1_700_000_000,
      scopes: [23],
      subaccountIds: [],
    });
    // 23 == 0x17 in the scope word (word 5)
    expect(data.slice(2 + 5 * 64, 2 + 6 * 64)).toBe(word('17'));
  });

  it('allows expiry 0 (deactivation) but rejects negative/fractional expiry', () => {
    expect(() =>
      encodeSetSessionKeyActionData({
        sessionKey: '0x4242424242424242424242424242424242424242',
        expirySec: 0,
        scopes: [],
        subaccountIds: [],
      }),
    ).not.toThrow();
    for (const expirySec of [-1, 1.5]) {
      expect(() =>
        encodeSetSessionKeyActionData({
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
      encodeSetSessionKeyActionData({ sessionKey: '0x1234', expirySec: 1, scopes: [], subaccountIds: [] }),
    ).toThrow();
    expect(() =>
      encodeSetSessionKeyActionData({
        sessionKey: '0x4242424242424242424242424242424242424242',
        expirySec: 1,
        scopes: [],
        subaccountIds: [-1],
      }),
    ).toThrow();
  });
});
