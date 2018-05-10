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
        <div className='todo-completed-delete-section'>
          <Checkbox onClick={() => this.onCheck()} checked={this.props.todo.completed}/>
          < div className='todo-svg-delete'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </div>
        </div>
      </div>
    );
  }
};