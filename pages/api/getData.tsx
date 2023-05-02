import { NextApiHandler } from 'next';
import clientPromise from './lib/mongodb';
import { Collection, MongoClient } from 'mongodb';

interface Post {
  website: string,
}

const handler: NextApiHandler = async (req, res) => {
  const client: MongoClient = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");

  switch (req.method) {
    case "POST":
      let bodyObject: Post = JSON.parse(req.body);
      let myPost = await db.collection<Post>("posts").insertOne(bodyObject);
      res.json((myPost as any).ops[0]);
      break;
    case "GET":
      const allPosts: Post[] = await db.collection<Post>("posts").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;