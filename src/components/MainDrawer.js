import React from 'react';
import List, { ListItemIcon, ListItemText, ListItem } from 'material-ui/List';
import AlarmIcon from 'material-ui-icons/Alarm';
import ViewListIcon from 'material-ui-icons/ViewList';
// import ShowChartIcon from 'material-ui-icons/ShowChart';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import ListItemLink from './ListItemLink';
import { toggleDrawer } from '../actions';
import Typography from 'material-ui/Typography';
import SettingsIcon from 'material-ui-icons/Settings';
// import SyncIcon from 'material-ui-icons/Sync';

const MainDrawer = ({ isDrawerOpen, onRequestClose }) => (
  <Drawer
    open={isDrawerOpen}
    onRequestClose={onRequestClose}
  >
    <List>
      <ListItem divider={true}>
        <Typography type="headline">
          <ListItemText primary="One Timer" disableTypography={true} />
        </Typography>
      </ListItem>
      <ListItemLink path="/timer" onNavigate={onRequestClose}>
        <ListItemIcon><AlarmIcon /></ListItemIcon>
        <ListItemText primary="Timer" />
      </ListItemLink>
      <ListItemLink path="/solves" onNavigate={onRequestClose}>
        <ListItemIcon><ViewListIcon /></ListItemIcon>
        <ListItemText primary="Solves" />
      </ListItemLink>
      {/* <ListItemLink path="/graphs" onNavigate={onRequestClose}> */}
      {/*   <ListItemIcon><ShowChartIcon /></ListItemIcon> */}
      {/*   <ListItemText primary="Graphs" /> */}
      {/* </ListItemLink> */}
      <ListItemLink path="/settings" onNavigate={onRequestClose}>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemLink>
      {/* <ListItemLink path="/sync" onNavigate={onRequestClose}> */}
      {/*   <ListItemIcon><SyncIcon /></ListItemIcon> */}
      {/*   <ListItemText primary="Sync" /> */}
      {/* </ListItemLink> */}
    </List>
  </Drawer>
);

const mapStateToProps = state => ({ isDrawerOpen: state.ui.isDrawerOpen });

const mapDispatchToProps = {
  onRequestClose: toggleDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawer);
