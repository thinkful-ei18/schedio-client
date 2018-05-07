import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { toggleWidgetDisplay } from '../store/actions/widgetManage';
class WidgetManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widgets: {
        weather: true,
        todo: true,
        map: true
      }
    };
  }
	/*======== handle toggle on list item
    @params: String
    example: 'weather'
    @return: send async dispatch event to update event
  */
	handleToggle = widget => {
	  this.props.dispatch(toggleWidgetDisplay(widget));
	};

	handleConfirm = widget => {
	  console.log(this.state);
	};
	render() {
	  const { displayWidget } = this.props;
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
	              toggled={displayWidget.weather.displayed}
	              onToggle={() => this.handleToggle('weather')}
	            />
	          }
	        />
	        <ListItem
	          primaryText="Checklist"
	          rightToggle={
	            <Toggle
	              toggled={displayWidget.todo.displayed}
	              onToggle={() => this.handleToggle('todo')}
	            />
	          }
	        />
	        <ListItem
	          primaryText="Map"
	          rightToggle={
	            <Toggle
	              toggled={displayWidget.map.displayed}
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

const mapStateToProps = state => {
  const currentEvent = {
    id: '1234456',
    location: {
      address: 'somewhere',
      lat: 12,
      lng: 13
    },
    starttime: '1234124',
    title: '123',
    widgets: {
      map: {
        displayed: true
      },
      weather: {
        displayed: true
      },
      todo: {
        displayed: false
      }
    }
  };
  return {
    displayWidget: currentEvent ? currentEvent.widgets : null
  };
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default connect(mapStateToProps)(withRouter(WidgetManager));
