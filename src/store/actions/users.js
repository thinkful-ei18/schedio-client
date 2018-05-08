import { normalizeResponseErrors } from './utils';
import { API_BASE_URL } from '../../config';
import {} from '../actions/';

export const registerUser = user => dispatch => {
  console.log(user);
  return fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
    });
};
