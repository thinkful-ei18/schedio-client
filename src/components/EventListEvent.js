//================================== Import React Dependencies ====================>
import React from 'react';
import Moment from 'react-moment';
import {setCurrentEvent} from '../store/actions/eventlist.actions';
import {connect} from 'react-redux';

/**
 * This represents an individual event in the list of events contained within EventList. Event info will be passed as props by the parent component, which will
 * be looping through the list of events in the state and displaying multiple EventListEvent components.
 */
export class  EventListEvent extends React.Component {
  
  handleViewEvent() {
    this.props.dispatch(setCurrentEvent(this.props.event));
    localStorage.setItem('lastViewedEvent', this.props.event.id);
    localStorage.setItem('lastViewedTimestamp', Number(Date.now()));
  }

  render() {
    
    return (
      <div className='event-list-event'>
        <b>{this.props.event.title}</b>
        <br/>
        <Moment fromNow date={Number(this.props.event.starttime)}>  </Moment> on <Moment format={'dddd, MMMM Do, h:mm a'}date={Number(this.props.event.starttime)}> </Moment>
        <br/>
        {this.props.event.location.lat}
        {this.props.event.location.long}
        <button onClick={() => this.handleViewEvent()} className='event-list-open-button'>
        View
        </button>
      </div>
    );
  }
};

export default connect()(EventListEvent);