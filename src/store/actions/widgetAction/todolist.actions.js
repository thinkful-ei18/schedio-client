//================================== Todo list Actions-- Import Dependencies ====================>


export const SET_TODO_CHECKED = 'SET_TODO_CHECKED';
export const setTodoChecked = (eventId, todoId) => ({
  tyoe:SET_TODO_CHECKED,
  eventId,
  todoId
});
