import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';
import _ from 'lodash';
import ReactStars from 'react-stars';
import {connect} from 'react-redux';
import { fetchUserEvents } from '../../store/actions/eventlist.actions'
import {addTrail} from '../../store/actions/widgetAction/hikingWidget.action';
import store from '../../store/configureStore';
import {API_BASE_URL} from '../../config';

import './HikingSelect.css';

// hiking trail api
const API_KEY = '&key=200228532-bc7667c06009a2e233ef5527dbb3a053';
const API_ROOT_URL = 'https://www.hikingproject.com/data/get-trails?';

export class HikingSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
			address: '',
			trails: null,
			trail: null
		};
	}

	componentDidMount() {
		console.log(this.props.dispatch(fetchUserEvents()));
	}
	
	
	handleClick = (e) => {
		e.preventDefault();
		// this.props.dispatch(fetchUserEvents());	
		// this.setState({ trails: null });
		// this.setState({ trail: null });
	}

	handleChange = address => {
	  this.setState({ address });
	};

	handleSelect = address => {
	  geocodeByAddress(address)
	    .then(results => getLatLng(results[0]))
	    .then(latLng => {
				const hikingUrl = `${API_ROOT_URL}lat=${latLng.lat}&lon=${latLng.lng}&maxDistance=10${API_KEY}`;
				const response = axios.get(hikingUrl);
				return response;
			})
			.then(res => {
				let trails = res.data.trails;
				let trail = trails[Math.floor(Math.random() * 11)];
				console.log(trail);
				return trail;
			})
			.then(res => {
				return axios({
					'url':`${API_BASE_URL}/api/events/${this.props.event.id}/hiking`,
					'method':'PUT',
					headers: {
						'content-type': 'application/json',
						'Authorization': `Bearer ${store.getState().auth.authToken}`
					},
					data:JSON.stringify(res)
				})
				.then(response => {
					console.log(response);
					
					this.props.dispatch(addTrail(response.data.widgets.outdooractivities.info));				
				})
			})
			.catch(err => {console.log(err)});
	};

	renderTrails = () => {
		const { activeEvent } = this.props;
		console.log(activeEvent);
		console.log(activeEvent.widgets.outdooractivities.info);
		
		if (!activeEvent.widgets.outdooractivities.info) {

			const styleSearch = {
				// width: "100%",
				height: "300px",
				"background-size": "cover",
				"background-position": "top",
				backgroundImage: `url(https://www.banfftours.com/wp-content/uploads/2017/01/Hiking-Lake-Louise-5.jpg)`
			}

			return (
				<div className='places' >
					<PlacesAutocomplete
						value={this.state.address}
						onChange={this.handleChange}
						onSelect={this.handleSelect}
					>
						{({ getInputProps, suggestions, getSuggestionItemProps }) => (
							<div className="hiking-widget-container" style={styleSearch}>
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
								<h4>Input location to find a hiking trail</h4>
							</div>
						)}
					</PlacesAutocomplete>
				</div>
			);
		}
		else if (activeEvent.widgets.outdooractivities.info) {
			// if image not present provide backup
			const trail = activeEvent.widgets.outdooractivities.info;
			
			if (trail.imgMedium === '') {
				trail.imgMedium = 'https://i.pinimg.com/originals/a4/b0/c4/a4b0c4fc44ec75c55d7d40a1d3994435.jpg';
			}
	
			// styling img as background
			const sectionStyle = {
				width: "100%",
				"background-size": "cover",
				"background-position": "top",
				backgroundImage: `url(${trail.imgMedium})`
			};
	
			// difficulty scored on color -> convert to word
			let name;
			if (trail.difficulty === 'green') {
				name = 'Very Easy';
			} else if (trail.difficulty === 'greenBlue') {
				name = 'Easy';
			} else if (trail.difficulty === 'blue') {
				name = 'Intermediate';
			} else if (trail.difficulty === 'blueBlack') {
				name = 'Challenging';
			} else if (trail.difficulty === 'black') {
				name = 'Very Challenging';
			} else if (trail.difficulty === 'dblack') {
				name = 'Extremely Challenging';
			} else {
				name = 'Not Provided'
			}
	
			return (
				<div className='row' style={ sectionStyle }>
					<div className='list-item col-6 col-s-6'>
							<h4 className='trail-name' > {trail.name} </h4><br/>
						<p>
							<b>Location:</b> {trail.location} <br/>
							<b>Lat/Long:</b> {trail.latitude}, {trail.longitude} <br/>              
							<b>Length (round-trip):</b> {trail.length} mi<br/>
							<b>Ascent:</b> {trail.ascent} ft<br/>
							<b>Condition:</b> {trail.conditionStatus} <br/>
							<b>Difficulty:</b> {`${name}`}
						</p>
							<span className='top' >
								<ReactStars 
									value={trail.stars}
									size={24}
									color2={'#ffd700'}
									edit={false}
								/>
								{trail.starVotes} votes <br/>
							</span> <br/>
						{/* <button onClick={this.handleClick}>Find Another</button> */}
					</div>
				</div>
			)
		}
	}
	

	render() {
		
	  return (
			<div>
				{this.renderTrails()}
			</div>
	  );
	}
}

const mapStateToProps = state => {
  return {
    activeEvent: state.events.activeEvent
  };
};

export default connect(mapStateToProps)(HikingSelect);