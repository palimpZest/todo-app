import { DISPLAY_ALL_TODOS } from '../actions';

export const initialState = [
  { id: 'testId', title: 'test todo title', completed: false },
];

const todoReducer = (state = { todos: initialState }, action) => {
  switch (action.type) {
    case DISPLAY_ALL_TODOS:
      return state;
    default:
      return state;
  }
};

export default todoReducer;
