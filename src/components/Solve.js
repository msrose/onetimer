import React, { PureComponent } from 'react';
import { formatDate, formatTime } from './helpers';
import Checkbox from 'material-ui/Checkbox';
import { ListItem, ListItemText } from 'material-ui/List';

class Solve extends PureComponent {
  handleClick = () => {
    this.props.onClick(this.props.recordedAt);
  };

  render() {
    const { duration, recordedAt, selected, showCheckbox, isDNF, hasPenalty } = this.props;
    return (
      <ListItem
        divider={true}
        button={true}
        onClick={this.handleClick}
      >
        <ListItemText
          primary={formatTime(duration) + (hasPenalty ? ' +2' : '')}
          secondary={formatDate(recordedAt)}
          className={isDNF ? 'Solve-dnf' : ''}
        />
        {showCheckbox &&
          // Force checkbox to be no higher than list item to prevent jank
          <Checkbox checked={selected} disableRipple={true} style={{ height: '44px' }} />
        }
      </ListItem>
    );
  }
}

export default Solve;
