import { ADD_SOLVE, TOGGLE_SOLVE_SELECTED, DELETE_SOLVES } from '../actions';

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

export const getLastActivePuzzleSolveDuration = state => {
  const lastSolve = getLastActivePuzzleSolve(state);
  return lastSolve ? lastSolve.duration : 0;
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

const initialSolveState = {
  byRecordedAt: {},
  lastDeleted: []
};

export function solves(state = initialSolveState, action) {
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
          return action.recordedAtMap[solve.recordedAt];
        })
      };
    default:
      return state;
  }
}

const initialRecordedAtValuesState = [];

export function recordedAtValues(state = initialRecordedAtValuesState, action) {
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
      return state.filter(recordedAt => !action.recordedAtMap[recordedAt]);
    default:
      return state;
  }
}
