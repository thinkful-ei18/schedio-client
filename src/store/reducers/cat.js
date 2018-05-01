import { FETCH_CATS_REQUEST, FETCH_CATS_SUCCESS, FETCH_CATS_FAILURE, DELETE_CAT_REQUEST, DELETE_CAT_SUCCESS, DELETE_CAT_FAILURE } from '../actions/actionType';

const initialState = {
  data: null,
  error: null,
  loading: false
};

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case FETCH_CATS_REQUEST: return {
      ...state,
      loading: true
    }
    case FETCH_CATS_SUCCESS:
      return {
        ...state,
        data: [action.payload]
      }
      case FETCH_CATS_FAILURE: 
      return {
        ...state,
        error: action.payload
      }
      case DELETE_CAT_REQUEST: 
      return {
        ...state,
        loading: true
      }
      case DELETE_CAT_SUCCESS:
      return {
        ...state,
        data: [action.payload]
      }
      case DELETE_CAT_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default: {
      return { ...state };
    }
  }
}