import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import debounce from 'lodash/debounce';

import rootReducer from './reducers';

const ONETIMER_LOADED_STATE_VERSION = localStorage.getItem('ONETIMER_STATE_VERSION') || '1';

const ONETIMER_TARGET_STATE_VERSION = '2';

// TODO: Figure out a way to validate migrations.
// TODO: Apply migrations iteratively from starting version to target version.
function migrateEntities(entities, startingVersion) {
  return {
    1: (entities) => {
      return {
        ...entities,
        solves: {
          ...entities.solves,
          byRecordedAt: {
            allSolves: entities.solves.byRecordedAt,
            mostRecentSolves: entities.solves.byRecordedAt
          }
        }
      };
    },
    2: (entities) => entities
  }[startingVersion](entities);
}

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

  if(entities) {
    const migratedEntities = migrateEntities(entities, ONETIMER_LOADED_STATE_VERSION);
    preloadedState.entities = migratedEntities;
  }

  if(activePuzzle) {
    preloadedState.activePuzzle = activePuzzle;
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );

  // This won't get executed until an action is dispatched by the app, so if
  // there is a crash on initial load due to incorrect localStorage migration,
  // whatever was stored in localStorage shouldn't be overwritten right away.
  store.subscribe(debounce(() => {
    const { entities, activePuzzle } = store.getState();
    localStorage.setItem('entities', JSON.stringify(entities));
    localStorage.setItem('activePuzzle', JSON.stringify(activePuzzle));
    localStorage.setItem('ONETIMER_STATE_VERSION', ONETIMER_TARGET_STATE_VERSION);
  }, 1100)); // debounce for longer than timer display counter interval

  return store;
}
