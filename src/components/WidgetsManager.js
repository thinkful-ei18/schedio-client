import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import { toggleWidgetDisplay, submitWidgetDisplay } from '../store/actions/widgetManage';
// import { fetchUserEvents } from '../store/actions/eventlist.actions';
import IconButton from 'material-ui/IconButton';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { requestEventDelete } from '../store/actions/eventlist.actions';
class WidgetManager extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}
	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleToggle = widget => {
		this.props.dispatch(toggleWidgetDisplay(widget));
	};

	handleConfirm = () => {
		const { currentEvent, dispatch, history } = this.props;
		return dispatch(submitWidgetDisplay(currentEvent))
			.then(history.push('/dashboard'))
			.catch(err => {
			});
	};
	handleDelete = () => {
		const { dispatch, history, currentEvent } = this.props;
		dispatch(requestEventDelete(currentEvent.id))
			.then(() => this.handleClose())
			.then(() => history.push('/dashboard'))
			.catch(err => console.log(err))
	}
	render() {
		const actions = [
			<FlatButton
				label="Yes"
				primary={true}
				onClick={this.handleDelete}
			/>,
			<FlatButton
				label="No"
				primary={true}
				onClick={this.handleClose}
			/>]
		const renderDialog = () => {
			return (<div>
				<Dialog
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					Are you sure you want to delete this event?
			</Dialog>
			</div>)
		}
		const { currentEvent, history } = this.props;
		if (!currentEvent) return <div>No content is loaded</div>;
		return (
			<div style={styles.root}>
				<List>
					<Subheader>General Setting</Subheader>
					<ListItem
						primaryText="Edit event"
						secondaryText="Change title, date or location of the event"
						onClick={() => history.push('/dashboard/eventsetting/edit')}
					/>
					<ListItem primaryText="Delete event" secondaryText="Delete event" onClick={this.handleDelete} />
				</List>
				<Divider />
				<List>
					<Subheader>Widget Manager</Subheader>
					<ListItem
						primaryText="Weather"
						rightToggle={
							<div style={{ marginRight: '35px' }}>
								<Toggle
									toggled={currentEvent.widgets.weather.displayed}
									onToggle={() => this.handleToggle('weather')}
								/>
							</div>
						}
					/>
					<ListItem
						primaryText="Checklist"
						rightToggle={
							<div style={{ marginRight: '35px' }}>
								<Toggle
									toggled={currentEvent.widgets.todo.displayed}
									onToggle={() => this.handleToggle('todo')}
								/>
							</div>
						}
					/>
					<ListItem
						primaryText="Map"
						rightToggle={
							<div style={{ marginRight: '35px' }}>
								<Toggle
									toggled={currentEvent.widgets.map.displayed}
									onToggle={() => this.handleToggle('map')}
								/>
							</div>
						}
					/>
					<ListItem
						primaryText="Outdoor activity"
						rightToggle={
							<div style={{ marginRight: '35px' }}>
								<Toggle
									toggled={currentEvent.widgets.outdooractivities.displayed}
									onToggle={() => this.handleToggle('outdooractivities')}
								/>
							</div>
						}

					/>
					<ListItem
						primaryText="Public event"
						rightToggle={
							<div style={{ marginRight: '35px' }}>
								<Toggle
									toggled={currentEvent.widgets.publicevents.displayed}
									onToggle={() => this.handleToggle('publicevents')}
								/>
							</div>
						}
					/>
					<ListItem
						primaryText="Food and dinning"
						rightToggle={
							<div style={{ marginRight: '35px' }}>
								<Toggle
									toggled={currentEvent.widgets.foodanddining.displayed}
									onToggle={() => this.handleToggle('foodanddining')}
								/>
							</div>
						}
					/>
					<ListItem
						primaryText="Sports"
						rightToggle={
							<div style={{ marginRight: '35px' }}>
								<Toggle
									toggled={currentEvent.widgets.sports.displayed}
									onToggle={() => this.handleToggle('sports')}
								/>
							</div>
						}

					/>
					<MenuItem
						primaryText="Confirm"
						style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}
						onClick={this.handleConfirm}
					/>
				</List>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		currentEvent: state.events.activeEvent.id ? state.events.activeEvent : null
	};
};

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'column'
	}
};

export default withRouter(connect(mapStateToProps)(WidgetManager));
