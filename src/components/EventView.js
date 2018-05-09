import React from 'react';
import { connect } from 'react-redux';
import { Moment } from 'react-moment';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';

export class EventView extends React.Component {
  // loop function to find current event
  earlyEvent = events => {
	  let earlyEventTime = 3250368000000;
		let earlyEvent;
		
	  for (let i = 0; i < events.length; i++) {
			const currentEvent = parseInt(events[i].starttime);
			// console.log(events[i].starttime);
			// console.log(earlyEventTime);
			// console.log(currentEvent);
			
			
	    if (currentEvent < earlyEventTime) {
	      earlyEventTime = currentEvent;
	      earlyEvent = events[i];
	    }
		}
		
		// console.log(earlyEvent);
		

	  let data = {};
	  for (let k in earlyEvent) {
			// console.log(k);
	    if (earlyEvent.hasOwnProperty(k) && k === 'location') {
        data = earlyEvent[k];
        // console.log(data);
	    }
	  }
	  return data;
	};
  
  render() {
    let events = this.props.events ? this.props.events : '';
    let currentEvent = this.earlyEvent(events);
    // grab lat and long coordinate here:
    let eventLat = currentEvent.lat;
    let eventLong = currentEvent.long;  
    console.log(eventLat, eventLong);
      

    return (
      <Card>
        {this.props.currentEvent ? (
          <div>
            <CardHeader
              title={this.props.currentEvent.title ? this.props.currentEvent.title : currentEvent.address}
              subtitle={ this.props.currentEvent.starttime ? new Date(this.props.currentEvent.starttime).toDateString() : ''}
              showExpandableButton={false}
            />
            <CardText expandable={false}>
              {this.props.currentEvent.address ? this.props.currentEvent.address : ''}
              {this.props.currentEvent.starttime ? moment(Number(this.props.currentEvent.starttime)).fromNow() : ''}
            </CardText>
          </div>
        ) : (
          'No Event Selected'
        )}
        {/* <EventActive/> */}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  currentEvent: state.events.activeEvent ? state.events.activeEvent : '',
  events: state.events.eventList  
});

export default connect(mapStateToProps)(EventView);
