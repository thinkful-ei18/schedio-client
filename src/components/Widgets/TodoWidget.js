//================================== Import dependencies ====================>
import React from 'react';
import TodoItem from '../TodoItem';
import '../styles/TodoWidget.css';
import { API_BASE_URL } from '../../config';
import store from '../../store/configureStore';
import axios from 'axios';
import { fetchUserEvents } from '../../store/actions/eventlist.actions';
import { toggleTodoChecked, deleteTodo, addTodo } from '../../store/actions/widgetAction/todolist.actions';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

//================================== Component ====================>

export class TodoWidget extends React.Component {

  constructor(props) {
    super(props);

    this.timer = null;
  }

  // API Methods

  // Add Item

  addItem = title => {
    // this.props.dispatch();
    axios({
      'url': `${API_BASE_URL}/api/events/${this.props.event.id}/todo`,
      'method': 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${store.getState().auth.authToken}`
      },
      data: JSON.stringify({ title })
    })
      .then(response => {
        this.props.dispatch(addTodo(response.data.widgets.todo.list[response.data.widgets.todo.list.length - 1]));
      });
  }


  // Delete Item
  deleteItem = todoId => {
    this.props.dispatch(deleteTodo(this.props.event.id, todoId));
    axios({
      'url': `${API_BASE_URL}/api/events/${this.props.event.id}/todo?todoId=${todoId}`,
      'method': 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${store.getState().auth.authToken}`
      },
    })
  }


  // Toggle Check Item (receives todo item ID and status of checked nature)
  toggleChecked = (id, completed) => {
    this.props.dispatch(toggleTodoChecked(this.props.event.id, id));

    let requestType = completed ? 'setIncomplete' : 'setComplete';

    const apiCall = () => {
      axios({
        'url': `${API_BASE_URL}/api/events/${this.props.event.id}/todo`,
        'method': 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${store.getState().auth.authToken}`
        },
        data: {
          'requestType': requestType,
          'todoItemId': id
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

  onTextChange(e) {
    if (e.key === 'Enter') {
      this.addItem(e.target.value);
      e.target.value = '';
    }
  }









  render() {

    const todolist = this.props.event.widgets.todo.list;
    const todoItems = todolist ? todolist.map(todo => <TodoItem deleteItem={this.deleteItem} toggleChecked={this.toggleChecked} todo={todo} />) : '';

    return (
      <div className='todo-widget-container'>
        {todoItems}
        <TextField style={{ 'width': '90%' }} onKeyDown={e => this.onTextChange(e)} hintText='add an Item...' />
      </div>
    );
  }
}


export default connect()(TodoWidget);



