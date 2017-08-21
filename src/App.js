import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import AlarmIcon from 'material-ui-icons/Alarm';
import ViewListIcon from 'material-ui-icons/ViewList';
import MenuIcon from 'material-ui-icons/Menu';
import ShowChartIcon from 'material-ui-icons/ShowChart';

class App extends Component {
  toggleDrawer = () => {
    this.props.dispatch({ type: 'TOGGLE_DRAWER' });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <IconButton onClick={this.toggleDrawer}><MenuIcon /></IconButton>
        </div>
        <Drawer
          open={this.props.isDrawerOpen}
          onRequestClose={this.toggleDrawer}
        >
          <List>
            <ListItem button={true}>
              <ListItemIcon><AlarmIcon /></ListItemIcon>
              <ListItemText primary="Timer" />
            </ListItem>
            <ListItem button={true}>
              <ListItemIcon><ViewListIcon /></ListItemIcon>
              <ListItemText primary="Solves" />
            </ListItem>
            <ListItem button={true}>
              <ListItemIcon><ShowChartIcon /></ListItemIcon>
              <ListItemText primary="Graphs" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDrawerOpen: state.ui.isDrawerOpen
  };
};

export default connect(mapStateToProps)(App);
