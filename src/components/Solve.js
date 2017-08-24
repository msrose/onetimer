import React, { Component } from 'react';
import { formatDate, formatTime } from './helpers';
import Checkbox from 'material-ui/Checkbox';
import { ListItem, ListItemText } from 'material-ui/List';

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

export default Solve;
