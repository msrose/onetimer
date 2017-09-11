import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { debounce } from 'lodash';

import rootReducer from './reducers';

export default function configureStore() {
  const middleware = [thunk];

  if(process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');
    middleware.push(createLogger({ collapsed: true }));
  }

  const storedEntities = localStorage.getItem('entities');
  const entities = storedEntities ? JSON.parse(storedEntities) : {};

  const preloadedState = { entities };

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );

  store.subscribe(debounce(() => {
    const { entities } = store.getState();
    localStorage.setItem('entities', JSON.stringify(entities));
  }, 1100)); // debounce for longer than timer display counter interval

  return store;
}
