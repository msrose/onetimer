import React from 'react';
import { connect } from 'react-redux';
import AppBarMargin from './AppBarMargin';
import { getActivePuzzleSolves, getHasActiveSelectedSolves, getActivePuzzle } from '../reducers';
import List from 'material-ui/List';
import { toggleSolveSelected } from '../actions';
import DeletedSolveMessage from './DeletedSolveMessage';
import Solve from './Solve';
import './Solves.css';

const Solves = ({ solves, onSolveClick, showCheckboxes, activePuzzle }) => (
  <div className="Solves">
    {solves.length > 0 ?
      <AppBarMargin>
        <List>
          {solves.map(({ duration, recordedAt, selected }) => (
            <Solve
              key={recordedAt}
              recordedAt={recordedAt}
              duration={duration}
              selected={selected}
              onClick={onSolveClick}
              showCheckbox={showCheckboxes}
            />
          ))}
        </List>
      </AppBarMargin> :
      <div className="Solves-empty">No {activePuzzle} solves</div>
    }
    <DeletedSolveMessage />
  </div>
);

const mapStateToProps = state => ({
  solves: getActivePuzzleSolves(state),
  showCheckboxes: getHasActiveSelectedSolves(state),
  activePuzzle: getActivePuzzle(state)
});

const mapDispatchToProps = {
  onSolveClick: toggleSolveSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(Solves);
