import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';
import _ from 'lodash';
import ReactStars from 'react-stars';
import './HikingSelect.css';

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
	
	handleClick = (e) => {
		e.preventDefault();
		this.setState({ trails: null });
	}

	handleChange = address => {
	  this.setState({ address });
	};

	handleSelect = address => {
	  geocodeByAddress(address)
	    .then(results => getLatLng(results[0]))
	    .then(latLng => {
				console.log(latLng.lat, latLng.lng);
				const hikingUrl = `${API_ROOT_URL}lat=${latLng.lat}&lon=${latLng.lng}&maxDistance=10${API_KEY}`;
				console.log(hikingUrl);
				
				const response = axios.get(hikingUrl);
				// console.log(response)
				return response
				.then(res => {
					let trails = Object.assign({}, this.state.trails);
					trails = res.data.trails;
					this.setState({trails: trails});
				});
	    })
	    .catch(error => this.props.error(error));
	};

	renderTrails = () => {
		if (!this.state.trails) {

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

		const myTrails = this.state.trails;
		const trail = myTrails[Math.floor(Math.random() * 11)];
		console.log(trail);

		// if image not present provide backup
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
			// imgLink = 'https://cdn.apstatic.com/img/diff/green.svg';
		} else if (trail.difficulty === 'greenBlue') {
			name = 'Easy';
			// imgLink = 'https://cdn.apstatic.com/img/diff/greenBlue.svg';
		} else if (trail.difficulty === 'blue') {
			name = 'Intermediate';
			// imgLink = 'https://cdn.apstatic.com/img/diff/blue.svg';
		} else if (trail.difficulty === 'blueBlack') {
			name = 'Challenging';
			// imgLink = 'https://cdn.apstatic.com/img/diff/blueBlack.svg';
		} else if (trail.difficulty === 'black') {
			name = 'Very Challenging';
			// imgLink = 'https://cdn.apstatic.com/img/diff/blueBlack.svg';
		} else if (trail.difficulty === 'dblack') {
			name = 'Extremely Challenging';
			// imgLink = 'https://cdn.apstatic.com/img/diff/dblack.svg';
		} else {
			name = 'Not Provided'
			// imgLink = 'https://cdn.apstatic.com/img/diff/green.svg';        
		}

		return (
			<div key={trail.id.toString()} className='row' style={ sectionStyle }>
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
					<button onClick={this.handleClick}>Find Another</button>
				</div>
			</div>
		)
	}
	

	render() {
		// console.log(this.state.trails);
		
	  return (
			<div>
				{this.renderTrails()}
			</div>
	  );
	}
}
