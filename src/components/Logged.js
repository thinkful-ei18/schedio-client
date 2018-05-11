import React from 'react';
import { connect } from 'react-redux';
import { clearAuthToken } from '../local-storage';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import * as actions from '../store/actions';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const Logged = props => {
  const handleLogOutSelect = () => {
    props.clearAuth();
    clearAuthToken();
  };

  return (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem primaryText="My Profile" />
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
