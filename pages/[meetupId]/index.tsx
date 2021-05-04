import { MongoClient, ObjectId } from "mongodb";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { DUMMY_MEETUPS } from "..";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { IMeetup } from "../../components/meetups/MeetupList";

const getDatabaseConnection = async () => {
  return MongoClient.connect(process.env.MONGO_URI as string, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

function MeetupDetails({ meetupData }: { meetupData: IMeetup }) {
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        id={meetupData.id}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
        image={meetupData.image}
      />
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const client = await getDatabaseConnection();
  const meetupsCollection = client.db().collection("meetups");

  const meetup = await meetupsCollection.findOne({
    _id: new ObjectId(context.params.meetupId as string),
  });
  const meetupData = { ...meetup };
  meetupData.id = meetupData._id.toString();
  delete meetupData._id;

  return {
    props: {
      meetupData: meetupData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await getDatabaseConnection();
  const meetupsCollection = client.db().collection("meetups");

  const meetups = await meetupsCollection
    .find({})
    .project({ _id: 1 })
    .toArray();
  const meetupIds = meetups.map((meetup) => meetup._id.toString());
  client.close();

  return {
    paths: meetupIds.map((meetupId) => ({ params: { meetupId } })),
    fallback: 'blocking',
  };
};

export default MeetupDetails;
