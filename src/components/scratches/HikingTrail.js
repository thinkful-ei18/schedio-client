import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';
// import './LocationSearch.css';

// hiking trail api
const API_KEY = '&key=200228532-bc7667c06009a2e233ef5527dbb3a053';
const API_ROOT_URL = 'https://www.hikingproject.com/data/get-trails?';
let trails;

export default class HikingTrail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
			address: '',
			trails: null
		};
  }

	handleChange = address => {
	  this.setState({ address });
	};

	handleSelect = address => {
	  geocodeByAddress(address)
	    .then(results => getLatLng(results[0]))
	    .then(latLng => {
				console.log(latLng.lat, latLng.lng);
				const url = `${API_ROOT_URL}lat=${latLng.lat}&lon=${latLng.lng}&maxDistance=10${API_KEY}`;
				console.log(url);
				trails = axios.get(url) || {};
				console.log(trails);
				
				const coor = (Object.values(trails)[0]) || {};
				console.log(coor);
				
				
				this.setState({ trails });
				// console.log(this.props.trails);
				
	      // this.props.trails(trails);
	      // this.props.coordinate(latLng);
	    })
	    // .catch(error => this.props.error(error));
	};

	render() {
		// console.log(this.props.trails);
		
		
	  return (
	    <PlacesAutocomplete
	      value={this.state.address}
	      onChange={this.handleChange}
	      onSelect={this.handleSelect}
	    >
	      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
	        <div>
	          <input
	            {...getInputProps({
	              placeholder: 'Search Places ...',
	              className: 'location-search-input'
	            })}
	          />
	          <div className="autocomplete-dropdown-container">
	            {suggestions.map(suggestion => {
	              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
	              // inline style for demonstration purpose
	              const style = suggestion.active
	                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
	                : { backgroundColor: '#ffffff', cursor: 'pointer' };
	              return (
	                <div {...getSuggestionItemProps(suggestion, { className, style })}>
	                  <span>{suggestion.description}</span>
	                </div>
	              );
	            })}
	          </div>
	        </div>
	      )}
	    </PlacesAutocomplete>
	  );
	}
}
