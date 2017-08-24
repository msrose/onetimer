import { combineReducers } from 'redux';
import {
  ADD_SOLVE, SET_ACTIVE_PUZZLE, TOGGLE_SOLVE_SELECTED, DELETE_SOLVES
} from '../actions';

export const getSolvesByRecordedAt = state => {
  return state.entities.solves.byRecordedAt;
};

export const getLastDeletedSolves = state => {
  return state.entities.solves.lastDeleted;
};

export const getActivePuzzleSolves = state => {
  const { recordedAtValues, activePuzzle } = state.entities;
  const solves = getSolvesByRecordedAt(state);
  return recordedAtValues.map(recordedAt => solves[recordedAt])
    .filter(solve => solve.puzzle === activePuzzle);
};

export const getSelectedActivePuzzleSolves = state => {
  return getActivePuzzleSolves(state).filter(solve => solve.selected)
    .map(solve => solve.recordedAt);
};

export const getLastActivePuzzleSolve = state => {
  return getActivePuzzleSolves(state)[0] || null;
};

export const getLastActivePuzzleSolveDuration = state => {
  const lastSolve = getLastActivePuzzleSolve(state);
  return lastSolve ? lastSolve.duration : 0;
};

export const getPuzzleNames = state => {
  return state.entities.puzzles;
};

export const getActivePuzzle = state => {
  return state.entities.activePuzzle;
};

export const getHasActiveSelectedSolves = state => {
  return getActivePuzzleSolves(state).some(solve => solve.selected);
}

function activePuzzle(state = '3x3x3', action) {
  switch(action.type) {
    case SET_ACTIVE_PUZZLE:
      return action.puzzle;
    default:
      return state;
  }
}

const initialSolveState = {
  byRecordedAt: {},
  lastDeleted: []
};

function solves(state = initialSolveState, action) {
  switch(action.type) {
    case ADD_SOLVE:
      return {
        ...state,
        byRecordedAt: {
          ...state.byRecordedAt,
          [action.solve.recordedAt]: action.solve
        }
      };
    case TOGGLE_SOLVE_SELECTED:
      return {
        ...state,
        byRecordedAt: {
          ...state.byRecordedAt,
          [action.recordedAt]: {
            ...state.byRecordedAt[action.recordedAt],
            selected: !state.byRecordedAt[action.recordedAt].selected
          }
        }
      };
    case DELETE_SOLVES:
      return {
        ...state,
        byRecordedAt: Object.values(state.byRecordedAt).filter(solve => {
          return !action.recordedAtMap[solve.recordedAt];
        }).reduce((solves, solve) => {
          solves[solve.recordedAt] = solve;
          return solves;
        }, {}),
        lastDeleted: Object.values(state.byRecordedAt).filter(solve => {
          return action.recordedAtMap[solve.recordedAt]
        })
      };
    default:
      return state;
  }
}

const initialRecordedAtValuesState = [];

function recordedAtValues(state = initialRecordedAtValuesState, action) {
  switch(action.type) {
    case ADD_SOLVE: {
      const insertionIndex = state.findIndex(recordedAt => action.solve.recordedAt > recordedAt);
      if(insertionIndex >= 0) {
        return [
          ...state.slice(0, insertionIndex),
          action.solve.recordedAt,
          ...state.slice(insertionIndex)
        ];
      }
      return state.concat(action.solve.recordedAt);
    }
    case DELETE_SOLVES:
      return state.filter(recordedAt => !action.recordedAtMap[recordedAt])
    default:
      return state;
  }
}

const initialPuzzleState = [
  '2x2x2', '3x3x3', '4x4x4', '5x5x5', '6x6x6', '7x7x7',
  '3x3x3 OH', '3x3x3 BLD', 'Skewb', 'Clock', '3x3x3 Multi BLD',
  'Pyraminx', 'Megaminx'
];

function puzzles(state = initialPuzzleState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  solves,
  recordedAtValues,
  puzzles,
  activePuzzle,
});
