import React, { PureComponent } from 'react';
import './Timer.css';
import { connect } from 'react-redux';
import { enterTimer, leaveTimer } from '../actions';
import { formatTime } from './helpers';
import {
  getLastActivePuzzleSolveDuration,
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
      isReady, isTiming, lastSolveDuration, displayCounter,
      solveSummaryTime
    } = this.props;
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
              <div>{formatTime(lastSolveDuration)}</div>
              {solveSummaryTime > 0 &&
                <div className="Timer-solve-summary">
                  Avg. of 5: {formatTime(solveSummaryTime)}
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
    lastSolveDuration: getLastActivePuzzleSolveDuration(state),
    displayCounter: state.timer.displayCounter,
    solveSummaryTime: getActiveSolveSummary(state)
  };
};

const mapDispatchToProps = {
  onTimerEnter: enterTimer,
  onTimerLeave: leaveTimer
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
