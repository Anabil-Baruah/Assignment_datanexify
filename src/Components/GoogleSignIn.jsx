import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

const GoogleSignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    description: '',
    startDate: '',
    endDate: ''
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/calendar.events'
        })
        .then(() => gapi.client.load('calendar', 'v3'))
        .then(() => console.log("Google Calendar API loaded"))
        .catch((error) => console.error("Error loading Google Calendar API:", error));
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      setIsSignedIn(true);
      fetchEvents();
    });
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => setIsSignedIn(false));
  };

  const fetchEvents = async () => {
    if (!gapi.client.calendar) {
      console.error("Google Calendar API not initialized");
      return;
    }
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        maxResults: 10,
        orderBy: 'startTime',
        singleEvents: true
      });
      setEvents(response.result.items || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!gapi.client.calendar) {
      console.error("Google Calendar API not initialized");
      return;
    }

    const event = {
      summary: eventDetails.summary,
      description: eventDetails.description,
      start: {
        dateTime: `${eventDetails.startDate}:00`,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: `${eventDetails.endDate}:00`,
        timeZone: 'America/Los_Angeles',
      },
    };

    try {
      await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      alert('Event created successfully!');
      setEventDetails({
        summary: '',
        description: '',
        startDate: '',
        endDate: ''
      });
      fetchEvents(); // Refresh events to immediately show the new event
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      {!isSignedIn ? (
        <button onClick={handleSignIn}>Sign in with Google</button>
      ) : (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <h3>Create an Event</h3>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Event Summary"
              value={eventDetails.summary}
              onChange={(e) => setEventDetails({ ...eventDetails, summary: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={eventDetails.description}
              onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
            />
            <input
              type="datetime-local"
              value={eventDetails.startDate}
              onChange={(e) => setEventDetails({ ...eventDetails, startDate: e.target.value })}
              required
            />
            <input
              type="datetime-local"
              value={eventDetails.endDate}
              onChange={(e) => setEventDetails({ ...eventDetails, endDate: e.target.value })}
              required
            />
            <button type="submit">Add Event</button>
          </form>

          <h3>Upcoming Events</h3>
          <table>
            <thead>
              <tr>
                <th>Summary</th>
                <th>Description</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.summary}</td>
                  <td>{event.description}</td>
                  <td>{new Date(event.start.dateTime || event.start.date).toLocaleString()}</td>
                  <td>{new Date(event.end.dateTime || event.end.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default GoogleSignIn;
