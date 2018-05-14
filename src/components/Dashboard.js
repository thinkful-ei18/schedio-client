import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import EventView from './EventView';
import PastEventsList from './PastEventsList';
import UpcomingEventsList from './UpcomingEventsList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
	handleEventCreationRedirect = () => {
		this.props.history.push('/dashboard/eventcreate');
	};
	render() {
		if (!this.props.currentUser) {
			return <div>Loading</div>
		}
		return (
			<div style={styles.container}>
				<section style={styles.tabs}>
					<Tabs onChange={this.handleChange} value={this.state.slideIndex}>
						<Tab label="View Event" value={0} />
						<Tab label="Upcoming Events" value={1} />
						<Tab label="Past Events" value={2} />
					</Tabs>
				</section>
				<main style={styles.contents}>
					<SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
						<div style={styles.slide}>
							<EventView />
						</div>
						<div style={styles.slide}>
							<UpcomingEventsList />
						</div>
						<div style={styles.slide}>
							<PastEventsList />
						</div>
					</SwipeableViews>
					<section style={styles.addEventBtnContainer}>
						<FloatingActionButton secondary={true} onClick={this.handleEventCreationRedirect}>
							<ContentAdd />
						</FloatingActionButton>
					</section>
				</main>
			</div>
		);
	}
}

const styles = {
	container: {
		maxWidth: '1080px',
		margin: '0 auto',
		transition: 'all 0.5s ease'
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
	addEventBtnContainer: {
		margin: '10px 10px',
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
