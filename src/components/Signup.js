import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from 'material-ui';
import { registerUser } from '../store/actions/users';
import { authError } from '../store/actions/actionType';
import { Link } from 'react-router-dom'
import './signup.css';
import RaisedButton from 'material-ui/RaisedButton'

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
			<div className="landing-container" style={styles.container}>
				<form onSubmit={this.signUpHandler}>
					<legend style={{ fontWeight: "bold" }}>User Registration</legend>
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
					<RaisedButton type="submit" label="Sign Up" fullWidth={true} />
					<br />
					{renderError}
				</form>
				<section style={styles.desc}>
					Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
				</section>
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


const styles = {
	container: {
		maxWidth: '320px',
		backgroundColor: 'rgba(255,255,255,1)',
		padding: 20
	},
	desc: {
		border: '0.5px solid rgba(16, 36, 94, 0.2)',
		padding: '20px 10px 20px 10px',
		marginTop: 10,
		marginBottom: 10,
		color: '#757575'
	},
	link: {
		textDecoration: 'none',
		marginLeft: 5
	}
}
