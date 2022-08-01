import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getActivePuzzleLatestBatch,
  getSolveValue,
  getActivePuzzleRunningBatchSize,
  getActivePuzzleMaxBatchSize
} from '../reducers';
import { classname } from './helpers';
import './BatchTracker.css';

const showSeparator = (runningBatchSize, maxBatchSize, latestBatchSize, trackerIndex) => {
  return (
    // Don't show before entire batch
    trackerIndex !== 0 &&
    // Don't show unless we have enough for an average/mean/best
    latestBatchSize === maxBatchSize &&
    // Place before the first solve of the running batch
    maxBatchSize - runningBatchSize === trackerIndex
  );
};

const BatchTracker = ({ latestBatch, runningBatchSize, maxBatchSize }) => {
  const sortedBatch = latestBatch.slice().sort((a, b) => getSolveValue(a) - getSolveValue(b));
  const bestInBatch = sortedBatch[0];
  const worstInBatch = sortedBatch[sortedBatch.length - 1];

  return (
    <div className="BatchTracker">
      {latestBatch.map((solve, i) => {
        const className = classname({
          'BatchTracker-dot': true,
          'BatchTracker-worst': solve === worstInBatch,
          'BatchTracker-best': solve === bestInBatch
        });
        return (
          <Fragment key={solve.recordedAt}>
            {showSeparator(runningBatchSize, maxBatchSize, latestBatch.length, i) &&
              <span className="BatchTracker-separator">&nbsp;</span>
            }
            <span className={className}>&nbsp;</span>
          </Fragment>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  latestBatch: getActivePuzzleLatestBatch(state),
  runningBatchSize: getActivePuzzleRunningBatchSize(state),
  maxBatchSize: getActivePuzzleMaxBatchSize(state)
});

export default connect(mapStateToProps)(BatchTracker);
