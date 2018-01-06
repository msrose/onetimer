import { combineReducers } from 'redux';

import ui from './ui';
import timer from './timer';
import selectedSolves from './selected-solves';
import puzzles, { activePuzzle, puzzleToReorder } from './puzzles';
import solves, { lastDeletedSolves } from './solves';

// Export any selectors to make import paths simple
export * from './ui';
export * from './timer';
export * from './selected-solves';
export * from './puzzles';
export * from './solves';

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
