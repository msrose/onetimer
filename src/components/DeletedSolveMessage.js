import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { getLastDeletedSolves } from '../reducers';
import { toggleDeleteSolveMessage, undoLastSolveDelete } from '../actions';
import { connect } from 'react-redux';

const DeletedSolveMessage = ({ open, deletedCount, onUndoLastSolveDelete, onToggleDeleteSolveMessage }) => (
  <Snackbar
    open={open}
    message={`Deleted ${deletedCount} ${deletedCount === 1 ? 'solve' : 'solves'}`}
    autoHideDuration={5000}
    onRequestClose={onToggleDeleteSolveMessage}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    action={[
      <Button key="undo" color="accent" onClick={onUndoLastSolveDelete}>UNDO</Button>
    ]}
  />
);

const mapStateToProps = state => ({
  open: state.ui.isDeleteSolveMessageOpen,
  deletedCount: getLastDeletedSolves(state).length
});

const mapDispatchToProps = {
  onToggleDeleteSolveMessage: toggleDeleteSolveMessage,
  onUndoLastSolveDelete: undoLastSolveDelete
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletedSolveMessage);
