//================================== Import dependencies ====================>
import React from 'react';
import TodoItem from '../TodoItem';
import '../styles/TodoWidget.css';
import {API_BASE_URL} from '../../config';
import store from '../../store/configureStore';
import axios from 'axios';
import {fetchUserEvents} from '../../store/actions/eventlist.actions';
import {toggleTodoChecked,deleteTodo} from '../../store/actions/widgetAction/todolist.actions';
import {connect} from 'react-redux';

//================================== Component ====================>

export class TodoWidget extends React.Component {

  constructor(props) {
    super(props);

    this.timer = null;
  }

  // API Methods

  // Add Item

  // Delete Item
  deleteItem = todoId => {
    this.props.dispatch(deleteTodo(this.props.event.id,todoId));
    axios({
      'url':`${API_BASE_URL}/api/events/${this.props.event.id}/todo?todoId=${todoId}`,
      'method':'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${store.getState().auth.authToken}`
      },
    })
      .then(response => {
        console.log(response);
      });
  }


  // Toggle Check Item (receives todo item ID and status of checked nature)
  toggleChecked = (id,completed) => {
    this.props.dispatch(toggleTodoChecked(this.props.event.id,id));

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
    
    apiCall();

  }









  render() {

    const todolist = this.props.event.widgets.todo.list;

    const todoItems = todolist ? todolist.map(todo => <TodoItem deleteItem={this.deleteItem} toggleChecked={this.toggleChecked} todo={todo}/>) : '';

    return(
      <div className='todo-widget-container'>
        <div className='todo-widget-title'>
          Things to Remember:
        </div>
        {todoItems}
      </div>
    );
  }
}


export default connect()(TodoWidget);



