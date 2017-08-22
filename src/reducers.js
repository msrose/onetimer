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
  puzzle: '3x3x3',
  preparationTimeoutId: null,
  isReady: false,
  startTime: null
};

function timer(state = initialTimerState, action) {
  switch(action.type) {
    case 'SET_PUZZLE':
      return { ...state, puzzle: action.puzzle };
    case 'SET_TIMER_PREPARING':
      return { ...state, preparationTimeoutId: action.id };
    case 'SET_TIMER_READY':
      return { ...state, isReady: action.ready };
    case 'SET_TIMER_TIMING':
      return { ...state, startTime: action.time };
    default:
      return state;
  }
}

const initialEntityState = {
  solves: {},
  solvesByRecordedAt: []
};

export const getSolves = state => {
  const { solves, solvesByRecordedAt } = state.entities;
  return solvesByRecordedAt.map(recordedAt => solves[recordedAt]);
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
    default:
      return state;
  }
}

export default combineReducers({ ui, timer, entities });
