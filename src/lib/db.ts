import * as mongoDB from 'mongodb';

let mongoClient: mongoDB.MongoClient;

export async function connectToMongo() {
  const url = process.env.MONGODB_CONNECTION_URL;
  if (!url) {
    throw new Error('MONGODB_CONNECTION_URL is not set');
  }
  if (!mongoClient) {
    mongoClient = new mongoDB.MongoClient(url);
    await mongoClient.connect();
  }
  return mongoClient;
}

export async function getMongoDB(): Promise<mongoDB.Db> {
  const client = await connectToMongo();
  return client.db('abc-launcher');
}
