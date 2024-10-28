// src/App.jsx
import React, { useState } from 'react';
import GoogleSignIn from './components/GoogleSignIn';
const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    setAccessToken(credentialResponse.credential);
  };


  return (
    <div>
      <h1>Google Calendar Integration</h1>
      <GoogleSignIn onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default App;
