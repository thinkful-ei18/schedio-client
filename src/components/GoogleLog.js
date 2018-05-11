import React, { Component } from 'react';
import { connect } from 'react-redux';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { TextField, RaisedButton } from 'material-ui';
import { withRouter } from 'react-router-dom';
import { clientId } from '../config';
import { GoogleLogin } from 'react-google-login';
import './signup.css';
import { googleLogin } from '../store/actions/auth';
// import { authError } from '../store/actions/actionType';

class GoogleLog extends Component {
  loginHandler = e => {};

  render() {
    const responseGoogle = response => {
      const { dispatch } = this.props;
      dispatch(googleLogin(response.accessToken)).then(() => {
        if (this.props.authStatus) {
          this.props.history.push('/dashboard');
        }
      });
    };

    return (
      <GoogleLogin
        clientId={clientId}
        buttonText="Login With Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    authStatus: state.auth.authToken,
    userData: state.auth.currentUser,
    authError: state.auth.error
  };
};

export default connect(mapStateToProps)(withRouter(GoogleLog));
