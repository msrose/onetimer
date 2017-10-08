import React, { PureComponent } from 'react';
import './Timer.css';
import { connect } from 'react-redux';
import { enterTimer, leaveTimer } from '../actions';
import { formatTime } from './helpers';
import {
  getLastActivePuzzleSolve,
  getIsPreparing, getIsReady, getIsTiming,
  getActiveSolveSummary
} from '../reducers';
import NoSleep from '../no-sleep';

export class Timer extends PureComponent {
  constructor(props) {
    super(props);
    this._noSleep = new NoSleep();
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.isTiming && this.props.isTiming) {
      this._noSleep.enable();
    }
    if(prevProps.isTiming && !this.props.isTiming) {
      this._noSleep.disable();
    }
  }

  render() {
    const {
      onTimerEnter, onTimerLeave, isPreparing,
      isReady, isTiming, displayCounter,
      solveSummaryTime, lastSolve
    } = this.props;
    const lastSolveDuration = lastSolve ? lastSolve.duration : 0;
    return (
      <div
        className="Timer"
        onTouchStart={onTimerEnter}
        onMouseDown={onTimerEnter}
        onTouchEnd={onTimerLeave}
        onMouseUp={onTimerLeave}
      >
        <div className={'Timer-display' + (isPreparing ? ' Timer-display-preparing' : '')}>
          {!isReady && !isTiming &&
            <div>
              <div className={'Timer-solve-duration' + (lastSolve && lastSolve.isDNF ? ' Timer-solve-dnf' : '')}>
                {formatTime(lastSolveDuration)} {lastSolve && lastSolve.hasPenalty && <span className="Timer-solve-penalty">+2</span>}
              </div>
              {solveSummaryTime > 0 &&
                <div className="Timer-solve-summary">
                  Avg. of 5: {isFinite(solveSummaryTime) ? formatTime(solveSummaryTime) : 'DNF'}
                </div>
              }
            </div>
          }
          {isReady && 'Ready'}
          {isTiming && (
            displayCounter === 0 ?
              'Solve' :
              formatTime(displayCounter, { showSubSecond: false })
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isPreparing: getIsPreparing(state),
    isReady: getIsReady(state),
    isTiming: getIsTiming(state),
    lastSolve: getLastActivePuzzleSolve(state),
    displayCounter: state.timer.displayCounter,
    solveSummaryTime: getActiveSolveSummary(state)
  };
};

const mapDispatchToProps = {
  onTimerEnter: enterTimer,
  onTimerLeave: leaveTimer
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
