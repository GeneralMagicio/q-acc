'use server';

import { Address } from 'viem';
import { Db } from 'mongodb';
import { getMongoDB } from '@/lib/db';

export type AddressWhitelist = {
  deployerEOA: Address;
  fundingPotMultisig: Address;
  projectMultisig: Address;
  qAccProjectOwner: Address;
};

export async function checkWhitelist(
  projectOwner?: Address,
): Promise<AddressWhitelist | null> {
  if (!projectOwner) {
    return null;
  }
  const db: Db = await getMongoDB();
  const result = await db
    .collection<AddressWhitelist>('addressWhitelist')
    .findOne({
      qAccProjectOwner: {
        $regex: new RegExp(`^${projectOwner}$`, 'i'),
      },
    });

  return result
    ? {
        deployerEOA: result.deployerEOA,
        fundingPotMultisig: result.fundingPotMultisig,
        projectMultisig: result.projectMultisig,
        qAccProjectOwner: result.qAccProjectOwner,
      }
    : null;
}

export async function checkSafeAddress(userAddress?: string) {
  if (!userAddress) {
    return null;
  }
  const safeAddress = ['0xc15AE74679F1E4498B758B97a4f25563c2F4761a'];
  if (safeAddress.includes(userAddress)) {
    return true;
  }
  return false;
}
