import { combineReducers } from 'redux';
import {
  ADD_SOLVES,
  DELETE_SOLVES,
  TOGGLE_SOLVE_DNF,
  TOGGLE_SOLVE_PENALTY
} from '../actions';
import { getActivePuzzle, getSolvesSelected } from '../reducers';
import { getSummaryDescriptor, getMaxBatchSize } from './solve-summary';
import { updateObjectProperty, toggleObjectProperty } from './helpers';

export const getRecordedAtValues = state => {
  return state.entities.solves.recordedAtValues;
};

export const getSolvesByRecordedAt = state => {
  const solvesSelected = getSolvesSelected(state);
  return Object
    .entries(state.entities.solves.byRecordedAt)
    .reduce(
      (solvesByRecordedAt, [recordedAt, solve]) => ({
        ...solvesByRecordedAt,
        [recordedAt]: {
          ...solve,
          selected: solvesSelected[recordedAt]
        }
      }),
      {}
    );
};

export const getLastDeletedSolves = state => {
  return state.lastDeletedSolves;
};

export const getActivePuzzleSolves = state => {
  const activePuzzle = getActivePuzzle(state);
  const solves = getSolvesByRecordedAt(state);
  return getRecordedAtValues(state)
    .map(recordedAt => solves[recordedAt])
    .filter(solve => solve.puzzle === activePuzzle);
};

export const getSelectedActivePuzzleSolves = state => {
  return getActivePuzzleSolves(state).filter(solve => solve.selected);
};

export const getLastActivePuzzleSolve = state => {
  return getActivePuzzleSolves(state)[0] || null;
};

export const getActivePuzzleLatestBatch = state => {
  const activePuzzleSolves = getActivePuzzleSolves(state);
  const maxBatchSize = getMaxBatchSize(getActivePuzzle(state));
  const latestBatchSize = activePuzzleSolves.length % maxBatchSize || maxBatchSize;
  return activePuzzleSolves.slice(0, latestBatchSize).reverse();
};

export const getHasActiveSelectedSolves = state => {
  return getActivePuzzleSolves(state).some(solve => solve.selected);
};

export const getSolveCounts = state => {
  const solvesByRecordedAt = getSolvesByRecordedAt(state);
  return getRecordedAtValues(state)
    .map(recordedAt => solvesByRecordedAt[recordedAt])
    .reduce(
      (countMap, solve) => {
        if(!countMap[solve.puzzle]) {
          countMap[solve.puzzle] = 0;
        }
        countMap[solve.puzzle]++;
        return countMap;
      },
      {}
    );
};

export const getActiveSolveSummary = state => {
  const activePuzzleSolves = getActivePuzzleSolves(state);
  const activePuzzle = getActivePuzzle(state);
  const { valueCalculator, description } = getSummaryDescriptor(activePuzzle);
  const value = valueCalculator(activePuzzleSolves);
  return { value, description };
};

const initialByRecordedAtState = {};

const toggleSolveProperty = (state, recordedAt, property) =>
  updateObjectProperty(
    state,
    recordedAt,
    solve => toggleObjectProperty(solve, property)
  );

function byRecordedAt(state = initialByRecordedAtState, action) {
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
    case TOGGLE_SOLVE_DNF:
      return toggleSolveProperty(state, action.recordedAt, 'isDNF');
    case TOGGLE_SOLVE_PENALTY:
      return toggleSolveProperty(state, action.recordedAt, 'hasPenalty');
    case DELETE_SOLVES:
      return Object
        .values(state)
        .filter(
          solve => !action.solves.some(({ recordedAt }) => solve.recordedAt === recordedAt)
        )
        .reduce(
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

const initialLastDeletedState = [];

export function lastDeletedSolves(state = initialLastDeletedState, action) {
  switch(action.type) {
    case DELETE_SOLVES:
      return action.solves;
    default:
      return state;
  }
}

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
      return state.filter(
        recordedAt => !action.solves.some(deletedSolve => deletedSolve.recordedAt === recordedAt)
      );
    default:
      return state;
  }
}

export default combineReducers({
  byRecordedAt,
  recordedAtValues
});
