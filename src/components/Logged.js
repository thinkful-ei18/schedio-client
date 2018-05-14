import React from 'react';
import { connect } from 'react-redux';
import { clearAuthToken } from '../local-storage';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import * as actions from '../store/actions';
import MenuItem from 'material-ui/MenuItem';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import './Account.css'
const Logged = props => {
  const handleLogOutSelect = () => {
    props.clearAuth();
    clearAuthToken();
  };

  const handleAccount = () => {
    props.history.push('/account')
  }

  const renderUserAvatar = (userdata) => {
    const { google } = userdata.user
    if (google) {
      return (<IconButton>
        <img src={google.photo} width="25px" className="avatar" />
      </IconButton>)
    }
    return (<IconButton>
      <AccountCircle />
    </IconButton>)
  }

  if (!props.userData) {
    return <div>Loading</div>
  }
  return (
    <IconMenu
      {...props}
      iconButtonElement={renderUserAvatar(props.userData)}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem primaryText="My Profile" onClick={handleAccount} />
      <MenuItem onClick={handleLogOutSelect} primaryText="Sign out" />
    </IconMenu>
  );
};


const mapStateToProps = state => {
  return {
    authStatus: state.auth.authToken,
    userData: state.auth.currentUser
  };
};

export default connect(mapStateToProps, actions)(Logged);
