import React from 'react';

const Todo = ({ title, id, handleRemove }) => (
  <div style={{ display: 'flex' }}>
    <p data-testid="todo-item-id">{title}</p>
    <button
      data-testid={`delete-button-${id}`}
      onClick={() => handleRemove(id)}
    >
      x
    </button>
  </div>
);

export default Todo;
