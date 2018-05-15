import { API_BASE_URL } from '../../../config';
import { normalizeResponseErrors } from '../utils';
export const updateMapWidget = (id, info) => (dispatch, getState) => {
  return fetch(`${API_BASE_URL}/api/events/${id}/map`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getState().auth.authToken}`
    },
    body: JSON.stringify({ info })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
};
