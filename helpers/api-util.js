export const formatEventsData = (data) => {
  return Object.keys(data).map((eventId) => ({
    id: eventId,
    ...data[eventId]
  }));
};

export async function getAllEvents() {
  const data = await fetch(
    "https://react-course-ddef7-default-rtdb.firebaseio.com/events.json"
  )
    .then((res) => res.json())
    .then((data) => data);

  return formatEventsData(data);
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
