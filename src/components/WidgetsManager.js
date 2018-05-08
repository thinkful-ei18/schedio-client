import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import { toggleWidgetDisplay, submitWidgetDisplay } from '../store/actions/widgetManage';
class WidgetManager extends React.Component {
	handleToggle = widget => {
	  this.props.dispatch(toggleWidgetDisplay(widget));
	};

	handleConfirm = () => {
	  const { currentEvent, dispatch } = this.props;
	  dispatch(submitWidgetDisplay(currentEvent));
	};

	render() {
	  const { currentEvent } = this.props;
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
	            <Toggle
	              toggled={currentEvent.widgets.weather.displayed}
	              onToggle={() => this.handleToggle('weather')}
	            />
	          }
	        />
	        <ListItem
	          primaryText="Checklist"
	          rightToggle={
	            <Toggle
	              toggled={currentEvent.widgets.todo.displayed}
	              onToggle={() => this.handleToggle('todo')}
	            />
	          }
	        />
	        <ListItem
	          primaryText="Map"
	          rightToggle={
	            <Toggle
	              toggled={currentEvent.widgets.map.displayed}
	              onToggle={() => this.handleToggle('map')}
	            />
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

export default connect(mapStateToProps)(WidgetManager);
