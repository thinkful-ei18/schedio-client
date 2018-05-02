import axios from 'axios';
import {FETCH_COORDINATES} from './actionType';

// google geolocation api
const GEO_ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const GEO_KEY = '&key=AIzaSyATySdNMMYE-uv4PmUb3RqYgDcHCARsvMQ';

// export const FETCH_COORDINATES = 'FETCH_COORDINATES';

export function fetchCoordinates(address) {
  const url = `${GEO_ROOT_URL}${address}${GEO_KEY}`;
  
  const request = axios.get(url)
    .then(coor => {
      const latCoor = (coor.data.results[0].geometry.location.lat);
      const lngCoor = (coor.data.results[0].geometry.location.lng);
      console.log(latCoor, lngCoor);
      return [latCoor, lngCoor];
    });

  return {
    type: FETCH_COORDINATES,
    payload: request
  }
}