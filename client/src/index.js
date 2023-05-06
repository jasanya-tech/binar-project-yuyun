import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {GoogleOAuthProvider} from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='508742450025-4remddhf67i78e8q7dm8q3j75mslmtn5.apps.googleusercontent.com'>
        <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);