import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/Events/EventList";
import EventsSearch from "../../components/Events/EventsSearch";

export default function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  const findEvents = ({ year, month }) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventsSearch onSearch={findEvents} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: { events },
    revalidate: 60
  };
}
