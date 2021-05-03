import { GetStaticProps } from "next";
import MeetupList, { IMeetup } from "../components/meetups/MeetupList";

const DUMMY_MEETUPS: IMeetup[] = [
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
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
};

export default HomePage;
