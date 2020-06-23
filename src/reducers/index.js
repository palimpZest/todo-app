import {
  DISPLAY_ALL_TODOS,
  ADD_TODO,
  REMOVE_TODO,
  REMOVE_COMPLETED_TODOS,
  TOGGLE_TODO_STATUS,
  TOGGLE_EVERY_TODO_STATUS,
} from '../actions';

export const initialState = [
  { id: 'testId', title: 'test todo title', completed: false },
  { id: 'testId2', title: 'test todo completed', completed: true },
  { id: 'testId3', title: 'test todo completed II', completed: true },
];

const todoReducer = (state = { todos: initialState }, action) => {
  switch (action.type) {
    case DISPLAY_ALL_TODOS:
      return state;
    case ADD_TODO:
      return { ...state, todos: state.todos.concat(action.todo) };
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
