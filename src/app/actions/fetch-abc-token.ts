'use server';

import { Collection, Db } from 'mongodb';
import { getMongoDB } from '@/lib/db';

export async function fetchAbcToken(param: { projectAddress: string }) {
  const { projectAddress } = param;

  const db: Db = await getMongoDB();
  const projectCollection: Collection = db.collection('project');

  // Find a document where the `abc` field exists and is not empty/null for the given user address
  const project = await projectCollection.findOne({
    projectAddress: projectAddress.toLowerCase(),
  });

  return project as any;
}
