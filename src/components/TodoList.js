import React from 'react';

import Todo from './Todo';

const TodoList = ({ todos, handleRemove }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} handleRemove={handleRemove} />
      ))}
    </ul>
  );
};

export default TodoList;
