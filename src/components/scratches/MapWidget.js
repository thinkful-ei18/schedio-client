import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
const { SearchBox } = require('react-google-maps/lib/components/places/SearchBox');
class MapWidget extends React.Component {
  componentDidMount() {
    console.log(google);
  }
  render() {
    let renderInfoBox = '';
    if (this.props.info) {
      renderInfoBox = <section style={styles.infoBox}>{this.props.info.location.address}</section>;
    }
    return (
      <div style={styles.container}>
        {renderInfoBox}
        <GoogleMap
          defaultZoom={14}
          center={
            this.props.info
              ? { lat: this.props.info.location.lat, lng: this.props.info.location.lng }
              : { lat: -34.397, lng: 150.644 }
          }
        >
          <SearchBox>
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '32px',
                marginTop: '27px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses'
              }}
            />
          </SearchBox>
          {this.props.isMarkerShown && (
            <Marker
              position={
                this.props.info
                  ? { lat: this.props.info.location.lat, lng: this.props.info.location.lng }
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
  render() {
    return (
      <MapWrapper
        isMarkerShown={true}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDre2JV9TmMIIXbaIlxwHwDjopIsSvs3ow&libraries=places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ maxHeight: '400px', height: '400px' }} />}
        mapElement={
          <div style={{ height: '100%', boxShadow: '0 5px 10px 0 rgba(16, 36, 94, 0.2)' }} />
        }
        info={this.props.info}
      />
    );
  }
}

const styles = {
  container: {
    //   display: 'block',
    position: 'relative'
    //   margin: 10
  },
  searchBar: {
    margin: 'auto',
    backgroundColor: 'white',
    height: '50px',
    width: '500px',
    position: 'absolute',
    left: 100,
    right: 0,
    top: -100,
    zIndex: 999
  },
  infoBox: {
    margin: '0 auto',
    padding: 10,
    width: '280px',
    position: 'absolute',
    top: -160,
    left: 0,
    right: 0,
    zIndex: 999,
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)'
  }
};
