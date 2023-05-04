import { NextApiHandler } from 'next';
import axios from 'axios';
import clientPromise from '../lib/mongodb';

interface Site {
  website: string;
}

const saveSitesToDatabase = async () => {
  const client = await clientPromise;
  const db = client.db('my-database');
  const collection = db.collection<Site>('sites');

  // Retrieve the data from the publicsuffixlist API
  const response = await axios.get<string>('https://publicsuffix.org/list/public_suffix_list.dat');

  // Parse the data and create an array of objects to insert into the database
  const sites = response.data
    .split('\n')
    .filter((line) => !line.startsWith('//'))
    .map((line) => ({ website: line.trim() }));

  // Create the collection if it doesn't exist
  await db.createCollection('sites');

  // Delete all existing documents in the collection
  await collection.deleteMany({});

  // Insert the new documents into the collection
  const result = await collection.insertMany(sites);

  console.log(`Inserted ${result.insertedCount} documents into the database`);
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await saveSitesToDatabase();
    res.status(200).json({ message: 'Sites successfully saved to the database' });
  } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error saving sites to database' });
  }
  };
  
  export default handler;
