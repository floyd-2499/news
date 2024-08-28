import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import "./assets/styles/global.scss";
import App from './App';
import store from './api/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

