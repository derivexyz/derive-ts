import { Contract, getAddress, type Signer } from 'ethers';
import { ONCHAIN_ACTION_MANAGER_ABI } from '../abis/onchainActionManager';
import type { ProtocolScopeCode } from '../auth/scopes';
import { encodeCreateSessionKeyActionData } from '../codecs/sessionKey';
import type { ClientContext } from './context';

/**
 * Public onchain action types the OnchainActionManager routes through
 * `submit(actionType, data)`. Mirrors `OnchainActionType` in
 * crates/types/src/operations/onchain_action.rs — keep the values in sync.
 */
export const ONCHAIN_ACTION_TYPE = {
  /** Register / refresh / delete a session key from L1. */
  SetSessionKey: 51,
} as const;

export interface SetSessionKeyParams {
  /** Caller-provided ethers signer connected to the chain RPC (the SDK holds no provider). */
  signer: Signer;
  /** The key being authorized. */
  sessionKey: string;
  /**
   * The KEY's lifetime as a unix-seconds timestamp. The key stops working
   * once `expirySec <= now`; pass 0 to delete an existing key of this address
   * (use `revokeSessionKey` for that intent).
   */
  expirySec: number;
  /** Protocol scopes granted (numeric codes). Defaults to none (read-only key). */
  scopes?: readonly (ProtocolScopeCode | number)[];
  /** Subaccounts the key may act on; omit for ALL current and future subaccounts. */
  subaccountIds?: readonly (number | bigint)[];
}

export interface RevokeSessionKeyParams {
  /** Caller-provided ethers signer connected to the chain RPC. */
  signer: Signer;
  /** The key to remove. */
  sessionKey: string;
}

/**
 * Actions submitted on the Ethereum L1 through
 * `OnchainActionManager.submit(actionType, data)` — the path a smart
 * contract or multisig owner uses to operate its account, since it cannot
 * produce the single-key EIP-712 signature the offchain action envelope
 * needs. Unlike signed actions, an onchain action carries no signature,
 * module, nonce, or envelope expiry: the account owner is `msg.sender` of
 * `submit`, and replay protection is the action-id watermark.
 *
 * Deposits are deliberately NOT here — they call `deposit()` /
 * `depositToNewSubaccount()` directly through `deposits.contractCall.*`.
 *
 * The caller supplies an ethers Signer connected to the chain RPC (the SDK
 * holds no provider), exactly as with contract-call deposits. Each method
 * resolves once the transaction is mined; the exchange applies the action
 * asynchronously once its L1 listener observes it.
 */
export class OnchainActionsApi {
  constructor(private readonly ctx: ClientContext) {}

  /**
   * Registers or refreshes a session key by submitting a Set Session Key
   * action from L1. The submitting wallet (`params.signer`) must be the
   * account owner and already have an account — the exchange silently
   * ignores the action otherwise, and it cannot replace or delete a key
   * that belongs to a different wallet.
   */
  async setSessionKey(params: SetSessionKeyParams): Promise<{ txHash: string }> {
    const data = encodeCreateSessionKeyActionData({
      sessionKey: getAddress(params.sessionKey),
      expirySec: params.expirySec,
      scopes: params.scopes ?? [],
      subaccountIds: params.subaccountIds ?? [],
    });
    const tx = await this.actionManager(params.signer).getFunction('submit')(ONCHAIN_ACTION_TYPE.SetSessionKey, data);
    await tx.wait();
    return { txHash: tx.hash as string };
  }

  /**
   * Removes a session key. Revocation is a Set Session Key action with
   * `expirySec: 0`, which deletes the key — there is no separate revoke
   * action, and the offchain API has no revoke endpoint at all.
   */
  async revokeSessionKey(params: RevokeSessionKeyParams): Promise<{ txHash: string }> {
    return this.setSessionKey({ signer: params.signer, sessionKey: params.sessionKey, expirySec: 0 });
  }

  private actionManager(signer: Signer): Contract {
    const managerAddress = this.ctx.network.contracts.actionManager;
    if (!managerAddress) {
      throw new Error(
        `network '${this.ctx.network.name}' has no actionManager contract configured — ` +
          'onchain actions need a NetworkConfig with contracts.actionManager set',
      );
    }
    return new Contract(managerAddress, ONCHAIN_ACTION_MANAGER_ABI, signer);
  }
}
