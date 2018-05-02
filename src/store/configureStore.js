import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import coordinateReducer from './reducers/reducer_coordinates';
import catReducer from './reducers/cat'
import dogReducer from './reducers/cat'
import authReducer from './reducers/auth'

const rootReducer = combineReducers({
cat:catReducer,
dog:dogReducer,
coordinates:coordinateReducer,
auth: authReducer
});

const middlewares = [thunk];

let composeEnhancers;

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};

export default configureStore;
