import { DISPLAY_ALL_TODOS, ADD_TODO, REMOVE_TODO } from '../actions';

export const initialState = [
  { id: 'testId', title: 'test todo title', completed: false },
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
    default:
      return state;
  }
};

export default todoReducer;
