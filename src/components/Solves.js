import React from 'react';
import { connect } from 'react-redux';
import AppBarMargin from './AppBarMargin';
import { getActivePuzzleSolves, getHasActiveSelectedSolves } from '../reducers';
import List from 'material-ui/List';
import { toggleSolveSelected } from '../actions';
import DeletedSolveMessage from './DeletedSolveMessage';
import Solve from './Solve';

const Solves = ({ solves, onSolveClick, showCheckboxes }) => (
  <AppBarMargin>
    <List>
      {solves.map(({ duration, recordedAt, selected }) => (
        <Solve key={recordedAt}
          recordedAt={recordedAt}
          duration={duration}
          selected={selected}
          onClick={onSolveClick}
          showCheckbox={showCheckboxes}
        />
      ))}
    </List>
    <DeletedSolveMessage />
  </AppBarMargin>
);

const mapStateToProps = state => ({
  solves: getActivePuzzleSolves(state),
  showCheckboxes: getHasActiveSelectedSolves(state)
});

const mapDispatchToProps = {
  onSolveClick: toggleSolveSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(Solves);
