import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import Root from './components/Root';
import configureStore from './configure-store';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

registerServiceWorker();
