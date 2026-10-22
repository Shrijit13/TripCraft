import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { TripProvider } from './context/TripContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <TripProvider>
        <App />
      </TripProvider>
    </HashRouter>
  </React.StrictMode>
);
