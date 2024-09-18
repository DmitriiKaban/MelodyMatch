import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  // clientId needs to be added
  <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">  
    <App />
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
