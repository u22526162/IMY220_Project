// Amadeus Fidos u22526162
import { MongoClient } from 'mongodb';

let db, client;

export async function connectDB() {
  try {
    client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    db = client.db('IMY220_project');
    return db;
  } catch (error) {
    console.error('db connect error:', error);
    process.exit(1);
  }
}

export function getDB() {
  if (!db)
    throw new Error('Database not connected. Call connect() first.');
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close();
  }
}