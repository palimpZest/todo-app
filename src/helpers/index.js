// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
const REDUX_STATE = 'redux-state';

export const getActiveItems = (todos) => {
  let count = 0;
  todos &&
    todos.forEach((element) => {
      if (element.completed === false) {
        count++;
      }
    });
  return count;
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(REDUX_STATE);

    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);

    if (state.todos) {
      return state;
    }
    return { todos: [] };
  } catch (err) {
    console.log(err); // eslint-disable-line
    return undefined;
  }
};

export const saveState = (fullState) => {
  try {
    const state = fullState;
    const serializedState = JSON.stringify(state);
    localStorage.setItem(REDUX_STATE, serializedState);
  } catch (err) {
    console.log(err); // eslint-disable-line
  }
};
