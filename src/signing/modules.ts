/**
 * Canonical EIP-712 action module addresses. Every signed action's
 * `module` field commits to one of these — the same set on every
 * network (mainnet, testnet, local).
 */
export const V3_MODULE_ADDRESSES = {
  trade: '0xB8D20c2B7a1Ad2EE33Bc50eF10876eD3035b5e7b',
  transfer: '0x01259207A40925b794C8ac320456F7F6c8FE2636',
  withdrawal: '0x9d0E8f5b25384C7310CB8C6aE32C8fbeb645d083',
  rfq: '0x9371352CCef6f5b36EfDFE90942fFE622Ab77F1D',
  externalTransfer: '0x8F9B8f12ddA05FB1F0DDDDe8f5af8cECF54f8aC9',
  whitelistedRecipient: '0xB86D6DE1b76c9839e4BA860848CD98A1dABd6B54',
  vault: '0x2885c174ebf5524aED9c721d60c12b1537685186',
  liquidation: '0x66d23e59DaEEF13904eFA2D4B8658aeD05f59a92',
  createSessionKey: '0xe330CF64ff6EbF41699aad344Cb21d78db1D2bb6',
} as const;
