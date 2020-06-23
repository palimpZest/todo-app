import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { select_item_to_update, update_todo } from '../actions';

class Todo extends PureComponent {
  state = {
    titleToUpdate: '',
  };

  toggleVisibleForm = (id) => {
    this.props.select_item_to_update(id);
  };

  handleChange = (e) => {
    this.setState({ titleToUpdate: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.update_todo({
      id: this.props.itemToUpdate,
      title: this.state.titleToUpdate,
    });
    this.toggleVisibleForm('');
    this.setState({ titleToUpdate: '' });
  };

  render() {
    const {
      title,
      completed,
      id,
      handleRemove,
      toggleStatus,
      itemToUpdate,
    } = this.props;

    return (
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
        {itemToUpdate === id ? (
          <form onSubmit={this.handleSubmit}>
            <input
              data-testid="todo-update-input-id"
              type="text"
              autoFocus
              value={this.state.titleToUpdate}
              onChange={this.handleChange}
            />
          </form>
        ) : (
          <p
            id={`${id}`}
            data-testid="todo-item-id"
            onDoubleClick={() => this.toggleVisibleForm(id)}
          >
            {title}
          </p>
        )}
        <button
          data-testid={`delete-button-${id}`}
          onClick={() => handleRemove(id)}
        >
          x
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemToUpdate: state.itemToUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      select_item_to_update,
      update_todo,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
