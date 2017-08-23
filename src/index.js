import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configure-store';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
