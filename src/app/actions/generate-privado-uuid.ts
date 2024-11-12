'use server';

// eslint-disable-next-line import/named
import { v4 as uuidv4 } from 'uuid';
import { getMongoDB } from '@/lib/db';
import { PRIVADO_LINK_COLLECTION_NAME } from '@/lib/constants/privado';
import { IPrivadoStoredData } from '@/types/privado.type';

export async function generatePrivadoUuid(data: object) {
  try {
    const uuid = uuidv4();
    const db = await getMongoDB();
    const collection = db.collection<IPrivadoStoredData>(
      PRIVADO_LINK_COLLECTION_NAME,
    );

    // Insert the data with a 'createdAt' field
    await collection.insertOne({
      _id: uuid,
      data: data,
      createdAt: new Date(),
    });

    // Create TTL index on 'createdAt' field if not already created
    await collection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 3600 },
    );

    return uuid;
  } catch (error) {
    console.error('Error in POST handler:', error);
    return null;
  }
}
