//================================== Import React Dependencies ====================>
import React from 'react';
import {connect} from 'react-redux';
import EventListEvent from './EventListEvent';
import './styles/EventList.css';
import {fetchUserEvents} from '../store/actions/eventlist.actions';
//================================== Event List Component ====================>
/**
 * Responsible for Containing a list of Events belonging to the user, conditionally displaying upcoming events or past events.
 * The Events listed will be individual Event components themselves. 
 */
export class UpcomingEventsList extends React.Component {
  
  componentDidMount() {
    this.props.dispatch(fetchUserEvents());
  }

  render() {

    const events = this.props.events ? this.props.events
      .filter(event => new Date(Number(event.starttime)).getTime() >= Date.now())
      .map((event,index) => <EventListEvent event={event} key={index} /> ) : '';
 
    return(
      <div className='event-list-container'>
        <div className='event-list-header'>
          Upcoming Events
        </div>
        <section className='events-list'>
          {events}

        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events:state.events.eventList
  };
};

export default connect(mapStateToProps)(UpcomingEventsList);