//================================== Import React Dependencies ====================>
import React from 'react';


/**
 * This represents an individual event in the list of events contained within EventList. Event info will be passed as props by the parent component, which will
 * be looping through the list of events in the state and displaying multiple EventListEvent components.
 */
export default (props) => {
  return (
    <div className='event-list-event'>
      {this.props.event.title}
      {this.props.event.startdate}
      {this.props.event.location}
    </div>
  )
}