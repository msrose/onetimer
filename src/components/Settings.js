import React, { Component } from 'react';
import List, {
  ListItem, ListItemText, ListSubheader, ListItemSecondaryAction
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import { connect } from 'react-redux';
import { getPuzzles, getPuzzleToReorder } from '../reducers';
import { togglePuzzleVisible, startPuzzleReorder, chooseNewPuzzleOrder } from '../actions';
import AppBarMargin from './AppBarMargin';
import IconButton from 'material-ui/IconButton';
import ReorderIcon from 'material-ui-icons/Reorder';

class PuzzleSettingsItem extends Component {
  handleTogglePuzzleVisible = () => {
    this.props.onTogglePuzzleVisible(this.props.name);
  };

  handleStartReorder = () => {
    this.props.onStartReorder(this.props.name);
  };

  handleChooseNewOrder = () => {
    if(this.props.puzzleToReorder) {
      this.props.onChooseNewOrder(this.props.puzzleToReorder, this.props.name);
    }
  };

  render() {
    const { visible, name, puzzleToReorder } = this.props;
    return (
      <ListItem
        button={!!puzzleToReorder}
        disabled={name === puzzleToReorder}
        onClick={this.handleChooseNewOrder}
      >
        <ListItemText
          primary={name}
          secondary={puzzleToReorder === name && `Select new location for ${name}`}
        />
        {!puzzleToReorder &&
          <ListItemSecondaryAction>
            <IconButton onClick={this.handleStartReorder}>
              <ReorderIcon />
            </IconButton>
            <Switch
              checked={visible}
              onClick={this.handleTogglePuzzleVisible}
            />
          </ListItemSecondaryAction>
        }
      </ListItem>
    );
  }
}

const Settings = ({
  puzzles, onTogglePuzzleVisible, onStartPuzzleReorder, puzzleToReorder, onChooseNewPuzzleOrder
}) => (
  <AppBarMargin>
    <List subheader={<ListSubheader>Puzzles</ListSubheader>}>
      {puzzles.map(({ name, visible }) => (
        <PuzzleSettingsItem
          key={name}
          visible={visible}
          name={name}
          onTogglePuzzleVisible={onTogglePuzzleVisible}
          onStartReorder={onStartPuzzleReorder}
          puzzleToReorder={puzzleToReorder}
          onChooseNewOrder={onChooseNewPuzzleOrder}
        />
      ))}
    </List>
  </AppBarMargin>
);

const mapStateToProps = state => ({
  puzzles: getPuzzles(state),
  puzzleToReorder: getPuzzleToReorder(state)
});

const mapDispatchToProps = {
  onTogglePuzzleVisible: togglePuzzleVisible,
  onStartPuzzleReorder: startPuzzleReorder,
  onChooseNewPuzzleOrder: chooseNewPuzzleOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
