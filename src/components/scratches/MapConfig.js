import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import LocationSearch from '../Utilities/LocationSearch';

class MapWidget extends React.Component {
  render() {
    let renderInfoBox = '';
    if (this.props.info) {
      renderInfoBox = <section style={styles.infoBox}>{this.props.info.address}</section>;
    }
    return (
      <div style={styles.container}>
        {renderInfoBox}
        <GoogleMap
          defaultZoom={14}
          center={
            this.props.info
              ? { lat: this.props.info.lat, lng: this.props.info.lng }
              : { lat: -34.397, lng: 150.644 }
          }
        >
          {this.props.isMarkerShown && (
            <Marker
              position={
                this.props.info
                  ? { lat: this.props.info.lat, lng: this.props.info.lng }
                  : { lat: -34.397, lng: 150.644 }
              }
            />
          )}
        </GoogleMap>
      </div>
    );
  }
}

const MapWrapper = withScriptjs(withGoogleMap(MapWidget));

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      address: '',
      lat: null,
      lng: null,
      showMap: false
    };
  }
	handleAddress = address => {
	  this.setState({ address });
	};
	handleCoordinate = coordinate => {
	  const { lat, lng } = coordinate;
	  this.setState({ lat, lng });
	};
	handleSubmit = e => {
	  e.preventDefault();
	  this.setState({ showMap: true });
	};
	handleTitleChange = e => {
	  e.preventDefault();
	  const title = e.target.value;
	  this.setState({ title });
	};
	render() {
	  console.log(this.state);
	  const { showMap, ...info } = this.state;

	  return (
	    <div>
	      {showMap ? (
	        <section style={styles.mapContainer}>
	          <div>
	            <button onClick={() => this.setState({ showMap: false })}>go back</button>
	            <button>confirm</button>
	          </div>
	          <MapWrapper
	            isMarkerShown={true}
	            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDre2JV9TmMIIXbaIlxwHwDjopIsSvs3ow&libraries=places"
	            loadingElement={<div style={{ height: '100%' }} />}
	            containerElement={<div style={{ maxHeight: '350px', height: '300px' }} />}
	            mapElement={
	              <div style={{ height: '100%', boxShadow: '0 5px 10px 0 rgba(16, 36, 94, 0.2)' }} />
	            }
	            info={info}
	          />
	        </section>
	      ) : (
	        <form onSubmit={this.handleSubmit} style={styles.container}>
	          <div>
	            <label style={{ display: 'block' }}>widget title</label>
	            <input
	              id="title"
	              name="title"
	              value={this.state.title}
	              onChange={this.handleTitleChange}
	            />
	          </div>
	          <div>
	            <label>Search for location</label>
	            <LocationSearch address={this.handleAddress} coordinate={this.handleCoordinate} />
	            <button type="submit">submit</button>
	          </div>
	        </form>
	      )}
	    </div>
	  );
	}
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10
    //   margin: 10
  },
  mapContainer: {
    padding: 10,
    marginTop: 10
  },
  infoBox: {
    margin: '0 auto',
    padding: 10,
    width: '280px',
    position: 'absolute',
    top: -140,
    left: 0,
    right: 0,
    zIndex: 999,
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)'
  }
};
