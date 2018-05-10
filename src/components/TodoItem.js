//================================== Import Dependencies ====================>
import React from 'react';
import Checkbox from 'material-ui/Checkbox';


export default (props) => {
  return (
    <div className='todo-item-container'>
      <div className='todo-title-section'>
        {props.todo.title}
      </div>
      <div className='todo-completed-section'>
        <Checkbox onClick={() => props.checkItem(props.todo.id)} checked={props.todo.completed}/>
      </div>
    </div>
  );
};