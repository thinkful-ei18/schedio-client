//================================== Import Dependencies ====================>
import axios from 'axios';
import {API_BASE_URL} from '../../../config';
//================================== Store Dispatch Actions ====================>


//Set Saved Restaurant Information
export const SET_RESTAURANT_INFO = 'SET_RESTAURANT_INFO';
export const setRestaurantInfo = restaurantInfo => ({
  type:SET_RESTAURANT_INFO,
  restaurantInfo
});


//Clear Saved restaurant Information

export const CLEAR_RESTAURANT_DATA = 'CLEAR_RESTAURANT_DATA';
export const clearRestaurantData = () => ({
  type:CLEAR_RESTAURANT_DATA
});


//================================== Asynchronous Actions ====================>

export const persistRestaurantChoice = (id,restaurantInfo) => (dispatch, getState) => {
  restaurantInfo.requestType='setInfo';
  axios({
    'url':`${API_BASE_URL}/api/events/${id}/foodanddining`,
    'method':'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${getState().auth.authToken}`
    },
    data: JSON.stringify({restaurantInfo})

  });
};

export const clearRestaurantChoice = (id) => (dispatch, getState) => {
  const restaurantInfo = {
    requestType:'clearInfo'
  };
  
  axios({
    'url':`${API_BASE_URL}/api/events/${id}/foodanddining`,
    'method':'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${getState().auth.authToken}`
    },
    data: JSON.stringify({restaurantInfo})

  });
};