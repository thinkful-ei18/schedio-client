import jwtDecode from 'jwt-decode';
import { API_BASE_URL } from '../../config';
import { normalizeResponseErrors } from './utils';
import { setAuthToken, authSuccess, authRequest, authError, clearAuth } from './actionType';
import { saveAuthToken, clearAuthToken } from '../../local-storage';
import axios from 'axios';

const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken));
  saveAuthToken(authToken);
};

export const login = loginInfo => dispatch => {
  console.log('line 16');
  dispatch(authRequest());
  return axios({
    url: `${API_BASE_URL}/login/local/`,
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    data: JSON.stringify(loginInfo)
  }).then(response => {
    storeAuthInfo(response.data.authToken, dispatch);
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
