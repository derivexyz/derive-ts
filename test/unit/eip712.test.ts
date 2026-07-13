import { keccak256, toUtf8Bytes } from 'ethers';
import { describe, expect, it } from 'vitest';
import { ACTION_TYPEHASH, domainSeparator } from '../../src/signing/eip712';

describe('domainSeparator', () => {
  /** Pins the documented mainnet vector and the EIP-712 word ordering. */
  it('matches the mainnet vector for the Matching contract', () => {
    expect(domainSeparator({ chainId: 957 })).toBe(
      '0xd96e5f90797da7ec8dc4e276260c7f3f87fedf68775fbe1ef116e996fc60441b',
    );
  });

  it('ACTION_TYPEHASH is the keccak of the canonical Action struct string', () => {
    expect(
      keccak256(
        toUtf8Bytes(
          'Action(uint256 subaccountId,uint256 nonce,address module,bytes data,uint256 expiry,address owner,address signer)',
        ),
      ),
    ).toBe(ACTION_TYPEHASH);
  });
});
