import {FETCH_DOGS_REQUEST, FETCH_DOGS_FAILURE, FETCH_DOGS_SUCCESS, DELETE_DOG_FAILURE, DELETE_DOG_REQUEST, DELETE_DOG_SUCCESS} from './actionType'

export const getDogs = () => dispatch => {
  dispatch({type: FETCH_DOGS_REQUEST})
  fetch('https://www.mocky.io/v2/5185415ba171ea3a00704eed')
  .then(results => {
    return results.json()
  })
  .then(data => {
    return dispatch({type: FETCH_DOGS_SUCCESS, payload:data})
  })
  .catch(err => {
    return dispatch ({type: FETCH_DOGS_FAILURE, payload:err})
  })
  
}

export const deleteDog = () => dispatch => {
  dispatch({ type: DELETE_DOG_REQUEST });
  fetch('https://www.mocky.io/v2/5185415ba171ea3a00704eed', {
    method: 'delete'
  }).then(result => {
    return result.json();
  }).then (data => {
    return dispatch({type: DELETE_DOG_SUCCESS, payload: data})
  })
  .catch(err => {
    return dispatch({type: DELETE_DOG_FAILURE, payload: err})
  })
};