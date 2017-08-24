import React from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { connect } from 'react-redux';
import { deleteSelectedSolves } from '../actions';

const DeleteSolvesButton = ({ onClick }) => (
  <IconButton onClick={onClick}><DeleteIcon /></IconButton>
);

const mapDispatchToProps = {
  onClick: deleteSelectedSolves
};

export default connect(null, mapDispatchToProps)(DeleteSolvesButton);
