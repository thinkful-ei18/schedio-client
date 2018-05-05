import { CREATE_EVENT } from '../actions/eventcreation';
import { STORE_EVENTLIST } from '../actions/eventlist.actions';

const initialState = {
	activeEvent: {
		id: null,
		location: null,
		starttime: null,
		title: null,
		widgets: null
	},
	// Eventlist: a list of events that belong to the user. Retrieved from the DB in order to list upcoming and past events.
	eventList: null
	/*======= other props waiting to fill up
    state related to events goes below
  */
};

export default function eventReducer(state = initialState, action) {
	switch (action.type) {
		//---------------
		case CREATE_EVENT:
			return {
				...state,
				activeEvent: action.event
			};

		//----------------
		case STORE_EVENTLIST:
			console.log('store eventlist reducer was hit');
			return {
				...state,
				eventList: action.events
			};

		//----------------
		default:
			return {
				state
			};

		//--------------
	}
}
