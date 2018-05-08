import jwtDecode from 'jwt-decode';
import { API_BASE_URL } from '../../config';
import { normalizeResponseErrors } from './utils';
import { setAuthToken, authSuccess, authRequest, authError, clearAuth } from './actionType';
import { saveAuthToken, clearAuthToken } from '../../local-storage';
import axios from 'axios';


const storeAuthInfo = (authToken, dispatch) => {
	const decodedToken = jwtDecode(authToken);
	dispatch(setAuthToken(authToken));
	dispatch(authSuccess(decodedToken.user));
	saveAuthToken(authToken);
};

export const login = loginInfo => dispatch => {
	dispatch(authRequest());
	axios({
		url: `${API_BASE_URL}/login/local/`,
		method: 'POST',
		headers: {
			'content-Type': 'application/json'
		},
		data: JSON.stringify(loginInfo)
	})
		.then(response => {
			console.log(response);
			storeAuthInfo(response.data.authToken, dispatch);
		})

		.catch(err => {
			const { code } = err;
			const message =
				code === 401 ? 'Incorrect username or password' : 'Unable to login, please try again';
			dispatch(authError(err));
			//   // Could not authenticate, so return a SubmissionError for Redux
			//   // Form
			//   return Promise.reject(new Error(message));
		});
};

export const refreshAuthToken = () => (dispatch, getState) => {
	dispatch(authRequest());
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/login/local/refresh`, {
		method: 'POST',
		headers: {
			// Provide our existing token as credentials to get a new one
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({ authToken }) => storeAuthInfo(authToken, dispatch))
		.catch(err => {
			// We couldn't get a refresh token because our current credentials
			// are invalid or expired, or something else went wrong, so clear
			// them and sign us out
			dispatch(authError(err));
			dispatch(clearAuth());
			clearAuthToken(authToken);
		});
};
