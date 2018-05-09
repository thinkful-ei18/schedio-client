import React from 'react';
import { connect } from 'react-redux';
import { Moment } from 'react-moment';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import EventActive from './EventActive';
import {setCurrentEvent} from '../store/actions/eventlist.actions';
import {fetchUserEvents} from '../store/actions/eventlist.actions';

export class EventView extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentEvent: {}
    }

    this.earlyEvent = this.earlyEvent.bind(this);
  }

  componentDidMount() {
    this.earlyEvent(this.props.events);
  }
  // componentwillmount

  // loop function to find current event
  earlyEvent = events => {
	  let earlyEventTime = 3250368000000;
		let earlyEvent;
		
	  for (let i = 0; i < events.length; i++) {
			const currentEvent = parseInt(events[i].starttime);
	    if (currentEvent < earlyEventTime) {
	      earlyEventTime = currentEvent;
	      earlyEvent = events[i];
	    }
		}
		
	  let data = {};
	  for (let k in earlyEvent) {
	    if (earlyEvent.hasOwnProperty(k) && k === 'location') {
        data = earlyEvent[k];
	    }
    }
    
	  this.setState({
      currentEvent: earlyEvent
    });
	};
  
  render() {
    let events = this.props.events ? this.props.events : '';
    console.log(this.props.currentEvent.title);
    if (this.props.currentEvent.title === null) {
      let currentEvent = this.earlyEvent(events);
      // console.log(JSON.stringify(currentEvent.id));
      // console.log(this.props.events);
      

      console.log(this.state.currentEvent);
      
      if (this.state.currentEvent) {
        console.log(this.state.currentEvent);
        
        this.props.dispatch(setCurrentEvent(this.state.currentEvent));

      }
      
    }
    
    // this.props.dispatch(setCurrentEvent(currentEvent));
    // // grab lat and long coordinate here:
    // let eventLat = currentEvent.lat;
    // let eventLong = currentEvent.long;  
    // console.log(eventLat, eventLong);
      

    return (
      <Card>
        {this.props.currentEvent ? (
          <div>
            {/* <button onClick={() => this.props.dispatch(setCurrentEvent(this.props.event))} className='event-list-open-button'>
            View
            </button> */}
            <CardHeader
              title={this.props.currentEvent.title ? this.props.currentEvent.title : ''}
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
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  currentEvent: state.events.activeEvent ? state.events.activeEvent : '',
  events: state.events.eventList,
});

export default connect(mapStateToProps)(EventView);
