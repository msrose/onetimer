import { connect } from 'react-redux';
import React from 'react';
import Button from 'material-ui/Button';
import SwapIcon from 'material-ui-icons/SwapVert';
import { toggleSwitchPuzzle } from '../actions';
import './SwitchPuzzleButton.css';

const SwitchPuzzleButton = ({ onSwitchPuzzle }) => (
  <div className="SwitchPuzzleButton">
    <Button fab={true} onClick={onSwitchPuzzle}><SwapIcon /></Button>
  </div>
);

const mapDispatchToProps = {
  onSwitchPuzzle: toggleSwitchPuzzle
};

export default connect(null, mapDispatchToProps)(SwitchPuzzleButton);
