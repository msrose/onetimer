import { combineReducers } from 'redux';

import ui from './ui';
import timer from './timer';
import selectedSolves from './selected-solves';
import puzzles, { activePuzzle, puzzleToReorder } from './puzzles';
import solves, { lastDeletedSolves } from './solves';

const entities = combineReducers({
  solves,
  puzzles
});

export default combineReducers({
  ui,
  timer,
  entities,
  selectedSolves,
  activePuzzle,
  puzzleToReorder,
  lastDeletedSolves
});
