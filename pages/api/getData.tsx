import { NextApiHandler } from 'next';
import clientPromise from '../lib/mongodb';
import { Collection, MongoClient } from 'mongodb';

interface Site {
  website: string;
}

const handler: NextApiHandler = async (req, res) => {
  const client: MongoClient = await clientPromise;
  const db = client.db("my-database");

  switch (req.method) {
    case "POST":
      let bodyObject: Site = JSON.parse(req.body);
      let myPost = await db.collection<Site>("sites").insertOne(bodyObject);
      res.json((myPost as any).ops[0]);
      break;
    case "GET":
      const allSites: Site[] = await db.collection<Site>("sites").find({}).toArray();
      res.json({ status: 200, data: allSites });
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;