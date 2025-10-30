import { MongoClient } from 'mongodb';

let db, client;

export async function connectDB() {
  try {
    client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    db = client.db('IMY220');
    console.log('connected to DB'); //log for debugging only delete later
    return db;
  } catch (error) {
    console.error('db connect error:', error);
    process.exit(1);
  }
}

export async function getDB() {
  if (!db)
    throw new Error('Database not connected. Call connect() first.');
  return db;
}

export async function closeDB() {
  if (client) {
    await client.close();
  }
}