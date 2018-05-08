import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton } from 'material-ui';
import { authError } from '../store/actions/actionType';
import { registerUser } from '../store/actions/users';
import './signup.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      username: '',
      pass: ''
    };
  }

	signUpHandler = e => {
	  e.preventDefault();
	  const { dispatch } = this.props;
	  return dispatch(
	    registerUser({
	      firstname: this.state.firstName,
	      username: this.state.username,
	      password: this.state.pass
	    })
	  )
	    .then(() => {
	      this.props.history.push('/login');
	    })
	    .catch(err => {
	      dispatch(authError(err));
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
	  const { signUpError } = this.props;
	  let renderError;
	  if (signUpError) {
	    renderError = <div>{signUpError.message}</div>;
	  }
	  return (
	    <div className="landing-container">
	      <MuiThemeProvider>
	        <form onSubmit={this.signUpHandler}>
	          <TextField
	            className="name-input"
	            type="text"
	            name="firstName"
	            floatingLabelText="First name"
	            onChange={this.handleFirstNameInput}
	          />
	          <br />
	          <TextField
	            type="text"
	            className="name-input"
	            name="username"
	            floatingLabelText="Username"
	            onChange={this.handleUserNameInput}
	          />
	          <br />
	          <TextField
	            type="password"
	            hintText="Password Field"
	            floatingLabelText="Password"
	            className="name-input"
	            name="password"
	            onChange={this.handlePassInput}
	          />
	          <br />
	          <button type="submit">Sign Up</button>
	          {renderError}
	        </form>
	      </MuiThemeProvider>
	    </div>
	  );
	}
}
const mapStateToProps = state => {
  return {
    signUpError: state.auth.error ? state.auth.error : null
  };
};
export default connect(mapStateToProps)(SignUp);
