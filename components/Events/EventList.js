import EventItem from "./EventItem";
import classes from "./EventList.module.css";

export default function EventList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem item={item} key={item.id} />
      ))}
    </ul>
  );
}
