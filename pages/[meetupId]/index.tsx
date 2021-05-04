import { GetStaticPaths, GetStaticProps } from "next";
import { DUMMY_MEETUPS } from "..";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { IMeetup } from "../../components/meetups/MeetupList";

function MeetupDetails({ meetupData }: { meetupData: IMeetup }) {
  return (
    <MeetupDetail
      id={meetupData.id}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
      image={meetupData.image}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const meetupData = DUMMY_MEETUPS.find(
    (meetup) => meetup.id === context.params.meetupId
  );
  return {
    props: {
      meetupData: meetupData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: DUMMY_MEETUPS.map((meetup) => ({ params: { meetupId: meetup.id } })),
    fallback: false,
  };
};

export default MeetupDetails;
