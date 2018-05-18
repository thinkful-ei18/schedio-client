import { API_BASE_URL } from '../../config';
import { normalizeResponseErrors } from './utils';
import {setCurrentEvent} from '../actions/eventlist.actions';

export const CREATE_EVENT = 'CREATE_EVENT';
export const createEvent = event => ({
  type: CREATE_EVENT,
  event
});
export const asyncCreateEvent = newEvent => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(newEvent)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(event => {
      localStorage.setItem('lastViewedEvent', event.id);
      localStorage.setItem('lastViewedTimestamp', Number(Date.now()));
    })
    .catch(error => {
      throw new Error('error that is not so nice');
    });
};
