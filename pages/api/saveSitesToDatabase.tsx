import { NextApiHandler } from 'next';
import axios from 'axios';
import clientPromise from '../lib/mongodb';
import { Domain } from '../api/interfaces/Domain';

const saveSitesToDatabase: NextApiHandler = async (_req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('my-new-list');
    const collection = db.collection<Domain>('domains');

    const response = await axios.get<string>('https://publicsuffix.org/list/public_suffix_list.dat');
    const domains = response.data.split('\n')
      .filter(line => !line.startsWith('//') && !line.startsWith('!') && line.trim() !== '')
      .map(line => line.trim());
      
    await collection.createIndex({ domains: 1 });
    await collection.deleteMany({});
    const result = await collection.insertMany(domains.map(domain => ({ domains: domain })));
    console.log(`Inserted ${result.insertedCount} documents into the database`);
    res.status(200).json({ message: 'Domains successfully saved to the database' });

    setInterval(async () => {
      const response = await axios.get<string>('https://publicsuffix.org/list/public_suffix_list.dat');
      const domains = response.data.split('\n')
        .filter(line => !line.startsWith('//') && !line.startsWith('!') && line.trim() !== '')
        .map(line => line.trim());
      await collection.deleteMany({});
      const result = await collection.insertMany(domains.map(domain => ({ domains: domain })));
      console.log(`Inserted ${result.insertedCount} documents into the database`);
    }, 86400000); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving sites to database' });
  }
};



export default saveSitesToDatabase;
