import React from 'react';
import { connect } from 'react-redux';
import AppBarMargin from './AppBarMargin';
import { getActivePuzzleSolves, getHasActiveSelectedSolves } from '../reducers/solves';
import { getActivePuzzle } from '../reducers/puzzles';
import List from 'material-ui/List';
import { toggleSolvesSelected } from '../actions';
import Solve from './Solve';
import './Solves.css';
import SolvesHeader from './SolvesHeader';

const Solves = ({ solves, onSolveClick, showCheckboxes, activePuzzle }) => (
  <div className="Solves">
    {solves.length > 0 ?
      <AppBarMargin>
        <SolvesHeader />
        <List>
          {solves.map(({ duration, recordedAt, selected, isDNF, hasPenalty }) => (
            <Solve
              key={recordedAt}
              recordedAt={recordedAt}
              duration={duration}
              selected={selected}
              onClick={onSolveClick}
              showCheckbox={showCheckboxes}
              isDNF={isDNF}
              hasPenalty={hasPenalty}
            />
          ))}
        </List>
      </AppBarMargin> :
      <div className="Solves-empty">No {activePuzzle} solves</div>
    }
  </div>
);

const mapStateToProps = state => ({
  solves: getActivePuzzleSolves(state),
  showCheckboxes: getHasActiveSelectedSolves(state),
  activePuzzle: getActivePuzzle(state)
});

const mapDispatchToProps = {
  onSolveClick: recordedAt => toggleSolvesSelected([recordedAt])
};

export default connect(mapStateToProps, mapDispatchToProps)(Solves);
