import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton } from 'material-ui';
import { withRouter, Link } from 'react-router-dom';
import './signup.css';
import { login } from '../store/actions/auth';
import GoogleLog from './GoogleLog';
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
					return dispatch(
						authError({ message: 'server is down at the moment', location: 'server' })
					);
				}
				dispatch(authError(err.response.data));
			});
	};

	handleFirstNameInput = e => {
		this.setState({ firstName: e.target.value });
	};

	handlePassInput = e => {
		this.setState({ pass: e.target.value });
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
			<div className="landing-container" style={styles.container}>
				<GoogleLog />
				<form className="login-form" onSubmit={this.loginHandler}>
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
					<RaisedButton type="submit" label="Login" fullWidth={true} />
					{renderServerError}
				</form>
				<section style={styles.desc}>
					Do not have an account? <Link to="/register" style={styles.link}>Sign up</Link>
				</section>
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


const styles = {
	container: {
		maxWidth: '320px',
		backgroundColor: 'rgba(255,255,255,1)',
		padding: 20
	},
	desc: {
		border: '0.5px solid rgba(16, 36, 94, 0.2)',
		padding: 20,
		marginTop: 10,
		marginBottom: 10
	},
	link: {
		textDecoration: 'none',
		marginLeft: 5
	}
}
