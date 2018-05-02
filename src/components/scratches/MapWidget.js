import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
export class MapWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: {
				lat: -34.397,
				lng: 150.644
			},
			marker: {
				lat: -34.397,
				lng: 150.644
			},
			address: ''
		};
	}
	render() {
		return (
			<div>
				{/* <MapWidget
					isMarkerShown={true}
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDre2JV9TmMIIXbaIlxwHwDjopIsSvs3ow"
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ maxHeight: `400px`, height: `400px` }} />}
					mapElement={<div style={{ height: `100%` }} />}
				/> */}
				<GoogleMap defaultZoom={8} center={this.state.center}>
					<InfoBox
						position={this.state.center}
						options={{ closeBoxURL: ``, enableEventPropagation: true }}
					>
						<div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
							<div style={{ fontSize: `16px`, fontColor: `#08233B` }}>Hello, Taipei!</div>
						</div>
					</InfoBox>
					{this.props.isMarkerShown && <Marker position={this.state.marker} />}
				</GoogleMap>
			</div>
		);
	}
}

export default withScriptjs(withGoogleMap(MapWidget));
