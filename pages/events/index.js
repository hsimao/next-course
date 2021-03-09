import Head from "next/head";
import { getFeaturedEvents } from "../../dummy-data";
import EventList from "../../components/Events/EventList";

export default function AllEventsPage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>All Events Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
}