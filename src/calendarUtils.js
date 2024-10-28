// src/calendarUtils.js
import axios from 'axios';

export const createCalendarEvent = async (accessToken, eventDetails) => {
  try {
    const response = await axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      eventDetails,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const listCalendarEvents = async (accessToken) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
