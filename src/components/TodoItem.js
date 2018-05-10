//================================== Import Dependencies ====================>
import React from 'react';
import Checkbox from 'material-ui/Checkbox';


export default class TodoItem extends React.Component  {

  onCheck() {
    this.props.toggleChecked(this.props.todo.id, this.props.todo.completed);
  }

  render() {
    return (
      <div className='todo-item-container'>
        <div className='todo-title-section'>
          {this.props.todo.title}
        </div>
        <div className='todo-completed-section'>
          <Checkbox onClick={() => this.onCheck()} checked={this.props.todo.completed}/>
        </div>
      </div>
    );
  }
};