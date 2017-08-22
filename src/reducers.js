import { combineReducers } from 'redux';

const initialUIState = {
  isDrawerOpen: false,
  isSwitchPuzzleOpen: false
};

function ui(state = initialUIState, action) {
  switch(action.type) {
    case 'TOGGLE_DRAWER':
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case 'TOGGLE_SWITCH_PUZZLE':
      return { ...state, isSwitchPuzzleOpen: !state.isSwitchPuzzleOpen };
    default:
      return state;
  }
}

const initialTimerState = {
  preparationTimeoutId: null,
  isReady: false,
  startTime: null,
  displayCounter: 0,
  displayCounterIntervalId: null
};

function timer(state = initialTimerState, action) {
  switch(action.type) {
    case 'SET_TIMER_PREPARING':
      return { ...state, preparationTimeoutId: action.id };
    case 'SET_TIMER_READY':
      return { ...state, isReady: action.ready };
    case 'SET_TIMER_TIMING':
      return { ...state, startTime: action.time, displayCounterIntervalId: action.intervalId, displayCounter: 0 };
    case 'INCREMENT_DISPLAY_COUNTER':
      return { ...state, displayCounter: state.displayCounter + 1000 };
    default:
      return state;
  }
}

const initialEntityState = {
  solves: {},
  solvesByRecordedAt: [],
  activePuzzle: '3x3x3'
};

export const getActivePuzzleSolves = state => {
  const { solves, solvesByRecordedAt, activePuzzle } = state.entities;
  return solvesByRecordedAt.map(recordedAt => solves[recordedAt]).filter(solve => solve.puzzle === activePuzzle);
};

export const getLastSolve = state => {
  const { solves, solvesByRecordedAt } = state.entities;
  return solves[solvesByRecordedAt[0]] || null;
};

export const getLastSolveDuration = state => {
  const lastSolve = getLastSolve(state);
  return lastSolve ? lastSolve.duration : 0;
};

function entities(state = initialEntityState, action) {
  switch(action.type) {
    case 'ADD_SOLVE':
      return {
        ...state,
        solves: {
          ...state.solves,
          [action.recordedAt]: {
            recordedAt: action.recordedAt,
            duration: action.duration,
            puzzle: action.puzzle
          }
        },
        solvesByRecordedAt: [action.recordedAt].concat(state.solvesByRecordedAt)
      }
    case 'SET_ACTIVE_PUZZLE':
      return { ...state, activePuzzle: action.puzzle };
    default:
      return state;
  }
}

export default combineReducers({ ui, timer, entities });
