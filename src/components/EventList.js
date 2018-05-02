//================================== Import React Dependencies ====================>
import React from 'react';
import {connect} from 'react-redux';
import EventListEvent from './EventListEvent';

//================================== Event List Component ====================>
/**
 * Responsible for Containing a list of Events belonging to the user, conditionally displaying upcoming events or past events.
 * The Events listed will be individual Event components themselves. 
 */
export class EventList extends React.Component {
  render() {

  const events = this.props.events ? this.props.events.map(event => <EventListEvent event={event} /> ) : '';

  /*
  Regarding the question of how to display upcoming events vs past events. I would first argue that an event should be `upcoming` until it is `past`. For an MVP we
  shouldn't be messing too much with attempting to create a 'Happening Now' event category.
  
  Next, I would say that we can store a property in the state of this component or in the redux state recording whether the user is currently viewing upcoming events,
  past events, or the current event. If the user is viewing the upcoming events, we can display all events with a startdate that is after the current moment. If the user is viewing past 
  events, we can display events with a starttime that is less than the current moment's starttime value. 
  */
  
    return(
      <div className='event-list-container'>
        <div className='event-list-header'>
          Hello from the Event List Component
        </div>
        <section className='events-list'>
          {events}

        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events:state.events
});

export default connect(mapStateToProps)(EventList);