import React from 'react';
import List, { ListItemIcon, ListItemText } from 'material-ui/List';
import AlarmIcon from 'material-ui-icons/Alarm';
import ViewListIcon from 'material-ui-icons/ViewList';
import ShowChartIcon from 'material-ui-icons/ShowChart';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import ListItemLink from './ListItemLink';
import { toggleDrawer } from '../actions';

const MainDrawer = ({ dispatch, isDrawerOpen, onRequestClose }) => (
  <Drawer
    open={isDrawerOpen}
    onRequestClose={onRequestClose}
  >
    <List>
      <ListItemLink path="/timer" onNavigate={onRequestClose}>
        <ListItemIcon><AlarmIcon /></ListItemIcon>
        <ListItemText primary="Timer" />
      </ListItemLink>
      <ListItemLink path="/solves" onNavigate={onRequestClose}>
        <ListItemIcon><ViewListIcon /></ListItemIcon>
        <ListItemText primary="Solves" />
      </ListItemLink>
      <ListItemLink path="/graphs" onNavigate={onRequestClose}>
        <ListItemIcon><ShowChartIcon /></ListItemIcon>
        <ListItemText primary="Graphs" />
      </ListItemLink>
    </List>
  </Drawer>
);

const mapStateToProps = state => ({ isDrawerOpen: state.ui.isDrawerOpen });

const mapDispatchToProps = {
  onRequestClose: toggleDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawer);
