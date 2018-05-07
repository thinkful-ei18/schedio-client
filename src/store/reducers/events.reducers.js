import { CREATE_EVENT } from '../actions/eventcreation';
import { STORE_EVENTLIST, SET_CURRENT_EVENT } from '../actions/eventlist.actions';

const initialState = {
  activeEvent: {
    id: null,
    location: {
      lat: null,
      long: null,
      address: null
    },
    starttime: null,
    title: null,
    widgets: null
  },
  eventList: null
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
    return {
      ...state,
      eventList: action.events
    };

    //-----------------
  case SET_CURRENT_EVENT:
    return {
      ...state,
      activeEvent: {
        id: action.event.id,
        location: {
          lat: action.event.location.lat,
          long: action.event.location.long,
          address: null
        },
        starttime: action.event.starttime,
        title: action.event.title,
        widgets: action.event.widgets
      }
    };

    //----------------
  default:
    return state;

		//--------------
  }
}
