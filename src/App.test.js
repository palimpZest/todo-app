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

  test('updates todo item', () => {
    const {
      getAllByTestId,
      getByTestId,
      getByText,
      queryByText,
    } = renderWithRouter(<App />, {
      initialState: { todos: mockedTodos },
    });

    const newTodoTitle = 'This is a new todo title';

    const allVisibleItems = getAllByTestId('todo-item-id');
    const firstTodoItem = allVisibleItems[0];

    expect(getByText('Hey')).toBeVisible();

    fireEvent.doubleClick(firstTodoItem);

    const updateInput = getByTestId('todo-update-input-id');

    fireEvent.change(updateInput, { target: { value: newTodoTitle } });
    fireEvent.submit(updateInput);

    expect(queryByText('Hey')).not.toBeInTheDocument();
    expect(getByText(newTodoTitle)).toBeVisible();
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

  test('displays clear completed button only if completed todos are present', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(<App />, {
      initialState: { todos: mockedTodos },
      route: '/all',
      path: '/:filter',
    });

    const areSomeCompleted = mockedTodos.some(
      (item) => item.completed === true,
    );

    const clearButton = getByTestId('button-clear-completed-id');

    expect(areSomeCompleted).toBe(true);
    expect(clearButton).toBeVisible();

    fireEvent.click(clearButton);

    const clearButtonAfterClick = queryByTestId('button-clear-completed-id');

    expect(clearButtonAfterClick).toBe(null);
  });

  test('removes all completed todo items with button', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />, {
      initialState: { todos: mockedTodos },
      route: '/all',
      path: '/:filter',
    });

    const allVisibleItems = getAllByTestId('todo-item-id');
    expect(allVisibleItems.length).toBe(5);

    const clearCompletedButton = getByTestId(`button-clear-completed-id`);
    fireEvent.click(clearCompletedButton);

    const allVisibleItemsAfterClick = getAllByTestId('todo-item-id');
    expect(allVisibleItemsAfterClick.length).toBe(2);
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
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />, {
      initialState: { todos: mockedTodos },
      route: '/completed',
      path: '/:filter',
    });

    const buttonCompleted = getByTestId('button-completed-id');
    fireEvent.click(buttonCompleted);

    const allVisibleItems = getAllByTestId('todo-item-id');

    expect(allVisibleItems.length).toBe(3);
  });

  test('toggles individual todo status', () => {
    const { getByTestId } = renderWithRouter(<App />, {
      initialState: { todos: mockedTodos },
      route: '/all',
      path: '/:filter',
    });

    const mockedActiveTodoId = mockedTodos[0].id;
    const mockedActiveTodoInput = getByTestId(
      `checkbox-id-${mockedActiveTodoId}`,
    );

    expect(mockedActiveTodoInput.value).toBe('active');

    fireEvent.click(mockedActiveTodoInput);

    expect(mockedActiveTodoInput.value).toBe('completed');

    fireEvent.click(mockedActiveTodoInput);

    expect(mockedActiveTodoInput.value).toBe('active');
  });

  test('toggles every todo status', () => {
    const { getByTestId, queryAllByRole } = renderWithRouter(<App />, {
      initialState: { todos: mockedTodos },
      route: '/all',
      path: '/:filter',
    });

    const hasActiveTodos = mockedTodos.some((item) => item.completed === false);
    expect(hasActiveTodos).toBe(true);

    const toogleAllButton = getByTestId('toggle-all-button-id');

    fireEvent.click(toogleAllButton);

    const everyCheckbox = queryAllByRole('checkbox');
    everyCheckbox.forEach((checkbox) => {
      expect(checkbox.value).toBe('completed');
    });

    fireEvent.click(toogleAllButton);

    const everyCheckboxAfterClick = queryAllByRole('checkbox');
    everyCheckboxAfterClick.forEach((checkbox) => {
      expect(checkbox.value).toBe('active');
    });
  });
});

describe('redux TODO tests', () => {
  test('should display all items', () => {
    const state = { todos: mockedTodos };
    const action = { type: actions.DISPLAY_ALL_TODOS };
    const currentStoreState = todoReducer(state, action);

    expect(mockedTodos.length).toBe(currentStoreState.todos.length);
    expect(currentStoreState.todos.length).toBe(5);
  });

  test('should add todo item', () => {
    const state = { todos: mockedTodos };
    const action = { type: actions.ADD_TODO, todo: itemToAdd };
    const currentStoreState = todoReducer(state, action);
    const lastStoreItem =
      currentStoreState.todos[currentStoreState.todos.length - 1];
    expect(lastStoreItem.title).toBe(itemToAdd.title);
  });

  test('should select todo item to update', () => {
    const state = { todos: mockedTodos };
    const action = {
      type: actions.SELECT_ITEM_TO_UPDATE,
      itemId: itemToUpdateId,
    };
    const currentStoreState = todoReducer(state, action);

    expect(currentStoreState.itemToUpdate).toBe(itemToUpdateId);
  });

  test('should update todo item', () => {
    const state = { todos: mockedTodos };
    const action = {
      type: actions.UPDATE_TODO,
      itemToUpdate: { id: itemToUpdateId, title: titleToUpdate },
    };
    const currentStoreState = todoReducer(state, action);

    expect(mockedTodos[2].title).toBe('Bonjour');
    expect(currentStoreState.todos[2].title).toBe(titleToUpdate);
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

  test('should clear completed items', () => {
    const state = { todos: mockedTodos };
    const action = { type: actions.REMOVE_COMPLETED_TODOS };
    const currentStoreState = todoReducer(state, action);

    const hasCompletedTodos = currentStoreState.todos.some(
      (item) => item.completed === true,
    );

    expect(hasCompletedTodos).toBe(false);
    expect(currentStoreState.todos.length).toBe(2);
  });

  test('should toggle individual todo status', () => {
    const firstMockedItem = mockedTodos[0];
    expect(firstMockedItem.completed).toBe(false);

    const state = { todos: mockedTodos };
    const action = {
      type: actions.TOGGLE_TODO_STATUS,
      itemId: firstMockedItem.id,
    };
    const currentStoreState = todoReducer(state, action);

    const firstMockedItemAfterToggle = currentStoreState.todos[0].completed;
    expect(firstMockedItemAfterToggle).toBe(true);

    const updatedState = { todos: currentStoreState.todos };
    const currentStoreStateAfterFirstToggle = todoReducer(updatedState, action);

    const firstMockedItemAfterSecondToggle =
      currentStoreStateAfterFirstToggle.todos[0].completed;
    expect(firstMockedItemAfterSecondToggle).toBe(false);
  });

  test('should toggle every todo status', () => {
    const state = { todos: mockedTodos };
    const action = {
      type: actions.TOGGLE_EVERY_TODO_STATUS,
    };
    const currentStoreState = todoReducer(state, action);

    const hasActiveTodos = currentStoreState.todos.some(
      (item) => item.completed === false,
    );

    expect(hasActiveTodos).toBe(false);

    const updatedState = { todos: currentStoreState.todos };
    const currentStoreStateAfterToggle = todoReducer(updatedState, action);

    const hasCompletedTodos = currentStoreStateAfterToggle.todos.some(
      (item) => item.completed === true,
    );

    expect(hasCompletedTodos).toBe(false);
  });
});
