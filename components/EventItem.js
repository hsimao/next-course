import AppButton from "./AppButton";
import DateIcon from "./icons/date-icon";
import AddressIcon from "./icons/address-icon";
import ArrowRightIcon from "./icons/arrow-right-icon";
import classes from "./EventItem.module.css";

export default function EventList(props) {
  const {
    item: { title, image, date, location, id }
  } = props;

  const formatDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const formatLocation = location.replace(",", "\n");
  const formatImage = `/${image}`;
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={formatImage} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formatDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formatLocation}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <AppButton link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </AppButton>
        </div>
      </div>
    </li>
  );
}
