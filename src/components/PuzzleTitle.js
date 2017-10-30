import React from 'react';
import { getActivePuzzle } from '../reducers';
import { connect } from 'react-redux';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import { toggleSwitchPuzzle } from '../actions';
import './PuzzleTitle.css';

const PuzzleTitle = ({ puzzle, onSwitchPuzzle }) => (
  <div className="PuzzleTitle" onClick={onSwitchPuzzle}>
    {puzzle} <ArrowDropDownIcon />
  </div>
);

const mapStateToProps = state => ({
  puzzle: getActivePuzzle(state)
});

const mapDispatchToProps = {
  onSwitchPuzzle: toggleSwitchPuzzle
};

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleTitle);
