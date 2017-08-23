import { combineReducers } from 'redux';
import { ADD_SOLVE, SET_ACTIVE_PUZZLE } from '../actions';

const puzzleNames = [
  '2x2x2', '3x3x3', '4x4x4', '5x5x5', '6x6x6', '7x7x7',
  '3x3x3 OH', '3x3x3 BLD', 'Skewb', 'Clock', '3x3x3 Multi BLD',
  'Pyraminx', 'Megaminx'
];

export const getActivePuzzleSolves = state => {
  const { puzzles, activePuzzle, solves } = state.entities;
  return puzzles[activePuzzle].solvesByRecordedAt.map(recordedAt => solves[recordedAt]);
};

export const getLastActivePuzzleSolve = state => {
  const { solves, puzzles, activePuzzle } = state.entities;
  return solves[puzzles[activePuzzle].solvesByRecordedAt[0]] || null;
};

export const getLastActivePuzzleSolveDuration = state => {
  const lastSolve = getLastActivePuzzleSolve(state);
  return lastSolve ? lastSolve.duration : 0;
};

export const getPuzzleNames = state => {
  return puzzleNames;
};

function activePuzzle(state = '3x3x3', action) {
  switch(action.type) {
    case SET_ACTIVE_PUZZLE:
      return action.puzzle;
    default:
      return state;
  }
}

const initialSolveState = {};

function solves(state = initialSolveState, action) {
  switch(action.type) {
    case ADD_SOLVE:
      return {
        ...state,
        [action.recordedAt]: {
          recordedAt: action.recordedAt,
          duration: action.duration,
          puzzle: action.puzzle
        }
      }
    default:
      return state;
  }
}

const initialPuzzleState = puzzleNames.reduce((map, name) => {
  map[name] = {
    solvesByRecordedAt: []
  };
  return map;
}, {});

function puzzles(state = initialPuzzleState, action) {
  switch(action.type) {
    case ADD_SOLVE:
      return {
        ...state,
        [action.puzzle]: {
          solvesByRecordedAt: [
            action.recordedAt,
            ...state[action.puzzle].solvesByRecordedAt
          ]
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  solves,
  puzzles,
  activePuzzle
});
