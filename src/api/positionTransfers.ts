import { formatUnits } from 'ethers';
import { encodeRfqExecute, encodeRfqQuote, sortRfqLegs } from '../codecs/rfq';
import { SignedAction } from '../signing/action';
import { expiresIn, randomNonce, toE18, type DecimalLike } from '../signing/encoding';
import { domainSeparator } from '../signing/eip712';
import type { Direction, InstrumentPublicResponse, TransferPositionsWireResponse } from '../types';
import type { ClientContext } from './context';

/** One priced position leg shared by both sides of a position transfer. */
export interface PositionTransferLeg {
  instrumentName: string;
  amount: DecimalLike;
  price: DecimalLike;
  direction: Direction;
}

export interface TransferPositionsParams {
  /** Subaccount signing the maker quote. Must differ from `takerSubaccountId`. */
  makerSubaccountId: number;
  /** Subaccount signing the taker execute. Must differ from `makerSubaccountId`. */
  takerSubaccountId: number;
  /** Maker quote direction. The SDK derives the taker's opposite direction. */
  makerDirection: Direction;
  /** The exact priced package both sides authorize. */
  legs: PositionTransferLeg[];
  makerNonce?: string;
  takerNonce?: string;
  /** Shared signature expiry for both sides. Defaults to 700 seconds from now. */
  signatureExpirySec?: number;
}

interface ResolvedPositionTransferLeg {
  instrumentName: string;
  assetAddress: string;
  subId: string;
  price: bigint;
  amount: bigint;
  direction: Direction;
}

/**
 * Transfers perp/option positions between two subaccounts owned by the same
 * wallet. The route executes an RFQ internally, so the SDK signs a zero-fee
 * maker quote and the matching opposite-direction taker execute.
 */
export class PositionTransfersApi {
  private readonly instruments = new Map<string, Promise<InstrumentPublicResponse>>();

  constructor(private readonly ctx: ClientContext) {}

  async transferPositions(params: TransferPositionsParams): Promise<TransferPositionsWireResponse> {
    if (params.makerSubaccountId === params.takerSubaccountId) {
      throw new Error('makerSubaccountId and takerSubaccountId must be different');
    }
    if (params.legs.length === 0) {
      throw new Error('transferPositions needs at least one leg');
    }

    const makerNonce = params.makerNonce ?? randomNonce();
    const takerNonce = params.takerNonce ?? randomNonce();
    if (makerNonce === takerNonce) {
      throw new Error('makerNonce and takerNonce must be different');
    }

    const expirySec = params.signatureExpirySec ?? expiresIn(700);
    const takerDirection: Direction = params.makerDirection === 'buy' ? 'sell' : 'buy';
    const legs = await this.resolveLegs(params.legs);
    const maker = this.signAction(
      params.makerSubaccountId,
      makerNonce,
      expirySec,
      encodeRfqQuote({ maxFee: 0n, direction: params.makerDirection, legs }),
    );
    const taker = this.signAction(
      params.takerSubaccountId,
      takerNonce,
      expirySec,
      encodeRfqExecute({ maxFee: 0n, direction: takerDirection, legs }),
    );
    const wireLegs = legs.map(wireLeg);

    return this.ctx.send('private/transfer_positions', {
      wallet: this.ctx.credentials().ownerAddress,
      maker_params: {
        subaccount_id: params.makerSubaccountId,
        direction: params.makerDirection,
        legs: wireLegs,
        max_fee: formatUnits(0n, 18),
        nonce: makerNonce,
        signer: maker.signer,
        signature: maker.signature,
        signature_expiry_sec: expirySec,
      },
      taker_params: {
        subaccount_id: params.takerSubaccountId,
        direction: takerDirection,
        legs: wireLegs,
        max_fee: formatUnits(0n, 18),
        nonce: takerNonce,
        signer: taker.signer,
        signature: taker.signature,
        signature_expiry_sec: expirySec,
      },
    });
  }

  private async resolveLegs(legs: PositionTransferLeg[]): Promise<ResolvedPositionTransferLeg[]> {
    return sortRfqLegs(
      await Promise.all(
        legs.map(async (leg) => {
          const instrument = await this.instrument(leg.instrumentName);
          return {
            instrumentName: leg.instrumentName,
            assetAddress: instrument.base_asset_address,
            subId: instrument.base_asset_sub_id,
            price: toE18(leg.price),
            amount: toE18(leg.amount),
            direction: leg.direction,
          };
        }),
      ),
    );
  }

  private instrument(name: string): Promise<InstrumentPublicResponse> {
    let lookup = this.instruments.get(name);
    if (!lookup) {
      lookup = this.ctx.send('public/get_instrument', { instrument_name: name });
      lookup.catch(() => this.instruments.delete(name));
      this.instruments.set(name, lookup);
    }
    return lookup;
  }

  private signAction(
    subaccountId: number,
    nonce: string,
    expirySec: number,
    data: string,
  ): { signer: string; signature: string } {
    const { ownerAddress, signer } = this.ctx.credentials();
    const action = new SignedAction(
      {
        subaccountId,
        nonce,
        module: this.ctx.network.modules.rfq,
        data,
        expirySec,
        owner: ownerAddress,
        signer: signer.address,
      },
      domainSeparator(this.ctx.network),
    ).sign(signer);
    return { signer: action.fields.signer, signature: action.signature! };
  }
}

function wireLeg(leg: ResolvedPositionTransferLeg): {
  amount: string;
  direction: Direction;
  instrument_name: string;
  price: string;
} {
  return {
    amount: formatUnits(leg.amount, 18),
    direction: leg.direction,
    instrument_name: leg.instrumentName,
    price: formatUnits(leg.price, 18),
  };
}
