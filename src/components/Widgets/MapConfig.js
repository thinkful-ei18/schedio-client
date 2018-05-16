import React from 'react';
import LocationSearch from '../Utilities/LocationSearch';
import Map from './MapWidget';
import { connect } from 'react-redux';
import { fetchUserEvents } from '../../store/actions/eventlist.actions';
import { updateMapWidget } from '../../store/actions/widgetAction/mapWidget.action';
import RaisedButton from 'material-ui/RaisedButton';
export class MapConfig extends React.Component {
	constructor(props) {
		super(props);
		const { activeEvent } = props;
		const { info } = activeEvent.widgets['map'];
		this.state = {
			showMap: false,
			configInfo: {
				title: info ? info.title : 'map widget',
				lat: info ? info.lat : 0,
				long: info ? info.long : 0
			}
		};
	}

	handleTitleChange = e => {
		e.preventDefault();
		const title = e.target.value;
		this.setState({
			configInfo: {
				...this.state.configInfo,
				title
			}
		});
	};

	handleAddress = address => {
		this.setState({
			configInfo: { ...this.state.configInfo, address }
		});
	};
	handleCoordinate = coordinate => {
		const { lat, lng } = coordinate;
		this.setState({
			configInfo: {
				...this.state.configInfo,
				lat,
				long: lng
			}
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		const { dispatch } = this.props;
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.setState({
				showMap: true
			});
		}, 100);
	};

	handleConfirm = () => {
		const { configInfo } = this.state;
		const { activeEvent, dispatch } = this.props;
		return dispatch(updateMapWidget(activeEvent.id, configInfo))
			.then(() => {
				this.props.history.push('/dashboard');
			})
			.catch(err => console.log(err));
	};
	render() {
		console.log(this.state);
		const { showMap, configInfo } = this.state;
		const { activeEvent } = this.props;

		return (
			<div>
				{showMap ? (
					<main>
						<header style={styles.widgetTitle}>{configInfo.title}</header>
						<Map configInfo={configInfo} event={activeEvent} />
						<br />
						<RaisedButton label="Confirm" primary={true} onClick={() => this.handleConfirm()} />
						<RaisedButton
							label="Cancel"
							secondary={true}
							onClick={() => this.setState({ showMap: false })}
						/>
					</main>
				) : (
						<form onSubmit={this.handleSubmit}>
							<div>
								<label style={{ display: 'block' }}>widget title</label>
								<input
									id="title"
									name="title"
									value={configInfo ? configInfo.title : 'map widget'}
									onChange={this.handleTitleChange}
								/>
							</div>
							<div>
								<label>Search for location</label>
								<LocationSearch address={this.handleAddress} coordinate={this.handleCoordinate} />
								<RaisedButton type="submit" label="Show Map" />
							</div>
						</form>
					)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		activeEvent: state.events.activeEvent
	};
};

export default connect(mapStateToProps)(MapConfig);

const styles = {
	container: {
		//   display: 'block',
		position: 'relative'
		//   margin: 10
	},
	widgetTitle: {
		padding: 10,
		fontWeight: 'bold',
		boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)',
		marginBottom: 8
	}
};
