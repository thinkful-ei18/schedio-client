import React from 'react';
import { AppBar, Drawer, MenuItem } from 'material-ui';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logged from './Logged';
import RequiresLogin from './RequiresLogin';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }


  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleSelectionRedirect = itemSelected => {
    switch (itemSelected) {
      case 'Homepage':
        this.props.history.push('/');
        break;
      case 'Register':
        this.props.history.push('/register');
        break;
      case 'Login':
        this.props.history.push('/login');
        break;
      case 'Dashboard':
        this.props.history.push('/dashboard');
        break;
      default:
        return;
    }
    this.handleToggle();
  };

  render() {

    const style = {
      'visibility': this.state.open ? 'visible' : 'hidden'
    };
    return (
      <div className="header">
        <AppBar
          title="Schedio"
          iconElementRight={this.props.authStatus ? <Logged /> : <RequiresLogin />}
          onLeftIconButtonClick={this.handleToggle}
          style={{ position: 'fixed', top: 0, backgroundColor: '#3F51B5' }}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
          style={style}
        >
          <MenuItem onClick={() => this.handleSelectionRedirect('Homepage')}>
            Homepage
          </MenuItem>
          {this.props.authStatus ? null : <MenuItem onClick={() => this.handleSelectionRedirect('Register')}>
            Register
          </MenuItem>}
          {this.props.authStatus ? null : <MenuItem onClick={() => this.handleSelectionRedirect('Login')}>
            Login
          </MenuItem>}
          {this.props.authStatus ? <MenuItem onClick={() => this.handleSelectionRedirect('Dashboard')}>
            Dashboard
          </MenuItem> : null}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authStatus: state.auth.authToken,
    userData: state.auth.currentUser
  };
};

export default connect(mapStateToProps, null)(withRouter(Header));
