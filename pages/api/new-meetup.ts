import { NextApiHandler } from "next";
import { MongoClient } from "mongodb";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { title, image, address, description } = data;

  const client = await MongoClient.connect(process.env.MONGO_URI as string);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const newMeetup = {
    title,
    image,
    address,
    description,
  };
  const result = await meetupsCollection.insertOne(newMeetup);
  console.log(result);
  client.close();

  res.status(201).json({
    message: "Meetup inserted!",
  });
};

export default handler;
