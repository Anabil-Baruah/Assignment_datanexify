// src/components/EventsList.jsx
import React, { useEffect, useState } from 'react';
import { listCalendarEvents } from '../calendarUtils';

const EventsList = ({ accessToken }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await listCalendarEvents(accessToken);
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [accessToken]);

  return (
    <div>
      <h3>Your Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.summary}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
