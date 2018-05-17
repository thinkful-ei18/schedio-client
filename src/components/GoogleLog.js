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
  loginHandler = e => { };

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
        buttonText={<div style={{ display: 'flex', alignItems: 'center' }}><img src="/img/btn_google_light_normal_ios.svg" alt='google' /><div style={{ fontWeight: 'bold', color: '#757575', padding: '0 10px 0 5px' }}>Sign in with Google</div></div>}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        style={{
          backgroundColor: 'white', border: 0, boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)', padding: 0, height: '40px', overflow: 'hidden'
        }}
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
