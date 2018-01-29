import {
  INCREMENT_DISPLAY_COUNTER,
  ENTER_READY_STATE,
  START_TIMER,
  STOP_TIMER,
  ENTER_PREPARING_STATE,
  LEAVE_PREPARING_STATE
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
    case ENTER_PREPARING_STATE:
      return { ...state, preparationTimeoutId: action.id };
    case LEAVE_PREPARING_STATE:
      return { ...state, preparationTimeoutId: null };
    case ENTER_READY_STATE:
      return { ...state, isReady: true, preparationTimeoutId: null };
    case START_TIMER:
      return {
        ...state,
        isReady: false,
        startTime: action.time,
        displayCounterIntervalId: action.intervalId,
        displayCounter: 0
      };
    case STOP_TIMER:
      return {
        ...state,
        startTime: null,
        displayCounterIntervalId: null,
        displayCounter: 0
      };
    case INCREMENT_DISPLAY_COUNTER:
      return { ...state, displayCounter: state.displayCounter + 1000 };
    default:
      return state;
  }
}

export default timer;
