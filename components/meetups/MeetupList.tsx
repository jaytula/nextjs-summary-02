import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

export interface IMeetup {
  id: string;
  image: string;
  title: string;
  address: string;
  description: string;
}

function MeetupList({ meetups }: { meetups: IMeetup[] }) {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          description={meetup.description}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
