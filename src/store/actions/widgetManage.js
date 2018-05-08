import { API_BASE_URL } from '../../config';
import { normalizeResponseErrors } from './utils';

export const TOGGLE_WIDGET_DISPLAY = 'TOGGLE_WIDGET_DISPLAY';
export const toggleWidgetDisplay = widget => ({
  type: TOGGLE_WIDGET_DISPLAY,
  widget
});

export const submitWidgetDisplay = event => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/${event.id}/display`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(event)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => console.log(res));
};
