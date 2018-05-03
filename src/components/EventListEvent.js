//================================== Import React Dependencies ====================>
import React from 'react';


/**
 * This represents an individual event in the list of events contained within EventList. Event info will be passed as props by the parent component, which will
 * be looping through the list of events in the state and displaying multiple EventListEvent components.
 */
export default (props) => {
  return (
    <div className='event-list-event'>
      <b>{props.event.title}</b>
      <br/>
      {props.event.starttime}
      <br/>
      {props.event.location}
      <button className='event-list-open-button'>
        View
      </button>
    </div>
  )
}