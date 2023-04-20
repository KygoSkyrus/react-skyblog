import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

ReactDOM.render(
  <GoogleOAuthProvider clientId="371526208721-u9ce3pinmkt2aa959r57j9u2q9crul09.apps.googleusercontent.com">
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

