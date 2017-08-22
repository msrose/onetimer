import React from 'react';
import Button from 'material-ui/Button';
import './Timer.css';
import { connect } from 'react-redux';
import SwapIcon from 'material-ui-icons/SwapVert';
import { enterTimer, leaveTimer } from './actions';
import { getLastSolveDuration } from './reducers';

const Timer = ({ puzzle, onSwitchPuzzle, onTimerStart, onTimerEnd, isPreparing, isReady, isTiming, lastSolveDuration, displayCounter }) => (
  <div
    className="Timer"
    onTouchStart={onTimerStart}
    onMouseDown={onTimerStart}
    onTouchEnd={onTimerEnd}
    onMouseUp={onTimerEnd}
  >
    <div className={'Timer-display' + (isPreparing ? ' Timer-display-preparing' : '')}>
      {!isReady && !isTiming && lastSolveDuration}
      {isReady && 'Ready'}
      {isTiming && (displayCounter === 0 ? 'Go!' : displayCounter)}
    </div>
    <div className="Timer-puzzle">
      {puzzle}
    </div>
    {!isTiming && !isReady &&
      <div className="Timer-swap">
        <Button fab={true} onClick={onSwitchPuzzle}><SwapIcon /></Button>
      </div>
    }
  </div>
);

const mapStateToProps = state => {
  return {
    puzzle: state.timer.puzzle,
    isPreparing: !!state.timer.preparationTimeoutId,
    isReady: state.timer.isReady,
    isTiming: !!state.timer.startTime,
    lastSolveDuration: getLastSolveDuration(state),
    displayCounter: state.timer.displayCounter
  };
};

const mapDispatchToProps = {
  onSwitchPuzzle: () => ({ type: 'TOGGLE_SWITCH_PUZZLE' }),
  onTimerStart: enterTimer,
  onTimerEnd: leaveTimer
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
