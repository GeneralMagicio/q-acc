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

    // Check if the collection exists
    const collections = await db
      .listCollections({ name: PRIVADO_LINK_COLLECTION_NAME })
      .toArray();

    if (collections.length === 0) {
      // Collection does not exist, create it
      await db.createCollection(PRIVADO_LINK_COLLECTION_NAME);

      // Create TTL index on 'createdAt' field
      await db
        .collection(PRIVADO_LINK_COLLECTION_NAME)
        .createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
    }

    const collection = db.collection<IPrivadoStoredData>(
      PRIVADO_LINK_COLLECTION_NAME,
    );

    // Insert the data with a 'createdAt' field
    await collection.insertOne({
      _id: uuid,
      data: data,
      createdAt: new Date(),
    });

    return uuid;
  } catch (error) {
    console.error('Error in generatePrivadoUuid:', error);
    return null;
  }
}
