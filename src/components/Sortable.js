// import React, { Component } from 'react';
// import { render } from 'react-dom';
// import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
// import { connect } from 'react-redux';
// import { fetchUserEvents } from '../store/actions/eventlist.actions';
// import EventList from './EventList';
// import './Sortable.css';

// const SortableItem = SortableElement(({ value }) => <li className="style-item">{value}</li>);

// const SortableList = SortableContainer(({ items }) => {
//   return (
//     <ul className="style-list">
//       {items.map((value, index) => (
//         <SortableItem key={`item-${index}`} index={index} value={value} />
//       ))}
//     </ul>
//   );
// });

// export class SortableComponent extends Component {
//   componentDidMount() {
//     this.props.dispatch(fetchUserEvents());
//   }

// 	state = {
// 	  items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
// 	};

// 	onSortEnd = ({ oldIndex, newIndex }) => {
// 	  this.setState({
// 	    items: arrayMove(this.state.items, oldIndex, newIndex)
// 	  });
// 	};

// 	earlyEvent = events => {
// 	  let earlyEventTime = new Date('3000-01-01T08:00:00.000Z');
// 	  let earlyEvent;
// 	  for (let i = 0; i < events.length; i++) {
// 	    const currentEvent = new Date(events[i].starttime);
// 	    if (currentEvent < earlyEventTime) {
// 	      earlyEventTime = currentEvent;
// 	      earlyEvent = events[i];
// 	    }
// 	  }

// 	  let data = {};
// 	  for (let k in earlyEvent) {
// 	    if (earlyEvent.hasOwnProperty(k) && k === 'location') {
// 	      data = earlyEvent[k];
// 	    }
// 	  }
// 	  return data;
// 	};

// 	render() {
// 	  let events = this.props.events ? this.props.events : '';
// 	  let currentEvent = this.earlyEvent(events);
// 	  console.log(currentEvent);

// 	  return (
// 	    <div>
// 	      <div className="left">
// 	        <h4>Active (Earliest Event): {currentEvent.address}</h4>
// 	        <h5>
// 						Latitude: {currentEvent.lat} Longitude: {currentEvent.lng}
// 	        </h5>
// 	        <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
// 	      </div>
// 	    </div>
// 	  );
// 	}
// }

// const mapStateToProps = state => {
//   console.log(state);
//   return {
//     events: state.events.eventList
//   };
// };

// export default connect(mapStateToProps)(SortableComponent);
