//================================== Import dependencies ====================>
import React from 'react';
import TodoItem from '../TodoItem';
import '../styles/TodoWidget.css';
import {API_BASE_URL} from '../../config';
import store from '../../store/configureStore';
import axios from 'axios';
import {fetchUserEvents} from '../../store/actions/eventlist.actions';


//================================== Component ====================>

export default class TodoList extends React.Component {

  constructor(props) {
    super(props);

    this.timer = null;
  }

  // API Methods

  // Add Item

  // Delete Item


  // Toggle Check Item (receives todo item ID and status of checked nature)
  toggleChecked = (id,completed) => {

    let requestType = completed ? 'setIncomplete' : 'setComplete';

    const apiCall = () => {
      axios({
        'url':`${API_BASE_URL}/api/events/${this.props.event.id}/todo`,
        'method':'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${store.getState().auth.authToken}`
        },
        data: {
          'requestType':requestType,
          'todoItemId':id
        }
      })
        .then(response => {
          fetchUserEvents();
        })
        .catch(err => {
          console.log(err);
        });
    };
    
    clearTimeout(this.timer);
    this.timer = setTimeout(apiCall(), 3000);
    
  }









  render() {

    const todolist = this.props.event.widgets.todo.list;

    const todoItems = todolist ? todolist.map(todo => <TodoItem toggleChecked={this.toggleChecked} todo={todo}/>) : '';

    return(
      <div className='todo-widget-container'>
        {todoItems}
      </div>
    );
  }
}




