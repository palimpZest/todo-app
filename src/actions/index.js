export const DISPLAY_ALL_TODOS = 'DISPLAY_ALL_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const REMOVE_COMPLETED_TODOS = 'REMOVE_COMPLETED_TODOS';

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

export function remove_todo(itemId) {
  return {
    type: REMOVE_TODO,
    itemId,
  };
}

export function remove_completed_todos() {
  return {
    type: REMOVE_COMPLETED_TODOS,
  };
}

export const VisibilityFilters = {
  SHOW_ALL_TODOS: 'all',
  SHOW_COMPLETED_TODOS: 'completed',
  SHOW_ACTIVE_TODOS: 'active',
};
