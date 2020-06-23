import React from 'react';

import Todo from './Todo';

const TodoList = ({ todos, handleRemove, toggleStatus }) => (
  <>
    {todos.map((todo) => (
      <Todo
        key={todo.id}
        {...todo}
        handleRemove={handleRemove}
        toggleStatus={toggleStatus}
      />
    ))}
  </>
);

export default TodoList;
