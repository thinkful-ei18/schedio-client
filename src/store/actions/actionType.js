export const FETCH_CATS_REQUEST = 'FETCH_CATS_REQUEST';
export const FETCH_CATS_SUCCESS = 'FETCH_CATS_SUCCESS';
export const FETCH_CATS_FAILURE = 'FETCH_CATS_FAILURE';

export const DELETE_CAT_REQUEST = 'DELETE_CAT_REQUEST';
export const DELETE_CAT_SUCCESS = 'DELETE_CAT_SUCCESS';
export const DELETE_CAT_FAILURE = 'DELETE_CAT_FAILURE';

export const FETCH_DOGS_REQUEST = 'FETCH_DOGS_REQUEST';
export const FETCH_DOGS_SUCCESS = 'FETCH_DOGS_SUCCESS';
export const FETCH_DOGS_FAILURE = 'FETCH_DOGS_FAILURE';


export const DELETE_DOG_REQUEST = 'DELETE_DOG_REQUEST';
export const DELETE_DOG_SUCCESS = 'DELETE_DOG_SUCCESS';
export const DELETE_DOG_FAILURE = 'DELETE_DOG_FAILURE';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
    type: AUTH_SUCCESS,
    currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});