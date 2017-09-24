import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import Root from './components/Root';
import configureStore from './configure-store';
// import googleApi from './google-api-loader';

const store = configureStore();

// googleApi.inject();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

registerServiceWorker();
