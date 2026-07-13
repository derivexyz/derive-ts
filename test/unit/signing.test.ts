import { Wallet } from 'ethers';
import { describe, expect, it } from 'vitest';
import { SignedAction } from '../../src/signing/action';
import { ACTION_TYPEHASH } from '../../src/signing/eip712';
import vectors from './fixtures/golden-vectors.json';

/**
 * Fixed vectors independently verified by recomputation. The SDK signer must
 * reproduce every hash and signature byte-for-byte. The signing key is a
 * publicly known development key — safe to commit, never to fund.
 */
describe('SignedAction golden vectors', () => {
  const wallet = new Wallet(vectors.signerPrivateKey);

  it('signer key derives the recorded address', () => {
    expect(wallet.address).toBe(vectors.signerAddress);
  });

  it('vectors were generated under the hardcoded ACTION_TYPEHASH', () => {
    expect(vectors.actionTypehash).toBe(ACTION_TYPEHASH);
  });

  for (const testCase of vectors.cases) {
    it(`reproduces ${testCase.name}`, () => {
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
          data: testCase.dataHex,
          expirySec: inputs.signature_expiry_sec,
          owner: inputs.owner,
          signer: inputs.signer,
        },
        vectors.domainSeparator,
      );
      expect(action.actionHash()).toBe(testCase.actionHash);
      expect(action.digest()).toBe(testCase.typedDataHash);
      expect(action.sign(wallet).signature).toBe(testCase.signature);
    });
  }
});
