import React from 'react';

import Todo from '../containers/Todo';

const TodoList = ({ todos }) => (
  <>{todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}</>
);

export default TodoList;
