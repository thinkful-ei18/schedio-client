//================================== Import Dependencies ====================>
import axios from 'axios'; // Needed for network requests on Async actions
import {API_BASE_URL} from '../../config';

//================================== Store Actions ====================>
export const STORE_EVENTLIST = 'STORE_EVENTLIST';
export const storeEventList = events => ({
  type:STORE_EVENTLIST,
  events
});


export const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT';
export const setCurrentEvent = event => ({
  type:SET_CURRENT_EVENT,
  event
});

//================================== Helper Functions ====================>
function earlyEvent(events) {
  let earlyEventTime = 3250368000000;
  let earlyEvent;
  
  for (let i = 0; i < events.length; i++) {
    const currentEvent = parseInt(events[i].starttime);
    if (currentEvent < earlyEventTime) {
      earlyEventTime = currentEvent;
      earlyEvent = events[i];
    }
  }
  
  let data = {};
  for (let k in earlyEvent) {
    if (earlyEvent.hasOwnProperty(k) && k === 'location') {
      data = earlyEvent[k];
    }
  }
  
  return earlyEvent;
};


//================================== Asynchronous Actions ====================>
export const fetchUserEvents = () => (dispatch,getState) => {
  axios({
    'url':`${API_BASE_URL}/api/events`,
    'method':'GET',
    headers: {
      'content-type':'application/json',
      'Authorization': `Bearer ${getState().auth.authToken}`
    }
  })
    .then(response => {
      // loop over response.data to find what is earliest
      let eventDefault = earlyEvent(response.data);
      dispatch(setCurrentEvent(eventDefault))
      dispatch(storeEventList(response.data));
    })
    .catch(err => {
      console.log(err);
    });
};