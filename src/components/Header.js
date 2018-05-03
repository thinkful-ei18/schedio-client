import React from 'react';
import { AppBar, Drawer, MenuItem } from 'material-ui';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    return (
			<div>
      <AppBar
        title="Schedio"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonClick={this.handleToggle}
      />
			<Drawer  docked={false}
          width={200} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <MenuItem>Events</MenuItem>
          <MenuItem>Schedule</MenuItem>
        </Drawer>
				</div>
    );
  }
}
