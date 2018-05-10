import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import { toggleWidgetDisplay, submitWidgetDisplay } from '../store/actions/widgetManage';
import { fetchUserEvents } from '../store/actions/eventlist.actions';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
class WidgetManager extends React.Component {
	handleToggle = widget => {
	  this.props.dispatch(toggleWidgetDisplay(widget));
	};

	handleConfirm = () => {
	  const { currentEvent, dispatch, history } = this.props;
	  return dispatch(submitWidgetDisplay(currentEvent))
	    .then(history.push('/dashboard'))
	    .catch(err => {
	      console.log('error from wg-manager', err);
	    });
	};

	render() {
	  const { currentEvent } = this.props;
	  if (!currentEvent) return <div>No content is loaded</div>;
	  return (
	    <div style={styles.root}>
	      <List>
	        <Subheader>General Setting</Subheader>
	        <ListItem
	          primaryText="Edit event"
	          secondaryText="Change title, date or location of the event"
	        />
	        <ListItem primaryText="Delete event" secondaryText="You want to remove my existence?" />
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
	          rightIconButton={
	            <IconButton tooltip="setting" onClick={() => console.log('hello')}>
	              <ActionSettings />
	            </IconButton>
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
	          rightIconButton={
	            <IconButton tooltip="setting" onClick={() => console.log('hello')}>
	              <ActionSettings />
	            </IconButton>
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
	          rightIconButton={
	            <IconButton tooltip="setting" onClick={() => console.log('hello')}>
	              <ActionSettings />
	            </IconButton>
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
	          rightIconButton={
	            <IconButton tooltip="setting" onClick={() => console.log('hello')}>
	              <ActionSettings />
	            </IconButton>
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
	          rightIconButton={
	            <IconButton tooltip="setting" onClick={() => console.log('hello')}>
	              <ActionSettings />
	            </IconButton>
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
	          rightIconButton={
	            <IconButton tooltip="setting" onClick={() => console.log('hello')}>
	              <ActionSettings />
	            </IconButton>
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
	          rightIconButton={
	            <IconButton tooltip="setting" onClick={() => console.log('hello')}>
	              <ActionSettings />
	            </IconButton>
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
