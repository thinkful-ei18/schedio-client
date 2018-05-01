import {FETCH_CATS_REQUEST, FETCH_CATS_SUCCESS, FETCH_CATS_FAILURE, DELETE_CAT_REQUEST, DELETE_CAT_SUCCESS, DELETE_CAT_FAILURE} from './actionType'

export const getCats = () => dispatch => {
  dispatch({ type: FETCH_CATS_REQUEST });
  fetch('https://www.mocky.io/v2/5185415ba171ea3a00704eed')
    .then(results => {
      return results.json();
    })
    .then(data => {
      return dispatch({ type: FETCH_CATS_SUCCESS, payload: data });
    })
    .catch(err => {
      return dispatch({ type: FETCH_CATS_FAILURE, payload: err });
    });
};

export const deleteCat = () => dispatch => {
  dispatch({ type: DELETE_CAT_REQUEST });
  fetch('https://www.mocky.io/v2/5185415ba171ea3a00704eed', {
    method: 'delete'
  }).then(result => {
    return result.json();
  }).then (data => {
    return dispatch({type: DELETE_CAT_SUCCESS, payload: data})
  })
  .catch(err => {
    return dispatch({type: DELETE_CAT_FAILURE, payload: err})
  })
};