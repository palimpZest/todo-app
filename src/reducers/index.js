import {
  DISPLAY_ALL_TODOS,
  ADD_TODO,
  REMOVE_TODO,
  REMOVE_COMPLETED_TODOS,
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
    default:
      return state;
  }
};

export default todoReducer;
