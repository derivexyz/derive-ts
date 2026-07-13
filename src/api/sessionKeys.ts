import { getAddress, type BaseWallet } from 'ethers';
import { OffchainScope, ProtocolScopeWireString, type ProtocolScopeCode } from '../auth/scopes';
import { encodeCreateSessionKeyActionData } from '../codecs/sessionKey';
import { SignedAction } from '../signing/action';
import { domainSeparator } from '../signing/eip712';
import { expiresIn, randomNonce } from '../signing/encoding';
import type { PrivateCreateSessionKeyEdgeRPCResponse, SessionKeyResponse } from '../types';
import type { ClientContext } from './context';

export interface CreateSessionKeyParams {
  /** The key being authorized: an address, or an ethers wallet (e.g. `Wallet.createRandom()`). */
  publicSessionKey: string | BaseWallet;
  /**
   * The KEY's lifetime as a unix-seconds timestamp, committed in the signed
   * data — not to be confused with `signatureExpirySec`, which only bounds
   * how long this registration request itself stays valid.
   */
  expirySec: number;
  /**
   * Protocol scopes granted (numeric codes; the wire strings are derived).
   * Defaults to NONE — the key can then only authenticate and use its
   * offchain scopes. Grant `ProtocolScopeCode.Admin` deliberately, never
   * by default.
   */
  protocolScopes?: ProtocolScopeCode[];
  /** Off-chain scopes, e.g. `[OffchainScope.AccountInfo]`. Defaults to account_info. */
  offchainScopes?: OffchainScope[];
  /** Subaccounts the key may act on. Omit for ALL current and future subaccounts. */
  subaccountIds?: number[];
  label?: string;
  /** Source IPs the key may be used from; omit for no restriction. */
  ipWhitelist?: string[];
  /** Envelope expiry of the registration signature. Defaults to 10 minutes. */
  signatureExpirySec?: number;
  nonce?: string;
}

export interface EditSessionKeyParams {
  publicSessionKey: string;
  /** Omitted fields are left unchanged (the endpoint is a patch). */
  label?: string;
  /** Requires the request to be authorized by the owner or an admin-scoped key. */
  ipWhitelist?: string[];
  /** Requires the request to be authorized by the owner or an admin-scoped key. */
  offchainScopes?: OffchainScope[];
}

/**
 * Session-key registration and management. Keys are wallet-level: actions
 * are signed on subaccount 0 and the granted subaccount list lives inside
 * the signed data, not the envelope.
 */
export class SessionKeysApi {
  constructor(private readonly ctx: ClientContext) {}

  /**
   * Registers a scoped session key. The action must be authorized by the
   * account owner or by a registered session key holding the
   * `create_session_key` scope — a child key must then be a subset of its
   * creator (scopes, subaccounts, and expiry no later than the creator's).
   * Signs with the client's action signer, so a client configured with an
   * unscoped session key will be rejected server-side.
   */
  async create(params: CreateSessionKeyParams): Promise<PrivateCreateSessionKeyEdgeRPCResponse> {
    const publicSessionKey = getAddress(
      typeof params.publicSessionKey === 'string' ? params.publicSessionKey : params.publicSessionKey.address,
    );
    const scopes = params.protocolScopes ?? [];
    const offchainScopes = params.offchainScopes ?? [OffchainScope.AccountInfo];
    const { ownerAddress, signer } = this.ctx.credentials();
    const action = new SignedAction(
      {
        subaccountId: 0,
        nonce: params.nonce ?? randomNonce(),
        module: this.ctx.network.modules.createSessionKey,
        data: encodeCreateSessionKeyActionData({
          sessionKey: publicSessionKey,
          expirySec: params.expirySec,
          scopes,
          subaccountIds: params.subaccountIds ?? [],
        }),
        expirySec: params.signatureExpirySec ?? expiresIn(600),
        owner: ownerAddress,
        signer: signer.address,
      },
      domainSeparator(this.ctx.network),
    ).sign(signer);

    return this.ctx.send('private/create_session_key', {
      wallet: ownerAddress,
      public_session_key: publicSessionKey,
      expiry_sec: params.expirySec,
      subaccount_ids: params.subaccountIds ?? null,
      nonce: action.fields.nonce,
      signer: action.fields.signer,
      // sign() above guarantees the signature is set
      signature: action.signature!,
      signature_expiry_sec: action.fields.expirySec,
      protocol_scopes: scopes.map((code) => ProtocolScopeWireString[code]),
      offchain_scopes: offchainScopes,
      label: params.label,
      ip_whitelist: params.ipWhitelist,
    });
  }

  /** All registered session keys of the owner wallet. */
  async list(): Promise<SessionKeyResponse[]> {
    const result = await this.ctx.send('private/session_keys', {
      wallet: this.ctx.credentials().ownerAddress,
    });
    return result.public_session_keys;
  }

  /**
   * Patches a key's OFF-CHAIN attributes. Protocol scopes, subaccounts,
   * and expiry are committed in the signed registration and cannot be
   * edited — register a replacement key instead. The public API has no
   * revoke endpoint: a key stops working at its signed `expiry_sec`.
   */
  async edit(params: EditSessionKeyParams): Promise<SessionKeyResponse> {
    return this.ctx.send('private/edit_session_key', {
      wallet: this.ctx.credentials().ownerAddress,
      public_session_key: getAddress(params.publicSessionKey),
      label: params.label,
      ip_whitelist: params.ipWhitelist,
      offchain_scopes: params.offchainScopes,
    });
  }
}
