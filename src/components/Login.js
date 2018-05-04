import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton } from 'material-ui';
import {withRouter} from 'react-router-dom';

import * as actions from '../store/actions';
import './signup.css';

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
		this.props.login({
			username: this.state.username,
			password: this.state.pass
		});
		this.props.history.push('/dashboard')
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
					<form onSubmit={this.loginHandler}>
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
						<button type="submit">Login</button>
					</form>
				</MuiThemeProvider>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		userData: state.auth.currentUser
	};
};

export default connect(mapStateToProps, actions)(withRouter(Login));
