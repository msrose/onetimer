import React from 'react';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import './AppHeader.css';

const AppHeader = ({ onMenuClick, puzzle }) => (
  <div className="AppHeader">
    <AppBar position="fixed" color="default">
      <Toolbar>
        <IconButton onClick={onMenuClick}><MenuIcon /></IconButton>
        <Typography type="title" className="AppHeader-title">One Timer</Typography>
        <Typography type="subheading">{puzzle}</Typography>
      </Toolbar>
    </AppBar>
  </div>
);

const mapStateToProps = state => ({
  puzzle: state.entities.activePuzzle
});

const mapDispatchToProps = {
  onMenuClick: () => ({ type: 'TOGGLE_DRAWER' })
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
