import {
  ADD_SOLVE,
  TOGGLE_SOLVE_SELECTED,
  DELETE_SOLVES,
  TOGGLE_SOLVE_DNF,
  TOGGLE_SOLVE_PENALTY
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
  const val = activePuzzleSolves.length < 5 ?
    0 :
    Math.round(
      activePuzzleSolves
        .map(solve => (solve.isDNF ? Infinity : solve.duration) + (solve.hasPenalty ? 2 : 0))
        .slice(0, 5)
        .sort((a, b) => a - b)
        .slice(1, 4)
        .reduce((sum, value) => sum + value) / 3
    );
  return val;
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
    // TODO: refactor duplicate logic for updating field of solve
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
    case TOGGLE_SOLVE_DNF:
      return {
        ...state,
        byRecordedAt: {
          ...state.byRecordedAt,
          [action.recordedAt]: {
            ...state.byRecordedAt[action.recordedAt],
            isDNF: !state.byRecordedAt[action.recordedAt].isDNF
          }
        }
      };
    case TOGGLE_SOLVE_PENALTY:
      return {
        ...state,
        byRecordedAt: {
          ...state.byRecordedAt,
          [action.recordedAt]: {
            ...state.byRecordedAt[action.recordedAt],
            hasPenalty: !state.byRecordedAt[action.recordedAt].hasPenalty
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
