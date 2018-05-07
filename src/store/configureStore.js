//================================== Import Dependencies ====================>

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import coordinateReducer from './reducers/reducer_coordinates';
import authReducer from './reducers/auth';
import eventReducer from './reducers/events.reducers';

//================================== Establish Root Reducer ====================>

const rootReducer = combineReducers({
  coordinates: coordinateReducer,
  auth: authReducer,
  events: eventReducer
});

// use thunk middleware instead
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
export default store;
