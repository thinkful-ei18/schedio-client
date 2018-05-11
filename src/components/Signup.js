import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField} from 'material-ui';
import { registerUser } from '../store/actions/users';
import { authError } from '../store/actions/actionType';
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
	  const { dispatch, history } = this.props;
	  return dispatch(
	    registerUser({
	      firstname: this.state.firstName,
	      username: this.state.username,
	      password: this.state.pass
	    })
	  )
	    .then(() => {
	      history.push('/login');
	    })
	    .catch(err => {
	      if (!err.response) {
	        return dispatch(
	          authError({ message: 'server is down at the moment', location: 'server' })
	        );
	      }
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
	  let renderError = '';
	  const { error } = this.props;
	  if (error) {
	    renderError = <div>{error.message}</div>;
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
	          <br />
	          {renderError}
	        </form>
	      </MuiThemeProvider>
	    </div>
	  );
	}
}
const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};
export default connect(mapStateToProps)(SignUp);
