import { combineReducers } from 'redux';
import { puzzles, puzzlesByName } from './puzzles';
import solves from './solves';

export default combineReducers({
  solves,
  puzzles,
  puzzlesByName
});
