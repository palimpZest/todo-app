export const DISPLAY_ALL_TODOS = 'DISPLAY_ALL_TODOS';
export const ADD_TODO = 'ADD_TODO';

export function display_todos() {
  return {
    type: DISPLAY_ALL_TODOS,
  };
}

export function add_todo(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}
