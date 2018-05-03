import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import DrawerWindow from './Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slideIndex: 0,
			addEventBtnHover: false
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
	toggleHover = () => {
		this.timerId = null;
		clearTimeout(this.timerId);
		this.timerId = setTimeout(() => {
			this.setState({
				addEventBtnHover: !this.state.addEventBtnHover
			});
		}, 100);
	};
	render() {
		const { authToken } = this.props;
		/*
			*** to do
		*/
		// authentication on dashboard component
		// if (!authToken) {
		// 	return this.props.history.push('/')
		// }
		return (
			<div style={styles.container}>
				<section style={styles.tabs}>
					<Tabs onChange={this.handleChange} value={this.state.slideIndex}>
						<Tab label="Active " value={0} />
						<Tab label="Events" value={1} />
						<Tab label="History" value={2} />
					</Tabs>
				</section>
				<main style={styles.contents}>
					<SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
						<div>
							Event view component<br />
						</div>
						<div style={styles.slide}>Event List for exist events</div>
						<div style={styles.slide}>Event List for all past events</div>
					</SwipeableViews>
					<section
						style={
							this.state.addEventBtnHover
								? styles.addEventBtnContainerHover
								: styles.addEventBtnContainer
						}
						onMouseEnter={this.toggleHover}
						onMouseLeave={this.toggleHover}
					>
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
		maxWidth: '800px',
		margin: '0 auto',
		transition: 'all 0.5s ease'
	},
	tabs: {
		marginTop: '20px'
	},
	contents: {
		display: 'block',
		border: 'solid #E0E0E0 0.5px',
		minHeight: '80vh',
		maxHeight: '80vh',
		overflow: 'scroll',
		textAlign: 'center',
		position: 'relative',
		transition: 'inherit'
	},
	addEventBtnContainer: {
		position: 'absolute',
		bottom: 20,
		left: -30,
		transition: 'inherit'
	},
	addEventBtnContainerHover: {
		position: 'absolute',
		bottom: 20,
		left: 5,
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
const mapStateToProps = () => {
	return {};
};

export default connect(mapStateToProps)(withRouter(Dashboard));
