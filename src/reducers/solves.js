import { combineReducers } from 'redux';
import {
  ADD_SOLVES,
  TOGGLE_SOLVE_SELECTED,
  DELETE_SOLVES,
  TOGGLE_SOLVE_DNF,
  TOGGLE_SOLVE_PENALTY
} from '../actions';
import { getActivePuzzle } from '../reducers';
import { getSummaryDescriptor } from './solve-summary';

export const getSolvesByRecordedAt = state => {
  return state.entities.solves.byRecordedAt;
};

export const getLastDeletedSolves = state => {
  return state.entities.solves.lastDeleted;
};

export const getActivePuzzleSolves = state => {
  const { recordedAtValues, activePuzzle } = state.entities;
  const solves = getSolvesByRecordedAt(state);
  return recordedAtValues
    .map(recordedAt => solves[recordedAt])
    .filter(solve => solve.puzzle === activePuzzle);
};

export const getSelectedActivePuzzleSolves = state => {
  return getActivePuzzleSolves(state).filter(solve => solve.selected);
};

export const getLastActivePuzzleSolve = state => {
  return getActivePuzzleSolves(state)[0] || null;
};

export const getHasActiveSelectedSolves = state => {
  return getActivePuzzleSolves(state).some(solve => solve.selected);
};

export const getSolveCounts = state => {
  const solvesByRecordedAt = getSolvesByRecordedAt(state);
  return state.entities.recordedAtValues
    .map(recordedAt => solvesByRecordedAt[recordedAt])
    .reduce((countMap, solve) => {
      if(!countMap[solve.puzzle]) {
        countMap[solve.puzzle] = 0;
      }
      countMap[solve.puzzle]++;
      return countMap;
    }, {});
};

export const getActiveSolveSummary = state => {
  const activePuzzleSolves = getActivePuzzleSolves(state);
  const activePuzzle = getActivePuzzle(state);
  const { valueCalculator, description } = getSummaryDescriptor(activePuzzle);
  const value = valueCalculator(activePuzzleSolves);
  return { value, description };
};

const initalByRecordedAtState = {};

function byRecordedAt(state = initalByRecordedAtState, action) {
  switch(action.type) {
    case ADD_SOLVES:
      return {
        ...state,
        ...action.solves.reduce(
          (recordedAtMap, solve) => ({
            ...recordedAtMap,
            [solve.recordedAt]: solve
          }),
          {}
        )
      };
    // TODO: refactor duplicate logic for updating field of solve
    case TOGGLE_SOLVE_SELECTED:
      return {
        ...state,
        [action.recordedAt]: {
          ...state[action.recordedAt],
          selected: !state[action.recordedAt].selected
        }
      };
    case TOGGLE_SOLVE_DNF:
      return {
        ...state,
        [action.recordedAt]: {
          ...state[action.recordedAt],
          isDNF: !state[action.recordedAt].isDNF
        }
      };
    case TOGGLE_SOLVE_PENALTY:
      return {
        ...state,
        [action.recordedAt]: {
          ...state[action.recordedAt],
          hasPenalty: !state[action.recordedAt].hasPenalty
        }
      };
    case DELETE_SOLVES:
      return Object.values(state).filter(
        solve => !action.recordedAtMap[solve.recordedAt]
      ).reduce(
        (solves, solve) => ({
          ...solves,
          [solve.recordedAt]: solve
        }),
        {}
      );
    default:
      return state;
  }
}

const initalLastDeletedState = [];

function lastDeleted(state = initalLastDeletedState, action) {
  switch(action.type) {
    case DELETE_SOLVES:
      return Object.values(action.recordedAtMap);
    default:
      return state;
  }
}

export const solves = combineReducers({
  byRecordedAt,
  lastDeleted
});

const initialRecordedAtValuesState = [];

export function recordedAtValues(state = initialRecordedAtValuesState, action) {
  switch(action.type) {
    case ADD_SOLVES: {
      const nextState = state.slice();
      action.solves.forEach(solve => {
        const insertionIndex = nextState.findIndex(recordedAt => solve.recordedAt > recordedAt);
        if(insertionIndex >= 0) {
          nextState.splice(insertionIndex, 0, solve.recordedAt);
        } else {
          nextState.push(solve.recordedAt);
        }
      });
      return nextState;
    }
    case DELETE_SOLVES:
      return state.filter(recordedAt => !action.recordedAtMap[recordedAt]);
    default:
      return state;
  }
}
