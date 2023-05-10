import { NextApiHandler } from 'next';
import clientPromise from '../lib/mongodb';
import { Domain } from '../api/interfaces/Domain';

const getSitesFromDatabase: NextApiHandler = async (_req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('my-new-list');
    const collection = db.collection<Domain>('domains');
    const domains = await collection.find().toArray();
    sessionStorage.setItem('domains', JSON.stringify(domains));
    res.status(200).json({ message: 'Domains successfully fetched from the database and stored in sessionStorage' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sites from database' });
  }
};

export default getSitesFromDatabase;
