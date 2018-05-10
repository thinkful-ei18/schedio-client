import { CREATE_EVENT } from '../actions/eventcreation';
import { STORE_EVENTLIST, SET_CURRENT_EVENT } from '../actions/eventlist.actions';
import { TOGGLE_WIDGET_DISPLAY } from '../actions/widgetManage';

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
    widgets: {}
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
          ...action.event.location
        },
        starttime: action.event.starttime,
        title: action.event.title,
        widgets: action.event.widgets
      }
    };

    //----------------

    /*========= reserved spots for widget management actions ==========
  */
  case TOGGLE_WIDGET_DISPLAY:
    return {
      ...state,
      activeEvent: {
        ...state.activeEvent,
        widgets: {
          ...state.activeEvent.widgets,
          [action.widget]: {
            displayed: !state.activeEvent.widgets[action.widget].displayed
          }
        }
      }
    };

    //----------------

    // case SET_TODO_CHECKED:
    // return {
    //   ...state,
    //   activeEvent: {
    //     ...state.activeEvent,
    //     widgets: {
    //       ...state.activeEvent.widgets,
    //       'todo': {
    //         ...state.activeEvent.widgets.todo,
    //         list: {
    //           ...state.activeEvent.widgets.todo.list,
    //           state.activeEvent.widgets.find()
    //         }
    //       }
    //     }
    //   }
    // }

  default:
    return state;

		//--------------
  }
}
