import { Wallet, dataLength, dataSlice, parseUnits } from 'ethers';
import { describe, expect, it } from 'vitest';
import { encodeExternalTransfer } from '../../src/codecs/externalTransfer';
import { encodeTransfer } from '../../src/codecs/transfer';
import { encodeWithdrawal } from '../../src/codecs/withdrawal';
import { SignedAction } from '../../src/signing/action';
import vectors from './fixtures/golden-vectors.json';

const wallet = new Wallet(vectors.signerPrivateKey);

function goldenCase(name: string) {
  const found = vectors.cases.find((c) => c.name === name);
  if (!found) throw new Error(`golden vector case ${name} missing`);
  return found;
}

/** Signs `data` under the case's envelope and checks the recorded signature. */
function expectSignatureMatches(testCase: ReturnType<typeof goldenCase>, data: string) {
  const inputs = testCase.inputs as {
    subaccount_id: number;
    nonce: string;
    signature_expiry_sec: number;
    module: string;
    owner: string;
    signer: string;
  };
  const action = new SignedAction(
    {
      subaccountId: inputs.subaccount_id,
      nonce: inputs.nonce,
      module: inputs.module,
      data,
      expirySec: inputs.signature_expiry_sec,
      owner: inputs.owner,
      signer: inputs.signer,
    },
    vectors.domainSeparator,
  );
  expect(action.sign(wallet).signature).toBe(testCase.signature);
}

describe('transfer codec', () => {
  const testCase = goldenCase('transfer');
  const inputs = testCase.inputs as unknown as {
    to_subaccount_id: number;
    new_subaccount_manager: number;
    asset_address: string;
    asset_sub_id: number;
    amount: string;
    max_fee_usd: string;
  };
  const fields = {
    toSubaccountId: inputs.to_subaccount_id,
    newSubaccountManager: inputs.new_subaccount_manager,
    asset: inputs.asset_address,
    subId: inputs.asset_sub_id,
    amount: inputs.amount,
    maxFeeUsd: inputs.max_fee_usd,
  };

  it('reproduces the golden dataHex byte-for-byte', () => {
    expect(encodeTransfer(fields)).toBe(testCase.dataHex);
  });

  it('produces the golden signature end-to-end', () => {
    expectSignatureMatches(testCase, encodeTransfer(fields));
  });

  it('lays out six words in wire order', () => {
    const data = encodeTransfer({
      toSubaccountId: 42,
      newSubaccountManager: 7,
      asset: '0x' + 'aa'.repeat(20),
      subId: 12345,
      amount: '1.5',
      maxFeeUsd: '1',
    });
    expect(dataLength(data)).toBe(192);
    expect(BigInt(dataSlice(data, 0, 32))).toBe(42n); // to_subaccount_id, right-aligned
    expect(BigInt(dataSlice(data, 32, 64))).toBe(7n); // new_subaccount_manager
    expect(dataSlice(data, 64, 76)).toBe('0x' + '00'.repeat(12)); // asset left-padded
    expect(dataSlice(data, 76, 96)).toBe('0x' + 'aa'.repeat(20));
    expect(BigInt(dataSlice(data, 96, 128))).toBe(12345n); // sub_id
    expect(BigInt(dataSlice(data, 128, 160))).toBe(parseUnits('1.5', 18)); // amount at e18
    expect(BigInt(dataSlice(data, 160, 192))).toBe(parseUnits('1', 18)); // max_fee_usd at e18
  });

  it('rejects zero and negative amounts', () => {
    expect(() => encodeTransfer({ ...fields, amount: '0' })).toThrow(/strictly positive/);
    expect(() => encodeTransfer({ ...fields, amount: '-1' })).toThrow(/negative/);
    expect(() => encodeTransfer({ ...fields, maxFeeUsd: '-1' })).toThrow(/negative/);
  });

  it('rejects sub-1e12 precision the exchange would refuse to decode', () => {
    expect(() => encodeTransfer({ ...fields, amount: '0.0000000000001' })).toThrow(/12 decimal places/);
    expect(() => encodeTransfer({ ...fields, maxFeeUsd: '1.1234567890123' })).toThrow(/12 decimal places/);
    // Exactly 12 decimal places is the finest signable precision.
    expect(() => encodeTransfer({ ...fields, amount: '0.000000000001' })).not.toThrow();
  });

  it('rejects malformed ids and addresses', () => {
    expect(() => encodeTransfer({ ...fields, asset: '0x1234' })).toThrow();
    expect(() => encodeTransfer({ ...fields, toSubaccountId: 1.5 })).toThrow(/toSubaccountId/);
    expect(() => encodeTransfer({ ...fields, subId: -1 })).toThrow(/subId/);
  });
});

describe('external transfer codec', () => {
  const fields = {
    toSubaccountId: 42,
    newSubaccountManager: 7,
    asset: '0x' + 'aa'.repeat(20),
    subId: 12345,
    amount: '1.5',
    maxFeeUsd: '1',
    recipient: '0x' + 'bb'.repeat(20),
  };

  it('is the transfer payload plus a recipient word', () => {
    const data = encodeExternalTransfer(fields);
    expect(dataLength(data)).toBe(224);
    expect(dataSlice(data, 0, 192)).toBe(encodeTransfer(fields));
    expect(dataSlice(data, 192, 204)).toBe('0x' + '00'.repeat(12)); // recipient left-padded
    expect(dataSlice(data, 204, 224)).toBe('0x' + 'bb'.repeat(20));
  });

  it('rejects a malformed recipient', () => {
    expect(() => encodeExternalTransfer({ ...fields, recipient: 'not-an-address' })).toThrow();
  });
});

describe('withdrawal codec', () => {
  const testCase = goldenCase('withdrawal');
  const inputs = testCase.inputs as unknown as {
    asset_address: string;
    asset_decimals: number;
    amount: string;
    max_fee_usd: string;
    recipient: string;
    force_batch: boolean;
  };
  const fields = {
    protocolAsset: inputs.asset_address,
    maxFeeUsd: inputs.max_fee_usd,
    recipient: inputs.recipient,
    amount: inputs.amount,
    decimals: inputs.asset_decimals,
    forceBatch: inputs.force_batch,
  };

  it('reproduces the golden dataHex byte-for-byte', () => {
    expect(encodeWithdrawal(fields)).toBe(testCase.dataHex);
  });

  it('produces the golden signature end-to-end', () => {
    expectSignatureMatches(testCase, encodeWithdrawal(fields));
  });

  it('signs the amount at NATIVE decimals while the fee stays e18', () => {
    const data = encodeWithdrawal({ ...fields, amount: '1.5', decimals: 6, maxFeeUsd: '2' });
    expect(BigInt(dataSlice(data, 96, 128))).toBe(1_500_000n); // 1.5 USDC at 6 decimals, NOT e18
    expect(BigInt(dataSlice(data, 32, 64))).toBe(parseUnits('2', 18));
  });

  it('sets the force_batch flag as the last byte of word 4', () => {
    const data = encodeWithdrawal({ ...fields, forceBatch: true });
    expect(dataSlice(data, 159, 160)).toBe('0x01');
    expect(dataSlice(data, 128, 159)).toBe('0x' + '00'.repeat(31));
  });

  it('rejects amounts finer than the asset decimals, zero amounts, and bad decimals', () => {
    expect(() => encodeWithdrawal({ ...fields, amount: '1.2345678', decimals: 6 })).toThrow();
    expect(() => encodeWithdrawal({ ...fields, amount: '0' })).toThrow(/strictly positive/);
    expect(() => encodeWithdrawal({ ...fields, decimals: 6.5 })).toThrow(/decimals/);
  });
});
