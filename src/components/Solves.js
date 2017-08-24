import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBarMargin from './AppBarMargin';
import { getActivePuzzleSolves, getHasActiveSelectedSolves } from '../reducers';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { formatDate, formatTime } from './helpers';
import Checkbox from 'material-ui/Checkbox';
import { toggleSolveSelected, toggleDeleteSolveMessage, undoLastSolveDelete } from '../actions';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

class Solve extends Component {
  handleClick = () => {
    this.props.onClick(this.props.recordedAt);
  };

  render() {
    const { duration, recordedAt, selected, showCheckbox } = this.props;
    return (
      <ListItem
        divider={true}
        button={true}
        onClick={this.handleClick}
      >
        <ListItemText
          primary={formatTime(duration)}
          secondary={formatDate(recordedAt)}
        />
        {showCheckbox &&
          // Force checkbox to be no higher than list item to prevent jank
          <Checkbox checked={selected} disableRipple={true} style={{ height: '44px' }}/>
        }
      </ListItem>
    );
  }
}

const Solves = ({
  solves, onSolveClick, showCheckboxes, showDeleteMessage, onToggleDeleteSolveMessage, onUndoLastSolveDelete
}) => (
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
    <Snackbar
      open={showDeleteMessage}
      message="Deleted some solves"
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
  </AppBarMargin>
);

const mapStateToProps = state => ({
  solves: getActivePuzzleSolves(state),
  showCheckboxes: getHasActiveSelectedSolves(state),
  showDeleteMessage: state.ui.isDeleteSolveMessageOpen
});

const mapDispatchToProps = {
  onSolveClick: toggleSolveSelected,
  onToggleDeleteSolveMessage: toggleDeleteSolveMessage,
  onUndoLastSolveDelete: undoLastSolveDelete
};

export default connect(mapStateToProps, mapDispatchToProps)(Solves);
