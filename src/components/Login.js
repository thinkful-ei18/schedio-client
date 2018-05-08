import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton } from 'material-ui';
import { withRouter } from 'react-router-dom';
import './signup.css';
import { login } from '../store/actions/auth';
import { authError } from '../store/actions/actionType';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      username: '',
      pass: ''
    };
  }
	loginHandler = e => {
	  e.preventDefault();
	  const { dispatch } = this.props;
	  dispatch(
	    login({
	      username: this.state.username,
	      password: this.state.pass
	    })
	  )
	    .then(() => {
	      this.props.history.push('/dashboard');
	    })
	    .catch(err => {
	      if (!err.response) {
	        return dispatch(authError({ message: 'server is down atm', location: 'server' }));
	      }
	      dispatch(authError(err.response.data));
	    });
	};

	handleFirstNameInput = e => {
	  this.setState({ firstName: e.target.value });
	};

	handleUserNameInput = e => {
	  this.setState({ username: e.target.value });
	};

	handlePassInput = e => {
	  this.setState({ pass: e.target.value });
	};
	render() {
	  let renderUserError = '';
	  let renderPasswordError = '';
	  let renderServerError = '';
	  const { authError } = this.props;
	  if (authError) {
	    if (authError.location === 'username') renderUserError = <div>{authError.message}</div>;
	    if (authError.location === 'password') renderPasswordError = <div>{authError.message}</div>;
	    if (authError.location === 'server') renderServerError = <div>{authError.message}</div>;
	  }
	  return (
	    <div className="landing-container">
	      <MuiThemeProvider>
	        <form onSubmit={this.loginHandler}>
	          <TextField
	            type="text"
	            className="name-input"
	            name="username"
	            floatingLabelText="Username"
	            onChange={this.handleUserNameInput}
	          />
	          {renderUserError}
	          <br />
	          <TextField
	            type="password"
	            hintText="Password Field"
	            floatingLabelText="Password"
	            className="name-input"
	            name="password"
	            onChange={this.handlePassInput}
	          />
	          {renderPasswordError}
	          <br />
	          <button type="submit">Login</button>
	          {renderServerError}
	        </form>
	      </MuiThemeProvider>
	    </div>
	  );
	}
}

const mapStateToProps = state => {
  return {
    userData: state.auth.currentUser,
    authError: state.auth.error
  };
};

export default connect(mapStateToProps)(withRouter(Login));
