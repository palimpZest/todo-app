export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const REMOVE_COMPLETED_TODOS = 'REMOVE_COMPLETED_TODOS';
export const TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS';
export const TOGGLE_EVERY_TODO_STATUS = 'TOGGLE_EVERY_TODO_STATUS';
export const UPDATE_TODO = 'UPDATE_TODO';
export const SELECT_ITEM_TO_UPDATE = 'SELECT_ITEM_TO_UPDATE';

export function add_todo(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

export function select_item_to_update(itemId) {
  return {
    type: SELECT_ITEM_TO_UPDATE,
    itemId,
  };
}

export function update_todo(itemToUpdate) {
  return {
    type: UPDATE_TODO,
    itemToUpdate,
  };
}

export function remove_todo(itemId) {
  return {
    type: REMOVE_TODO,
    itemId,
  };
}

export function toggle_status(itemId) {
  return {
    type: TOGGLE_TODO_STATUS,
    itemId,
  };
}

export function toggle_every_status() {
  return {
    type: TOGGLE_EVERY_TODO_STATUS,
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
