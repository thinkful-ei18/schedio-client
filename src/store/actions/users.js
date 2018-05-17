import { normalizeResponseErrors } from './utils';
import { API_BASE_URL } from '../../config';

export const SET_USER = 'SET_USER'
export const setUser = user => ({
  type: SET_USER,
  user
});


export const registerUser = user => dispatch => {
  return fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json());
};

export const changeUserName = (id, username) => (dispatch, getState) => {
  return fetch(`${API_BASE_URL}/user/${id}/username`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getState().auth.authToken}`
    },
    body: JSON.stringify({ username })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(user => dispatch(setUser(user)))
}

export const changeFirstName = (id, firstname) => (dispatch, getState) => {
  console.log("hello")
  return fetch(`${API_BASE_URL}/user/${id}/firstname`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getState().auth.authToken}`
    },
    body: JSON.stringify({ firstname })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(user => dispatch(setUser(user)))
}

export const validatePassword = (id, username, password) => (dispatch, getState) => {
  return fetch(`${API_BASE_URL}/user/${id}/password`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getState().auth.authToken}`
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
}

export const resetPassword = (id, password) => (dispatch, getState) => {
  return fetch(`${API_BASE_URL}/user/${id}/reset`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getState().auth.authToken}`
    },
    body: JSON.stringify({ password })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json());
}
