import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'  // from bootstrap lib
import 'bootstrap/dist/css/bootstrap.min.css';  // from react-bootstrap lib
import 'bootstrap/dist/js/bootstrap.bundle.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

