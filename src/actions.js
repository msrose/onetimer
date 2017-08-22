export const enterTimer = () => {
  return (dispatch, getState) => {
    const { startTime, puzzle } = getState().timer;
    if(!startTime) {
      const readyTimeout = setTimeout(() => {
        dispatch({ type: 'SET_TIMER_PREPARING', id: null });
        dispatch({ type: 'SET_TIMER_READY', ready: true });
      }, 500);
      dispatch({ type: 'SET_TIMER_PREPARING', id: readyTimeout });
    } else {
      const endTime = Date.now();
      dispatch({ type: 'SET_TIMER_TIMING', time: null });
      dispatch({
        type: 'ADD_SOLVE',
        recordedAt: endTime,
        duration: endTime - startTime,
        puzzle
      });
    }
  };
};

export const leaveTimer = () => {
  return (dispatch, getState) => {
    const { isReady, preparationTimeoutId } = getState().timer;
    if(isReady) {
      dispatch({ type: 'SET_TIMER_READY', ready: false });
      dispatch({ type: 'SET_TIMER_TIMING', time: Date.now() });
    }
    if(preparationTimeoutId) {
      clearTimeout(preparationTimeoutId);
      dispatch({ type: 'SET_TIMER_PREPARING', id: null });
    }
  };
};
