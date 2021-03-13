import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { formatEventsData } from "../../helpers/api-util";
import AppButton from "../../components/UI/AppButton";
import ErrorAlert from "../../components/UI/ErrorAlert";
import EventList from "../../components/Events/EventList";
import EventsResultsTitle from "../../components/Events/EventsResultsTitle";

const validateFilterData = ({ year, month }) => {
  return (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  );
};

const renderError = (text) => (
  <Fragment>
    <ErrorAlert>
      <p>{text}</p>
    </ErrorAlert>
    <div className="center">
      <AppButton link="/events">Show All Events</AppButton>
    </div>
  </Fragment>
);

export default function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const { data, error } = useSWR(
    "https://react-course-ddef7-default-rtdb.firebaseio.com/events.json"
  );

  useEffect(() => {
    if (data) {
      setLoadedEvents(formatEventsData(data));
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filterData = router.query.slug;
  const [year, month] = filterData;
  const numYear = +year;
  const numMonth = +month;
  const dataInvalid = validateFilterData({ year: numYear, month: numMonth });

  if (dataInvalid || error) {
    return renderError("Invalid filter. Please adjust your values!");
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || !filteredEvents.length) {
    return renderError("No events found for the chosen filter!!");
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventsResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}
