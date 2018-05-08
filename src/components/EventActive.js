import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { fetchUserEvents } from '../store/actions/eventlist.actions';

export class EventActive extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserEvents());
  }

	earlyEvent = events => {
	  let earlyEventTime = 3250368000000;
		let earlyEvent;
		
	  for (let i = 0; i < events.length; i++) {
			const currentEvent = parseInt(events[i].starttime);
			// console.log(events[i].starttime);
			console.log(earlyEventTime);
			console.log(currentEvent);
			
			
	    if (currentEvent < earlyEventTime) {
	      earlyEventTime = currentEvent;
	      earlyEvent = events[i];
	    }
		}
		
		console.log(earlyEvent);
		

	  let data = {};
	  for (let k in earlyEvent) {
			// console.log(k);
	    if (earlyEvent.hasOwnProperty(k) && k === 'location') {
        data = earlyEvent[k];
        console.log(data);
	    }
	  }
	  return data;
	};

	render() {
	  let events = this.props.events ? this.props.events : '';
	  let currentEvent = this.earlyEvent(events);
	  // console.log(currentEvent);

	  return (
	    <div>
	      <div className="left">
	        <h4>Active (Earliest Event): {currentEvent.address}</h4>
	        <h5>
						Latitude: {currentEvent.lat} Longitude: {currentEvent.lng}
	        </h5>
	      </div>
	    </div>
	  );
	}
}

const mapStateToProps = state => {
  return {
    events: state.events.eventList
  };
};

export default connect(mapStateToProps)(EventActive);
