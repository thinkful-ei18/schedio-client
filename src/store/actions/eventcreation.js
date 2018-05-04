import { API_BASE_URL } from '../../config';
import { normalizeResponseErrors } from './utils';

export const CREATE_EVENT = 'CREATE_EVENT';
export const createEvent = event => ({
	type: CREATE_EVENT,
	event
});
export const asyncCreateEvent = newEvent => (dispatch, getState) => {
	/*========= waiting for auth token ==============
    //todo 
  */
	// const authToken = getState().auth.authToken
	// temp solution
	const authToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImxvY2FsIjp7ImZpcnN0bmFtZSI6IiJ9LCJnb29nbGUiOnsiaWQiOiIxMDEzNTAwODcxMDQ4Mjg3MTQzMTUiLCJmaXJzdG5hbWUiOiJaaG91IiwidXNlcm5hbWUiOiJ6aHkwMzE5QGdtYWlsLmNvbSIsInBob3RvIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1YZFVJcWRNa0NXQS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS80MjUycnNjYnY1TS9waG90by5qcGc_c3o9NTAifSwiaWQiOiI1YWViZWFiZmM3YThmMjMzMjBkMzhkNzIifSwiaWF0IjoxNTI1NDEwODQ4LCJleHAiOjE1MjYwMTU2NDgsInN1YiI6InpoeTAzMTlAZ21haWwuY29tIn0.ut4YcFqVS36dSE-rqSvZe4L9nzAWO-n0aD9Von6-_3U';

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
		.then(
			event => event,
			error => {
				throw new Error(`error that is not so nice`);
			}
		);
};
