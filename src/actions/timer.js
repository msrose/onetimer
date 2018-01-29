import { addSolves } from './index';
import { getActivePuzzle } from '../reducers';

export const ENTER_PREPARING_STATE = 'ENTER_PREPARING_STATE';

export const enterPreparingState = timeoutId => ({
  type: ENTER_PREPARING_STATE,
  id: timeoutId
});

export const LEAVE_PREPARING_STATE = 'LEAVE_PREPARING_STATE';

export const leavePreparingState = () => ({
  type: LEAVE_PREPARING_STATE
});

export const ENTER_READY_STATE = 'ENTER_READY_STATE';

export const enterReadyState = () => ({
  type: ENTER_READY_STATE
});

export const START_TIMER = 'START_TIMER';

export const startTimer = intervalId => ({
  type: START_TIMER,
  time: Date.now(),
  intervalId
});

export const STOP_TIMER = 'STOP_TIMER';

export const stopTimer = () => ({
  type: STOP_TIMER
});

export const INCREMENT_DISPLAY_COUNTER = 'INCREMENT_DISPLAY_COUNTER';

export const incrementDisplayCounter = () => ({
  type: INCREMENT_DISPLAY_COUNTER
});

export const MS_TO_READY = 500;

export const enterTimer = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { timer: { startTime, displayCounterIntervalId } } = state;
    if(!startTime) {
      const readyTimeout = setTimeout(() => {
        dispatch(enterReadyState());
      }, MS_TO_READY);
      dispatch(enterPreparingState(readyTimeout));
    } else {
      const endTime = Date.now();
      clearInterval(displayCounterIntervalId);
      dispatch(stopTimer());
      dispatch(
        addSolves(
          [{
            recordedAt: endTime,
            duration: endTime - startTime,
            puzzle: getActivePuzzle(state)
          }]
        )
      );
    }
  };
};

export const leaveTimer = () => {
  return (dispatch, getState) => {
    const { isReady, preparationTimeoutId } = getState().timer;
    if(isReady) {
      const intervalId = setInterval(() => {
        dispatch(incrementDisplayCounter());
      }, 1000);
      dispatch(startTimer(intervalId));
    }
    if(preparationTimeoutId) {
      clearTimeout(preparationTimeoutId);
      dispatch(leavePreparingState());
    }
  };
};
