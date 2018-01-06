import { combineReducers } from 'redux';

import ui from './ui';
import timer from './timer';
import entities from './entities';
import selectedSolves from './selected-solves';
import { activePuzzle, puzzleToReorder } from './puzzles';
import { lastDeletedSolves } from './solves';

// Export any selectors to make import paths simple
export * from './ui';
export * from './timer';
export * from './entities';
export * from './selected-solves';
export * from './puzzles';
export * from './solves';

export default combineReducers({
  ui,
  timer,
  entities,
  selectedSolves,
  activePuzzle,
  puzzleToReorder,
  lastDeletedSolves
});
