import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBarMargin from './AppBarMargin';
import { getActivePuzzleSolves, getHasActiveSelectedSolves } from '../reducers';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { formatDate, formatTime } from './helpers';
import Checkbox from 'material-ui/Checkbox';
import { toggleSolveSelected } from '../actions';

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
  </AppBarMargin>
);

const mapStateToProps = state => ({
  solves: getActivePuzzleSolves(state),
  showCheckboxes: getHasActiveSelectedSolves(state)
});

const mapDispatchToProps = {
  onSolveClick: toggleSolveSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(Solves);
