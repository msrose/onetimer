import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import {
  ADD_SOLVES,
  DELETE_SOLVES,
  TOGGLE_SOLVE_DNF,
  TOGGLE_SOLVE_PENALTY
} from '../actions';
import { getActivePuzzle } from '../reducers/puzzles';
import { getSolvesSelected } from '../reducers/selected-solves';
import { getSummaryDescriptor, getMaxBatchSize } from './solve-summary';
import { updateObjectProperty, toggleObjectProperty } from './helpers';

export const getRecordedAtValues = state => {
  return state.entities.solves.recordedAtValues;
};

export const getAllSolvesByRecordedAt = state => {
  return state.entities.solves.byRecordedAt.allSolves;
};

export const getMostRecentSolvesByRecordedAt = state => {
  return state.entities.solves.byRecordedAt.mostRecentSolves;
};

export const getSolvesByRecordedAt = createSelector(
  getSolvesSelected,
  getAllSolvesByRecordedAt,
  (solvesSelected, solves) => {
    return Object
      .entries(solves)
      .reduce(
        (solvesByRecordedAt, [recordedAt, solve]) => ({
          ...solvesByRecordedAt,
          [recordedAt]: {
            ...solve,
            selected: typeof solvesSelected[recordedAt] === 'undefined' ?
              false :
              solvesSelected[recordedAt]
          }
        }),
        {}
      );
  }
);

export const getLastDeletedSolves = state => {
  return state.lastDeletedSolves;
};

export const getActivePuzzleSolves = createSelector(
  getActivePuzzle,
  getSolvesByRecordedAt,
  getRecordedAtValues,
  (activePuzzle, solves, recordedAtValues) => {
    return recordedAtValues
      .map(recordedAt => solves[recordedAt])
      .filter(solve => solve.puzzle === activePuzzle);
  }
);

export const getSelectedActivePuzzleSolves = state => {
  return getActivePuzzleSolves(state).filter(solve => solve.selected);
};

export const getLastActivePuzzleSolve = state => {
  return getMostRecentActivePuzzleSolves(state)[0] || null;
};

export const getMostRecentActivePuzzleSolves = createSelector(
  getActivePuzzle,
  getMostRecentSolvesByRecordedAt,
  (activePuzzle, solves) => {
    return Object
      .keys(solves)
      .sort()
      .reverse()
      .map(recordedAt => solves[recordedAt])
      .filter(solve => solve.puzzle === activePuzzle);
  }
);

export const getActivePuzzleMaxBatchSize = state => {
  return getMaxBatchSize(getActivePuzzle(state));
};

export const getActivePuzzleLatestBatch = createSelector(
  getMostRecentActivePuzzleSolves,
  getActivePuzzleMaxBatchSize,
  (activePuzzleSolves, maxBatchSize) => {
    return activePuzzleSolves.slice(0, maxBatchSize).reverse();
  }
);

export const getActivePuzzleRunningBatchSize = state => {
  const activePuzzleSolves = getActivePuzzleSolves(state);
  const maxBatchSize = getActivePuzzleMaxBatchSize(state);
  return activePuzzleSolves.length % maxBatchSize || maxBatchSize;
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

export const getActiveSolveSummary = createSelector(
  getMostRecentActivePuzzleSolves,
  getActivePuzzle,
  (activePuzzleSolves, activePuzzle) => {
    const { valueCalculator, description } = getSummaryDescriptor(activePuzzle);
    const value = valueCalculator(activePuzzleSolves);
    return { value, description };
  }
);

const toggleSolveProperty = (state, recordedAt, property) =>
  updateObjectProperty(
    state,
    recordedAt,
    solve => toggleObjectProperty(solve, property)
  );

function makeByRecordedAtReducer(initialState) {
  return function(state = initialState, action) {
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
          .filter(solve => !action.solves.some(({ recordedAt }) => solve.recordedAt === recordedAt))
          .reduce((solves, solve) => ({ ...solves, [solve.recordedAt]: solve }), {});
      default:
        return state;
    }
  };
}

const initialAllSolvesState = {};

const allSolves = makeByRecordedAtReducer(initialAllSolvesState);

const initialMostRecentSolvesState = {};

const MOST_RECENT_LIMIT = 5;

function limitSolves(byRecordedAt) {
  return Object
    .keys(byRecordedAt)
    .sort()
    .reverse()
    .slice(0, MOST_RECENT_LIMIT)
    .reduce((solvesByRecordedAt, recordedAt) => {
      return {
        ...solvesByRecordedAt,
        [recordedAt]: byRecordedAt[recordedAt]
      };
    }, {});
}

function mostRecentSolves(state = initialMostRecentSolvesState, action) {
  const updatedMostRecentSolves = makeByRecordedAtReducer(initialMostRecentSolvesState)(state, action);
  return limitSolves(updatedMostRecentSolves);
}

const initialByRecordedAtState = {
  allSolves: initialAllSolvesState,
  mostRecentSolves: initialMostRecentSolvesState
};

function byRecordedAt(state = initialByRecordedAtState, action) {
  const updatedAllSolves = allSolves(state.allSolves, action);
  let updatedMostRecentSolves = mostRecentSolves(state.mostRecentSolves, action);

  const updatedMostRecentRecordedAtTimes = Object.keys(updatedMostRecentSolves);
  const mostRecentCount = updatedMostRecentRecordedAtTimes.length;

  if(mostRecentCount < MOST_RECENT_LIMIT && mostRecentCount < Object.keys(updatedAllSolves).length) {
    updatedMostRecentSolves = limitSolves(updatedAllSolves);
  }

  return {
    allSolves: updatedAllSolves,
    mostRecentSolves: updatedMostRecentSolves
  };
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
