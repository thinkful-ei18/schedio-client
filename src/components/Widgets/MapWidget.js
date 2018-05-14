/* global */
import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
// import LocationSearch from '../Utilities/LocationSearch';
import { InfoWindow } from 'react-google-maps';
import MediaQuery from 'react-responsive';
import './mapWidget.css';

export default class Map extends React.Component {
  render() {
    const { configInfo, event } = this.props;
    const location = event.location;
    const widgetInfo = event.widgets['map'].info;

    return (
      <div>
        <section>
          <MapWrapper
            isMarkerShown={true}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDre2JV9TmMIIXbaIlxwHwDjopIsSvs3ow&libraries=places"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={
              <div style={{ maxHeight: '250px', height: '250px' }} />
            }
            mapElement={
              <div
                style={{
                  height: '100%',
                  boxShadow: '0 5px 10px 0 rgba(16, 36, 94, 0.2)'
                }}
              />
            }
            info={configInfo || widgetInfo}
            fallback={location}
          />
        </section>
      </div>
    );
  }
}

/*========== sub component for map =========
@ props = {info, fallback}
*/
class MapWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }
  render() {
    const { info, fallback, isMarkerShown } = this.props;
    let renderInfoBox = '';
    renderInfoBox = (
      <section style={styles.infoBox}>
        {info ? info.address : fallback.address}
      </section>
    );
    return (
      <div style={styles.container}>
        {/* {renderInfoBox} */}
        <GoogleMap
          defaultZoom={info ? 14 : 8}
          center={
            info
              ? { lat: info.lat, lng: info.long }
              : { lat: fallback.lat, lng: fallback.long }
          }
        >
          {isMarkerShown && (
            <Marker
              position={
                info
                  ? { lat: info.lat, lng: info.long }
                  : { lat: fallback.lat, lng: fallback.long }
              }
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            >
              {this.state.isOpen && (
                <InfoWindow
                  onCloseClick={() => this.setState({ isOpen: false })}
                >
                  <div className="map-infoWindow">
                    {info ? info.address : fallback.address}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          )}
        </GoogleMap>
      </div>
    );
  }
}

const MapWrapper = withScriptjs(withGoogleMap(MapWidget));

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
    top: -140,
    left: 0,
    right: 0,
    zIndex: 999,
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '5px'
  }
};
