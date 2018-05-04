import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {connect} from 'react-redux';
import {fetchUserEvents} from '../store/actions/eventlist.actions';
import EventList from './EventList';
import './Sortable.css';


const SortableItem = SortableElement(({value}) =>
  <li className='style-item' >{value}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className='style-list'>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export class SortableComponent extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserEvents());
   }

  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

  
  render() {
    let events = this.props.events ? this.props.events.map((event,index) => console.log(index, event) ) : '';
    console.log(events, 'FROM SORTABLE');
    
    return (
      <div>
        <div className='left'>
          <SortableList 
            items={this.state.items} 
            onSortEnd={this.onSortEnd} 
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    events:state.events.eventList
  }
};

export default connect(mapStateToProps)(SortableComponent);