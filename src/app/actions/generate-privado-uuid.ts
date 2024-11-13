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

    // Check if the collection exists
    const collections = await db
      .listCollections({ name: PRIVADO_LINK_COLLECTION_NAME })
      .toArray();

    // Define the TTL value for one year
    const oneYearInSeconds = 365 * 24 * 60 * 60; // 31,536,000 seconds

    if (collections.length === 0) {
      // Collection does not exist, create it
      await db.createCollection(PRIVADO_LINK_COLLECTION_NAME);

      // Create TTL index on 'createdAt' field
      await collection.createIndex(
        { createdAt: 1 },
        { expireAfterSeconds: oneYearInSeconds },
      );
    } else {
      // Check if the TTL index exists and update it if necessary
      const indexes = await collection.indexInformation({ full: true });
      const ttlIndex = indexes.find(
        (index: any) => index.name === 'createdAt_1',
      );

      if (!ttlIndex) {
        // Index does not exist, create it
        await collection.createIndex(
          { createdAt: 1 },
          { expireAfterSeconds: oneYearInSeconds },
        );
      } else if (ttlIndex.expireAfterSeconds !== oneYearInSeconds) {
        // Index exists but with a different TTL, recreate it
        await collection.dropIndex('createdAt_1');
        await collection.createIndex(
          { createdAt: 1 },
          { expireAfterSeconds: oneYearInSeconds },
        );
      }
    }

    // Insert the data with a 'createdAt' field
    await collection.insertOne({
      _id: uuid,
      data: data,
      createdAt: new Date(),
    });

    return uuid;
  } catch (error) {
    console.error('Error in generatePrivadoUuid:', error);
    throw error;
  }
}
