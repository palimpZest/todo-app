import React from 'react';
import App from './App';
import { render, fireEvent } from './test-utils';

import {
  mockedTodos,
  itemToAdd,
  itemToRemoveId,
  itemToUpdateId,
  titleToUpdate,
} from './mocks';

describe('App todo display tests', () => {
  test('renders todo title', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/todos/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders default todo item', () => {
    const { getByText } = render(<App />);
    expect(getByText(/test todo title/i)).toBeInTheDocument();
  });

  test('adds todo item from form input', () => {
    const { getByText, getByTestId } = render(<App />, {
      initialState: { todos: mockedTodos },
    });

    const newTitleToAdd = 'Good Day';
    const input = getByTestId('todo-input-id');

    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: newTitleToAdd } });
    fireEvent.submit(input);

    expect(input).toBeInTheDocument();
    expect(getByText(newTitleToAdd)).toBeInTheDocument();
  });
});

describe('TODO tests', () => {
  test('should add todo item', () => {
    const copiedMockedTodos = [...mockedTodos];
    const newTodos = copiedMockedTodos.concat(itemToAdd);

    expect(copiedMockedTodos.length).toBe(5);
    expect(newTodos.length).toBe(6);
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
    const copiedMockedTodos = [...mockedTodos];
    const newTodos = copiedMockedTodos.filter(
      (item) => item.id !== itemToRemoveId,
    );
    const findRemoveditem = newTodos.find((item) => item.id === itemToRemoveId);

    expect(copiedMockedTodos.length).toBe(5);
    expect(findRemoveditem).toBe(undefined);
    expect(newTodos.length).toBe(4);
  });

  test('should display all items', () => {
    const copiedMockedTodos = [...mockedTodos];

    expect(copiedMockedTodos.length).toBe(5);
    expect(copiedMockedTodos.length).toBe(mockedTodos.length);
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
