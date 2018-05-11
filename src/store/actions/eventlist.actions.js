//================================== Import Dependencies ====================>
import axios from 'axios'; // Needed for network requests on Async actions
import { API_BASE_URL } from '../../config';
import moment from 'moment';

//================================== Store Actions ====================>
export const STORE_EVENTLIST = 'STORE_EVENTLIST';
export const storeEventList = events => ({
  type: STORE_EVENTLIST,
  events
});

export const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT';
export const setCurrentEvent = event => ({
  type: SET_CURRENT_EVENT,
  event
});

//================================== Helper Functions ====================>
// In this function we want to loop through a list of events with Number start times and produce the earliest event occuring *after* the current moment.

function earlyEvent(events) {
  let now = Number(Date.now());
  // assign an infinite value to this so that the first date to be compared to it compares as less then.
  let tempEventTime = Infinity;
  let resultingEvent;

  // this loop will take the current event and compare it's time value to the current moment. Is it greater than the current moment? Then it is in the future, so we want to consider it. Is it later than our tempEventTime (which represents the latest event time in our list the loop has access to at the moment)?. If it is later, then nothing is done. If it is earlier, then the time value is assigned as the tempEventTime and the return value is assigned to that event.
  events.forEach(event => {
    const eventTime = Number(event.starttime);
    if (eventTime > now && eventTime < tempEventTime) {
      tempEventTime = eventTime;
      resultingEvent = event;
    }
  });

  return resultingEvent;
}

//================================== Asynchronous Actions ====================>
export const fetchUserEvents = () => (dispatch, getState) => {
  axios({
    url: `${API_BASE_URL}/api/events`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getState().auth.authToken}`
    }
  })
    .then(response => {
      let lastViewedId = localStorage.getItem('lastViewedEvent');
      let lastViewedTimestamp = Number(localStorage.getItem('lastViewedTimestamp'));

      if (
        lastViewedId &&
				lastViewedTimestamp &&
				moment(lastViewedTimestamp).diff(Number(Date.now()), 'days') < 5
      ) {
        let lastViewedEvent = response.data.filter(event => event.id === lastViewedId);
        if (
          lastViewedEvent.length &&
					lastViewedEvent[0].user === getState().auth.currentUser.user.id
        ) {
          dispatch(setCurrentEvent(lastViewedEvent[0]));
        } else {
          let eventDefault = earlyEvent(response.data);
          if (eventDefault) {
            dispatch(setCurrentEvent(eventDefault));
          }
        }
      } else {
        let eventDefault = earlyEvent(response.data);
        if (eventDefault) {
          dispatch(setCurrentEvent(eventDefault));
        }
      }
      dispatch(storeEventList(response.data));
    })
    .catch(err => {
      console.log(err);
    });
};
