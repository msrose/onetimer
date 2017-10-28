import React from 'react';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import './SolvesHeader.css';
import { connect } from 'react-redux';
import { getSelectedActivePuzzleSolves } from '../reducers';
import { deselectActivePuzzleSolves, selectAllActivePuzzleSolves } from '../actions';

const SolvesHeader = ({ selectedSolveCount, onDeselectSolves, onSelectAllSolves }) => (
  selectedSolveCount > 0 ?
    <div className="SolvesHeader">
      <Chip
        onRequestDelete={onDeselectSolves}
        onClick={onDeselectSolves}
        label={`${selectedSolveCount} selected`}
      />
      <Button color="primary" onClick={onSelectAllSolves}>Select All</Button>
    </div> :
    null
);

const mapStateToProps = state => ({
  selectedSolveCount: getSelectedActivePuzzleSolves(state).length
});

const mapDispatchToProps = {
  onDeselectSolves: deselectActivePuzzleSolves,
  onSelectAllSolves: selectAllActivePuzzleSolves
};

export default connect(mapStateToProps, mapDispatchToProps)(SolvesHeader);
