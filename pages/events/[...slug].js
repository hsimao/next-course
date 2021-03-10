import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
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

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = filterData;
  const numYear = +year;
  const numMonth = +month;

  const dataInvalid = validateFilterData({ year: numYear, month: numMonth });

  if (dataInvalid) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <AppButton link="/events">Show All Events</AppButton>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <AppButton link="/events">Show All Events</AppButton>
        </div>
      </Fragment>
    );
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
