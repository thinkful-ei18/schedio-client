import React from 'react';
import Map from './MapWidget';
// import LocationSearch from '../Utilities/LocationSearch';

export default class MapConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      address: 'somewhere',
      coordinate: null
    };
    this.address = null;
    this.coordinate = null;
    this.mapUpdate = null;
  }

	handleChange = event => {
	  this.setState({ title: event.target.value });
	};
	handleSubmit = e => {
	  e.preventDefault();
	  this.setState({
	    address: this.address,
	    coordinate: this.coordinate
	  });
	};
	render() {
	  console.log(this.state, this.title);
	  return (
	    <div style={styles.container}>
	      <Map
	        info={{
	          location: {
	            address: this.state.address,
	            lat: this.state.coordinate ? this.state.coordinate.lat : 12,
	            lng: this.state.coordinate ? this.state.coordinate.lng : 12
	          }
	        }}
	      />
	    </div>
	  );
	}
}

const styles = {
  searchBar: {
    marginBottom: 100,
    height: '500px'
  },
  formItem: {
    padding: 10
  }
};
