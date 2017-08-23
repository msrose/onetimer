import React from 'react';
import './Timer.css';
import { connect } from 'react-redux';
import { enterTimer, leaveTimer } from '../actions';
import { getLastActivePuzzleSolveDuration } from '../reducers';
import { formatTime } from './helpers';

const Timer = ({
  puzzle, onSwitchPuzzle, onTimerStart, onTimerEnd, isPreparing,
  isReady, isTiming, lastSolveDuration, displayCounter
}) => (
  <div
    className="Timer"
    onTouchStart={onTimerStart}
    onMouseDown={onTimerStart}
    onTouchEnd={onTimerEnd}
    onMouseUp={onTimerEnd}
  >
    <div className={'Timer-display' + (isPreparing ? ' Timer-display-preparing' : '')}>
      {!isReady && !isTiming && formatTime(lastSolveDuration)}
      {isReady && 'Ready'}
      {isTiming && (displayCounter === 0 ?
        'Solve' :
        formatTime(displayCounter, { showSubSecond: false }))
      }
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    isPreparing: !!state.timer.preparationTimeoutId,
    isReady: state.timer.isReady,
    isTiming: !!state.timer.startTime,
    lastSolveDuration: getLastActivePuzzleSolveDuration(state),
    displayCounter: state.timer.displayCounter
  };
};

const mapDispatchToProps = {
  onTimerStart: enterTimer,
  onTimerEnd: leaveTimer
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
