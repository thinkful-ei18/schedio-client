import {
  FETCH_DOGS_REQUEST,
  FETCH_DOGS_SUCCESS,
  FETCH_DOGS_FAILURE,
  DELETE_DOG_REQUEST,
  DELETE_DOG_SUCCESS,
  DELETE_DOG_FAILURE
} from '../actions/actionType';

const initialState = {
  data: null,
  error: null,
  loading: false
};

export default function reducer(state = initialState, action) {
 
  switch (action.type) {
    case FETCH_DOGS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_DOGS_SUCCESS:
      return {
        ...state,
        data: [action.payload]
      }
      case FETCH_DOGS_FAILURE: 
      return {
        ...state,
        error: action.payload
      }
      case DELETE_DOG_REQUEST:
      return {
        ...state,
        loading: true
      }
      case DELETE_DOG_SUCCESS:
      return {
        ...state,
        data: [action.payload]
      }
      case DELETE_DOG_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default: {
      return { ...state };
    }
  }
}