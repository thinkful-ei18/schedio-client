
//================================== Import Dependencies ====================>

import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR
} from '../actions/actionType';
// import {loadAuthToken} from '../../local-storage';
import jwtDecode from 'jwt-decode';
import { SET_USER } from '../actions/users'


//================================== Construct Initial State ====================>

const initialState = {
  authToken: localStorage.getItem('authToken') || null, // authToken !== null does not mean it has been validated
  currentUser: localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null,
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.authToken
    });
  } else if (action.type === CLEAR_AUTH) {
    return Object.assign({}, state, {
      authToken: null,
      currentUser: null
    });
  } else if (action.type === AUTH_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  } else if (action.type === AUTH_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      currentUser: action.currentUser
    })
  } else if (action.type === AUTH_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  else if (action.type === SET_USER) {
    return {
      ...state, currentUser: {
        user: { ...state.currentUser.user, ...action.user }
      }
    }
  }

  return state;
}
