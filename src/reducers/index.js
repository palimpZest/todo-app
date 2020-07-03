import {
  ADD_TODO,
  SELECT_ITEM_TO_UPDATE,
  UPDATE_TODO,
  REMOVE_TODO,
  REMOVE_COMPLETED_TODOS,
  TOGGLE_TODO_STATUS,
  TOGGLE_EVERY_TODO_STATUS,
} from '../actions';

const todoReducer = (state = { todos: [], itemToUpdate: '' }, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: state.todos.concat(action.todo) };
    case SELECT_ITEM_TO_UPDATE:
      return {
        ...state,
        itemToUpdate: action.itemId,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.itemToUpdate.id
            ? {
                ...item,
                title: action.itemToUpdate.title,
              }
            : item,
        ),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.itemId),
      };
    case REMOVE_COMPLETED_TODOS:
      return {
        ...state,
        todos: state.todos.filter((item) => item.completed === false),
      };
    case TOGGLE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.itemId
            ? {
                ...item,
                completed: !item.completed,
              }
            : item,
        ),
      };
    case TOGGLE_EVERY_TODO_STATUS:
      const hasActiveTodos = state.todos.some(
        (item) => item.completed === false,
      );
      return {
        ...state,
        todos: state.todos.map((item) =>
          hasActiveTodos
            ? { ...item, completed: true }
            : { ...item, completed: false },
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
