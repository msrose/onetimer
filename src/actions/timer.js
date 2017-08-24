import { addSolve } from './index';

export const SET_TIMER_PREPARING = 'SET_TIMER_PREPARING';

export const setTimerPreparing = timeoutId => ({
  type: SET_TIMER_PREPARING,
  id: timeoutId
});

export const SET_TIMER_READY = 'SET_TIMER_READY';

export const setTimerReady = ready => ({
  type: SET_TIMER_READY,
  ready
});

export const SET_TIMER_TIMING = 'SET_TIMER_TIMING';

export const setTimerTiming = (time, intervalId) => ({
  type: SET_TIMER_TIMING,
  time,
  intervalId
});

export const INCREMENT_DISPLAY_COUNTER = 'INCREMENT_DISPLAY_COUNTER';

export const incrementDisplayCounter = () => ({
  type: INCREMENT_DISPLAY_COUNTER
});

export const MS_TO_READY = 500;

export const enterTimer = () => {
  return (dispatch, getState) => {
    const {
      timer: { startTime, displayCounterIntervalId },
      entities: { activePuzzle }
    } = getState();
    if(!startTime) {
      const readyTimeout = setTimeout(() => {
        dispatch(setTimerPreparing(null));
        dispatch(setTimerReady(true));
      }, MS_TO_READY);
      dispatch(setTimerPreparing(readyTimeout));
    } else {
      const endTime = Date.now();
      clearInterval(displayCounterIntervalId);
      dispatch(setTimerTiming(null, null));
      dispatch(addSolve(endTime, endTime - startTime, activePuzzle));
    }
  };
};

export const leaveTimer = () => {
  return (dispatch, getState) => {
    const { isReady, preparationTimeoutId } = getState().timer;
    if(isReady) {
      dispatch(setTimerReady(false));
      const intervalId = setInterval(() => {
        dispatch(incrementDisplayCounter());
      }, 1000);
      dispatch(setTimerTiming(Date.now(), intervalId));
    }
    if(preparationTimeoutId) {
      clearTimeout(preparationTimeoutId);
      dispatch(setTimerPreparing(null));
    }
  };
};
