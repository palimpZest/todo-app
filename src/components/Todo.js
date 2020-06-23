import React from 'react';

const Todo = ({ title, completed, id, handleRemove, toggleStatus }) => (
  <div
    style={{
      display: 'flex',
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    <input
      data-testid={`checkbox-id-${id}`}
      type="checkbox"
      checked={completed}
      id={`${id}`}
      name={`${title}`}
      value={completed ? 'completed' : 'active'}
      onChange={() => toggleStatus(id)}
    />
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
