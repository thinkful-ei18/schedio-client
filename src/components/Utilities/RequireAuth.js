import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default () => Component => {
	function RequireAuth(props) {
		const { authenticating, loggedIn, error, loading, ...passThroughProps } = props;
		if (authenticating) {
			return <div>Logging in...</div>;
		} else if (!loggedIn) {
			return <Redirect to="/" />;
		}

		return <Component {...passThroughProps} />;
	}

	const displayName = Component.displayName || Component.name || 'Component';
	RequireAuth.displayName = `RequireAuth(${displayName})`;

	const mapStateToProps = (state, props) => ({
		authenticating: state.auth.loading,
		loggedIn: state.auth.authToken !== null,
		error: state.auth.error
	});

	return connect(mapStateToProps)(RequireAuth);
};
