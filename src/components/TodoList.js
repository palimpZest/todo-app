import React from 'react';

import Todo from './Todo';

const TodoList = ({ todos }) => (
  <>
    {todos.map((todo) => (
      <Todo key={todo.id} {...todo} />
    ))}
  </>
);

export default TodoList;
