import React from 'react';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const AppHeader = ({ onMenuClick }) => (
  <div className="AppHeader">
    <AppBar position="fixed" color="default">
      <Toolbar>
        <IconButton onClick={onMenuClick}><MenuIcon /></IconButton>
        <Typography type="title">One Timer</Typography>
      </Toolbar>
    </AppBar>
  </div>
);

const mapDispatchToProps = {
  onMenuClick: () => ({ type: 'TOGGLE_DRAWER' })
};

export default connect(null, mapDispatchToProps)(AppHeader);
