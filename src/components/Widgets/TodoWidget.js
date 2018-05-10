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

  // API Methods

  // Add Item

  // Delete Item


  //Check Item
  checkItem = (id) => {
    axios({
      'url':`${API_BASE_URL}/api/events/${this.props.event.id}/todo`,
      'method':'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${store.getState().auth.authToken}`
      },
      data: {
        'requestType':'setComplete',
        'todoItemId':id
      }
    })
      .then(response => {
        fetchUserEvents();
      })
      .catch(err => {
        console.log(err);
      });
  }

  //Uncheck Item






  render() {

    const todolist = this.props.event.widgets.todo.list;

    const todoItems = todolist ? todolist.map(todo => <TodoItem checkItem={this.checkItem} todo={todo}/>) : '';

    return(
      <div className='todo-widget-container'>
        {todoItems}
      </div>
    );
  }
}




