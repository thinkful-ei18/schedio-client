import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import EventView from './EventView';
import PastEventsList from './PastEventsList';
import UpcomingEventsList from './UpcomingEventsList';
import './Dashboard.css'

// import SortableComponent from './Sortable';

export class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slideIndex: 0
		};
	}

	handleChange = value => {
		this.setState({
			slideIndex: value
		});
	};

	setSlideIndex = () => {
		this.setState({
			slideIndex: 0
		});
	}

	render() {
		if (!this.props.currentUser) {
			return <div>Loading</div>;
		}
		return (
			<div style={styles.container} className="dashboard-container">
				<section style={styles.tabs}>
					<Tabs onChange={this.handleChange} value={this.state.slideIndex}>
						< Tab label="View Event" value={0} style={{
							backgroundColor: '#3F51B5'
						}} />
						<Tab label="Upcoming Events" value={1} style={{
							backgroundColor: '#3F51B5'
						}} />
						<Tab label="Past Events" value={2} style={{
							backgroundColor: '#3F51B5'
						}} />
					</Tabs>
				</section>
				<main style={styles.contents}>
					<SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
						<div style={styles.slide}>
							<EventView />
						</div>
						<div style={styles.slide}>
							<UpcomingEventsList setSlideIndex={this.setSlideIndex} />
						</div>
						<div style={styles.slide}>
							<PastEventsList setSlideIndex={this.setSlideIndex} />
						</div>
					</SwipeableViews>
				</main>
			</div>
		);
	}
}

const styles = {
	container: {
		maxWidth: '1080px',
		margin: '0 auto',
		transition: 'all 0.5s ease',
	},
	tabs: {
		marginTop: '20px'
	},
	contents: {
		display: 'block',
		border: 'solid #E0E0E0 0.5px',
		textAlign: 'center',
		position: 'relative',
		transition: 'inherit'
	},

	headline: {
		fontSize: 24,
		paddingTop: 16,
		marginBottom: 12,
		fontWeight: 400
	},
	slide: {
		padding: 10
	}
};
const mapStateToProps = (state) => {
	return {
		currentUser: state.auth.currentUser
	};
};

export default connect(mapStateToProps)(withRouter(Dashboard));
