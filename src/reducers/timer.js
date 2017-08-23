import {
  SET_TIMER_PREPARING, SET_TIMER_READY, SET_TIMER_TIMING, INCREMENT_DISPLAY_COUNTER
} from '../actions';

const initialTimerState = {
  preparationTimeoutId: null,
  isReady: false,
  startTime: null,
  displayCounter: 0,
  displayCounterIntervalId: null
};

export const getIsPreparing = state => !!state.timer.preparationTimeoutId;

export const getIsReady = state => state.timer.isReady;

export const getIsTiming = state => !!state.timer.startTime;

function timer(state = initialTimerState, action) {
  switch(action.type) {
    case SET_TIMER_PREPARING:
      return { ...state, preparationTimeoutId: action.id };
    case SET_TIMER_READY:
      return { ...state, isReady: action.ready };
    case SET_TIMER_TIMING:
      return {
        ...state,
        startTime: action.time,
        displayCounterIntervalId: action.intervalId,
        displayCounter: 0
      };
    case INCREMENT_DISPLAY_COUNTER:
      return { ...state, displayCounter: state.displayCounter + 1000 };
    default:
      return state;
  }
}

export default timer;
