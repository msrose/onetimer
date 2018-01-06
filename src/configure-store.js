import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import debounce from 'lodash/debounce';

import rootReducer from './reducers';

export default function configureStore() {
  const middleware = [thunk];

  if(process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');
    middleware.push(createLogger({ collapsed: true }));
  }

  const storedEntities = localStorage.getItem('entities');
  const entities = storedEntities && JSON.parse(storedEntities);

  const storedActivePuzzle = localStorage.getItem('activePuzzle');
  const activePuzzle = storedActivePuzzle && JSON.parse(storedActivePuzzle);

  const preloadedState = {};

  if(entities) preloadedState.entities = entities;
  if(activePuzzle) preloadedState.activePuzzle = activePuzzle;

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );

  store.subscribe(debounce(() => {
    const { entities, activePuzzle } = store.getState();
    localStorage.setItem('entities', JSON.stringify(entities));
    localStorage.setItem('activePuzzle', JSON.stringify(activePuzzle));
  }, 1100)); // debounce for longer than timer display counter interval

  return store;
}
