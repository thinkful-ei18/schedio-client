import { CREATE_EVENT } from '../actions/eventcreation';

const initialState = {
	activeEvent: {
		id: null,
		location: null,
		lat: null,
		lng: null,
		starttime: null,
		title: null,
		widgets: null
	}
	/*======= other props waiting to fill up
    state related to events goes below
  */
};

export default function eventReducer(state = initialState, action) {
	let newState;
	if (action.type === CREATE_EVENT) {
		console.log('reducer');
		newState = action.event;
		return { ...state, activeEvent: newState };
	}
	return state;
}
