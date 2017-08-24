import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore() {
  const middleware = [thunk];
  if(process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');
    middleware.push(createLogger({ collapsed: true }));
  }
  const store = createStore(rootReducer, applyMiddleware(...middleware));
  return store;
}
