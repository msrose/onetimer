import { combineReducers } from 'redux';

import ui from './ui';
import timer from './timer';
import entities from './entities';

// Export any selectors to make import paths simple
export * from './ui';
export * from './timer';
export * from './entities';

export default combineReducers({
  ui,
  timer,
  entities
});
