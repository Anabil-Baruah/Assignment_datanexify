// src/components/CreateEventForm.jsx
import React, { useState } from 'react';
import { createCalendarEvent } from '../calendarUtils';

const CreateEventForm = ({ accessToken, onEventCreated }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventDetails = {
      summary: title,
      start: { dateTime: new Date(startTime).toISOString() },
      end: { dateTime: new Date(endTime).toISOString() },
    };

    try {
      await createCalendarEvent(accessToken, eventDetails);
      onEventCreated();  // Refresh events after creation
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;
