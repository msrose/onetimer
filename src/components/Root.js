import React from 'react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router basename="/onetimer">
      <App />
    </Router>
  </Provider>
);

export default Root;
