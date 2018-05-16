import { CREATE_EVENT } from '../actions/eventcreation';
import { STORE_EVENTLIST, SET_CURRENT_EVENT } from '../actions/eventlist.actions';
import { TOGGLE_WIDGET_DISPLAY } from '../actions/widgetManage';

import { TOGGLE_TODO_CHECKED, DELETE_TODO, ADD_TODO } from '../actions/widgetAction/todolist.actions';

import {SET_RESTAURANT_INFO, CLEAR_RESTAURANT_DATA} from '../actions/widgetAction/foodwidget.actions';
import {ADD_TRAIL, DELETE_TRAIL} from '../actions/widgetAction/hikingWidget.action';


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

    case TOGGLE_TODO_CHECKED:
      return {
        ...state,
        activeEvent: {
          ...state.activeEvent,
          widgets: {
            ...state.activeEvent.widgets,
            'todo': {
              ...state.activeEvent.widgets.todo,
              list: [
                ...state.activeEvent.widgets.todo.list.map(item => {
                  if (item.id === action.todoId) {
                    return Object.assign({}, item, { completed: !item.completed });
                  } else {
                    return Object.assign({}, item);
                  }
                })
              ]
            }
          }
        }
      };

    case DELETE_TODO:
      return {
        ...state,
        activeEvent: {
          ...state.activeEvent,
          widgets: {
            ...state.activeEvent.widgets,
            'todo': {
              ...state.activeEvent.widgets.todo,
              list: [
                ...state.activeEvent.widgets.todo.list.filter(item => {
                  return item.id !== action.todoId;
                })
              ]
            }
          }
        }
      };


    case ADD_TODO:
      return {
        ...state,
        activeEvent: {
          ...state.activeEvent,
          widgets: {
            ...state.activeEvent.widgets,
            'todo': {
              ...state.activeEvent.widgets.todo,
              list: [
                ...state.activeEvent.widgets.todo.list,
                action.todoItem
              ]
            }
          }
        }
      };

  case SET_RESTAURANT_INFO:
    return {
      ...state,
      activeEvent: {
        ...state.activeEvent,
        widgets: {
          ...state.activeEvent.widgets,
          'foodanddining': {
            ...state.activeEvent.widgets.foodanddining,
            info:action.restaurantInfo
          }
        }
      }
    };

  case CLEAR_RESTAURANT_DATA:
    return {
      ...state,
      activeEvent: {
        ...state.activeEvent,
        widgets: {
          ...state.activeEvent.widgets,
          'foodanddining': {
            ...state.activeEvent.widgets.foodanddining,
            info:{}
          }
        }
      }
    };

  case ADD_TRAIL:
    return {
      ...state, 
      activeEvent: {
        ...state.activeEvent,
        widgets: {
          ...state.activeEvent.widgets,
          'outdooractivities': {
            ...state.activeEvent.widgets.outdooractivities,
            info: {
              ...state.activeEvent.widgets.outdooractivities.trail,
              ...action.trail
            }
          }
        }
      }
    }

  default:
    return state;

  }
}
