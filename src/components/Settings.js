import React, { Component } from 'react';
import List, { ListItem, ListItemText, ListSubheader, ListItemSecondaryAction } from 'material-ui/List';
import Switch from 'material-ui/Switch';
import { connect } from 'react-redux';
import { getPuzzles } from '../reducers';
import { togglePuzzleVisible } from '../actions';
import AppBarMargin from './AppBarMargin';

class PuzzleSettingsItem extends Component {
  handleTogglePuzzleVisible = () => {
    this.props.onTogglePuzzleVisible(this.props.name);
  };

  render() {
    const { visible, name } = this.props;
    return (
      <ListItem>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <Switch
            checked={visible}
            onClick={this.handleTogglePuzzleVisible}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

const Settings = ({ puzzles, onTogglePuzzleVisible }) => (
  <AppBarMargin>
    <List subheader={<ListSubheader>Puzzles</ListSubheader>}>
      {puzzles.map(({ name, visible }) => (
        <PuzzleSettingsItem
          key={name}
          visible={visible}
          name={name}
          onTogglePuzzleVisible={onTogglePuzzleVisible}
        />
      ))}
    </List>
  </AppBarMargin>
);

const mapStateToProps = state => ({
  puzzles: getPuzzles(state)
});

const mapDispatchToProps = {
  onTogglePuzzleVisible: togglePuzzleVisible
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
