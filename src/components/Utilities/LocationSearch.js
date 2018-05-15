import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './LocationSearch.css';
import TextField from 'material-ui/TextField';
export default class LocationSearchInput extends React.Component {
  /*======

	<LocationSearch address={cb} coordinate={cb} />
	=========
	*/
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

	handleChange = address => {
	  this.setState({ address });
	};

	handleSelect = address => {
	  geocodeByAddress(address)
	    .then(results => getLatLng(results[0]))
	    .then(latLng => {
	      this.props.address(address);
	      this.props.coordinate(latLng);
	    })
	    .catch(error => this.props.error(error));
	};

	render() {
	  return (
	    <PlacesAutocomplete
	      value={this.state.address}
	      onChange={this.handleChange}
	      onSelect={this.handleSelect}
	    >
	      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
	        <div>
	          <TextField
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
	                ? { backgroundColor: '#fafafa', cursor: 'pointer', padding:'3px' }
	                : { backgroundColor: '#ffffff', cursor: 'pointer', padding:'3px' };
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
