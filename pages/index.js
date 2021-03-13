import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/Events/EventList";

export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home Page</h1>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800 //  每隔 30 分鐘有人請求時才會重新產生靜態檔案
  };
}
