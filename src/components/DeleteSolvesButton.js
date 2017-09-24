import React from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { connect } from 'react-redux';
import { deleteSelectedSolves, deleteLastSolve } from '../actions';

const DeleteSolvesButton = ({ onClick }) => (
  <IconButton onClick={onClick}><DeleteIcon /></IconButton>
);

export const DeleteSelectedSolvesButton = connect(null, { onClick: deleteSelectedSolves })(DeleteSolvesButton);
export const DeleteLastSolveButton = connect(null, { onClick: deleteLastSolve })(DeleteSolvesButton);
