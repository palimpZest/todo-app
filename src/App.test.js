import React from 'react';
import App from './App';

import { renderWithRouter, fireEvent } from './test-utils';

import todoReducer from './reducers';
import * as actions from './actions';
import {
  mockedTodos,
  itemToAdd,
  itemToRemoveId,
  itemToUpdateId,
  titleToUpdate,
} from './mocks';

describe('App todo display tests', () => {
  test('renders todo title', () => {
    const { getByText } = renderWithRouter(<App />);

    const linkElement = getByText(/todos/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders default todo item', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/test todo title/i)).toBeInTheDocument();
  });

  test('adds todo item from form input', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const newTitleToAdd = 'Good Day';
    const input = getByTestId('todo-input-id');

    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: newTitleToAdd } });
    fireEvent.submit(input);

    expect(input).toBeInTheDocument();
    expect(getByText(newTitleToAdd)).toBeInTheDocument();
  });

  test('removes todo item with button', () => {
    const { queryByText, getByTestId } = renderWithRouter(<App />, {
      initialState: { todos: mockedTodos },
    });
    const secondMockedTodo = mockedTodos[1];
    const button = getByTestId(`delete-button-${secondMockedTodo.id}`);

    fireEvent.click(button);

    expect(queryByText(secondMockedTodo.title)).not.toBeInTheDocument();
  });

  test('renders all todos', () => {
    const { getAllByTestId } = renderWithRouter(<App />, {
      initialState: { todos: mockedTodos },
      route: '/all',
      path: '/:filter',
    });

    const allVisibleItems = getAllByTestId('todo-item-id');

    expect(allVisibleItems.length).toBe(5);
  });

  test('renders active todos only', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />, {
      initialState: { todos: mockedTodos },
      route: '/active',
      path: '/:filter',
    });

    const buttonActive = getByTestId('button-active-id');
    fireEvent.click(buttonActive);

    const allVisibleItems = getAllByTestId('todo-item-id');

    expect(allVisibleItems.length).toBe(2);
  });

  test('renders completed todos only', () => {
    const { getByTestId, getAllByTestId, debug } = renderWithRouter(<App />, {
      initialState: { todos: mockedTodos },
      route: '/completed',
      path: '/:filter',
    });

    const buttonCompleted = getByTestId('button-completed-id');
    fireEvent.click(buttonCompleted);

    debug();
    const allVisibleItems = getAllByTestId('todo-item-id');

    expect(allVisibleItems.length).toBe(3);
  });
});

describe('redux TODO tests', () => {
  test('should add todo item', () => {
    const state = { todos: mockedTodos };
    const action = { type: actions.ADD_TODO, todo: itemToAdd };
    const currentStoreState = todoReducer(state, action);
    const lastStoreItem =
      currentStoreState.todos[currentStoreState.todos.length - 1];
    expect(lastStoreItem.title).toBe(itemToAdd.title);
  });

  test('should update todo item', () => {
    const copiedMockedTodos = [...mockedTodos];
    const newTodos = copiedMockedTodos.map((item) => {
      if (item.id === itemToUpdateId) {
        return {
          ...item,
          title: titleToUpdate,
        };
      }
      return item;
    });

    expect(copiedMockedTodos[2].title).toBe('Bonjour');
    expect(newTodos[2].title).toBe(titleToUpdate);
  });

  test('should remove todo item', () => {
    const state = { todos: mockedTodos };
    const action = { type: actions.REMOVE_TODO, itemId: itemToRemoveId };
    const currentStoreState = todoReducer(state, action);

    const findItemRemovedItemId = currentStoreState.todos.find(
      (item) => item.id === itemToRemoveId,
    );

    expect(findItemRemovedItemId).toBe(undefined);
    expect(currentStoreState.todos.length).toBe(4);
  });

  test('should display all items', () => {
    const state = { todos: mockedTodos };
    const action = { type: actions.DISPLAY_ALL_TODOS };
    const currentStoreState = todoReducer(state, action);

    expect(mockedTodos.length).toBe(currentStoreState.todos.length);
    expect(currentStoreState.todos.length).toBe(5);
  });

  test('should display all active items', () => {
    const copiedMockedTodos = [...mockedTodos];
    const newTodos = copiedMockedTodos.filter(
      (item) => item.completed === false,
    );

    expect(copiedMockedTodos.length).toBe(5);
    expect(newTodos.length).toBe(2);
  });

  test('should display all completed items', () => {
    const copiedMockedTodos = [...mockedTodos];
    const newTodos = copiedMockedTodos.filter(
      (item) => item.completed === true,
    );

    expect(copiedMockedTodos.length).toBe(5);
    expect(newTodos.length).toBe(3);
  });

  test('should clear completed items', () => {
    const copiedMockedTodos = [...mockedTodos];
    const newTodos = copiedMockedTodos.filter(
      (item) => item.completed === false,
    );

    expect(copiedMockedTodos.length).toBe(5);
    expect(newTodos.length).toBe(2);
  });
});
