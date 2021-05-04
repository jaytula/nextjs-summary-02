import { MongoClient } from "mongodb";
import { GetServerSideProps, GetStaticProps } from "next";
import MeetupItem from "../components/meetups/MeetupItem";
import MeetupList, { IMeetup } from "../components/meetups/MeetupList";

export const DUMMY_MEETUPS: IMeetup[] = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG",
    address: "Some address 10, 12345 Some City",
    description: "This is a second meetup!",
  },
];

const HomePage = ({ meetups }: { meetups: IMeetup[] }) => {
  return <MeetupList meetups={meetups} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray()
  const adjustedMeetups = meetups.map(item => {
    const adjustedItem = {...item};
    adjustedItem.id = item._id.toString();
    delete adjustedItem._id;
    return adjustedItem;
  })

  client.close();

  return {
    props: {
      meetups: adjustedMeetups,
    },
    // Page is regenerated every 10 seconds with revalidate
    revalidate: 10
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage;
