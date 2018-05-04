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
	events: eventReducer,
});

const middleware = [thunk];

let composeEnhancers;

if (process.env.NODE_ENV === 'development') {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
	return createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
};

export default configureStore;
