import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import UserProvider from './database/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </UserProvider>
);
