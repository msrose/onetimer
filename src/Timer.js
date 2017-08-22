import React from 'react';
import Button from 'material-ui/Button';
import './Timer.css';
import { connect } from 'react-redux';
import SwapIcon from 'material-ui-icons/SwapVert';
import PuzzleMenu from './PuzzleMenu';
import { enterTimer, leaveTimer } from './actions';

const Timer = ({ puzzle, onSwitchPuzzle, onTimerStart, onTimerEnd, isPreparing, isReady, isTiming }) => (
  <div
    className="Timer"
    onTouchStart={onTimerStart}
    onMouseDown={onTimerStart}
    onTouchEnd={onTimerEnd}
    onMouseUp={onTimerEnd}
  >
    <div className="Timer-display">
      00:00.000
    </div>
    <div className="Timer-puzzle">
      {puzzle}
    </div>
    <div>
      {isPreparing ? 'Preparing' : isReady ? 'Ready' : isTiming ? 'Timing' : 'Waiting'}
    </div>
    <div className="Timer-swap">
      <Button fab={true} onClick={onSwitchPuzzle}><SwapIcon /></Button>
    </div>
    <PuzzleMenu />
  </div>
);

const mapStateToProps = state => {
  return {
    puzzle: state.timer.puzzle,
    isPreparing: !!state.timer.preparationTimeoutId,
    isReady: state.timer.isReady,
    isTiming: !!state.timer.startTime
  };
};

const mapDispatchToProps = {
  onSwitchPuzzle: () => ({ type: 'TOGGLE_SWITCH_PUZZLE' }),
  onTimerStart: enterTimer,
  onTimerEnd: leaveTimer
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
