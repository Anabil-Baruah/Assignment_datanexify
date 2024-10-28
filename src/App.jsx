// src/App.jsx
import React, { useState } from 'react';
import GoogleSignIn from './components/GoogleSignIn';
import CreateEventForm from './components/CreateEventForm';
import EventsList from './Components/EventsList';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    setAccessToken(credentialResponse.credential);
  };

  const handleEventCreated = () => {
    // Placeholder to trigger event list refresh, e.g., through a state update
  };

  return (
    <div>
      <h1>Google Calendar Integration</h1>
      {!accessToken ? (
        <GoogleSignIn onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <CreateEventForm accessToken={accessToken} onEventCreated={handleEventCreated} />
          <EventsList accessToken={accessToken} />
        </>
      )}
    </div>
  );
};

export default App;
