import React from 'react';
import { connect } from 'react-redux';
import AppBarMargin from './AppBarMargin';
import { getActivePuzzleSolves } from '../reducers';
import List, { ListItem, ListItemText } from 'material-ui/List';

const Solves = ({ solves }) => (
  <AppBarMargin>
    <List>
      {solves.map(({ duration, recordedAt, puzzle }) => (
        <ListItem key={recordedAt} divider={true} dense={true}>
          <ListItemText primary={duration} secondary={recordedAt} />
        </ListItem>
      ))}
    </List>
  </AppBarMargin>
);

const mapStateToProps = state => ({
  solves: getActivePuzzleSolves(state)
});

export default connect(mapStateToProps)(Solves);
