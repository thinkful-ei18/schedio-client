import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton } from 'material-ui';

import * as actions from '../store/actions';
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
	  console.log(this.state.username);
	  this.props.registerUser({
	    firstname: this.state.firstName,
	    username: this.state.username,
	    password: this.state.pass
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
	        </form>
	      </MuiThemeProvider>
	    </div>
	  );
	}
}

export default connect(null, actions)(SignUp);
