//================================== Import Dependencies ====================>
import axios from 'axios'; // Needed for network requests on Async actions
import {API_BASE_URL} from '../../config';

//================================== Store Actions ====================>
export const STORE_EVENTLIST = 'STORE_EVENTLIST';
export const storeEventList = events => ({
  type:STORE_EVENTLIST,
  events
})




//================================== Asynchronous Actions ====================>
export const fetchUserEvents = () => dispatch => {
  console.log('async request');
  axios({
    'url':`${API_BASE_URL}/api/events`,
    'method':'GET',
    headers: {
      'content-type':'application/json'
    }
  })
  .then(response => {
    dispatch(storeEventList(response.data));
  })
  .catch(err => {
    console.log(err);
  })
};