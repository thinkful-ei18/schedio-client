//================================== Todo list Actions-- Import Dependencies ====================>


export const TOGGLE_TODO_CHECKED = 'TOGGLE_TODO_CHECKED';
export const toggleTodoChecked = (eventId, todoId) => ({
  type:TOGGLE_TODO_CHECKED,
  eventId,
  todoId
});


export const DELETE_TODO = 'SET_DELETE_TODO';
export const deleteTodo= (eventId, todoId) => ({
  type:DELETE_TODO,
  eventId,
  todoId
});


export const ADD_TODO = 'ADD_TODO';
export const addTodo = todoItem => ({
  type:ADD_TODO,
  todoItem
});