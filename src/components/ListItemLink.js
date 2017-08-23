import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import { withRouter } from 'react-router-dom';

class ListItemLink extends Component {
  handleClick = () => {
    this.props.history.push(this.props.path);
    this.props.onNavigate();
  };

  render() {
    return <ListItem button={true} onClick={this.handleClick}>
      {this.props.children}
    </ListItem>
  }
}

export default withRouter(ListItemLink);
