import { NextApiHandler } from 'next';
import clientPromise from '../lib/mongodb';
import { Collection, MongoClient } from 'mongodb';
import { Domain } from '../api/interfaces/Domain';

const handler: NextApiHandler = async (req, res) => {
  const client: MongoClient = await clientPromise;
  const db = client.db("my-new-list");

  console.log(req.body, "reqbody");

  switch (req.method) {
    case "POST":
      let bodyObject: Domain = JSON.parse(req.body);
      let myPost = await db.collection<Domain>("domains").insertOne(bodyObject);
      res.json((myPost as any).ops[0]);
      break;
    case "GET":
      const allDomains: Domain[] = await db.collection<Domain>("domains").find({}).toArray();
      res.json({ status: 200, data: allDomains });
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;