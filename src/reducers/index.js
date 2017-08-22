import { combineReducers } from 'redux';

import ui from './ui';
import timer from './timer';
import entities from './entities';

export default combineReducers({
  ui,
  timer,
  entities
});
