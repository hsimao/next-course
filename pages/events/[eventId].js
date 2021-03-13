import Head from "next/head";
import EventSummary from "../../components/EventDetail/EventSummary";
import EventLogistics from "../../components/EventDetail/EventLogistics";
import EventContent from "../../components/EventDetail/EventContent";
import ErrorAlert from "../../components/UI/ErrorAlert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

export default function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  const { title, date, location, image, description } = event;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </div>
  );
}

export async function getStaticProps(content) {
  const eventId = content.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30 //  每隔 30 秒有人請求時才會重新產生靜態檔案
  };
}

export async function getStaticPaths() {
  // 只抓取有加入我的最愛的 events 來預產生靜態檔案
  const events = await getFeaturedEvents();
  const paths = events.map(({ id }) => ({
    params: { eventId: id }
  }));

  return {
    paths,
    fallback: true
  };
}
