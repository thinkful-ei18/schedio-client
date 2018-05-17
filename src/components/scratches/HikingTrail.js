import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';
import _ from 'lodash';
import ReactStars from 'react-stars';
import './HikingTrail.css';

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
				const hikingUrl = `${API_ROOT_URL}lat=${latLng.lat}&lon=${latLng.lng}&maxDistance=10${API_KEY}`;
				const response = axios.get(hikingUrl);
				return response
					.then(res => {
						let trails = Object.assign({}, this.state.trails);
						trails = res.data.trails;
						this.setState({ trails: trails });
					});
			})
			.catch(error => this.props.error(error));
	};

	renderTrails = () => {
		if (!this.state.trails) {
			return <div>Input search location above</div>;
		}
		const myTrails = this.state.trails;

		// console.log(trail);
		return _.map(myTrails, trail => {
			if (trail.imgSmallMed === '') {
				trail.imgSmallMed = 'https://i.pinimg.com/originals/a4/b0/c4/a4b0c4fc44ec75c55d7d40a1d3994435.jpg';
			}

			let name = null;

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
				<div key={trail.id.toString()} className='row' >
					<div className='list-item col-6 col-s-6'>
						<img className='portrait' src={trail.imgSmallMed} alt={trail.name} width='300px' /> <br />
						<h4 className='trail-name' > {trail.name} </h4><br />
						<p>
							<b>Location:</b> {trail.location} <br />
							<b>Lat/Long:</b> {trail.latitude}, {trail.longitude} <br />
							<b>Length (round-trip):</b> {trail.length} mi<br />
							<b>Ascent:</b> {trail.ascent} ft<br />
							<b>Condition:</b> {trail.conditionStatus} <br />
							<b>Difficulty:</b> {`${name}`}
						</p>
						<span className='top' >
							<ReactStars
								// count={5}
								value={trail.stars}
								size={24}
								color2={'#ffd700'}
								edit={false}
							/>
							{trail.starVotes} votes <br />
						</span>
					</div>
				</div>
			)
		});


	}


	render() {
		// console.log(this.state.trails);

		return (
			<PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps }) => (
					<div className="hiking-widget-container">
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
						{this.renderTrails()}
					</div>
				)}
			</PlacesAutocomplete>
		);
	}
}
