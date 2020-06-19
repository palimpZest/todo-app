import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import {
  mockedTodos,
  itemToAdd,
  itemToRemoveId,
  itemToUpdateId,
  titleToUpdate,
} from './mocks';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
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
