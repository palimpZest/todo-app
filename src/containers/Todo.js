import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  select_item_to_update,
  update_todo,
  remove_todo,
  toggle_status,
} from '../actions';

class Todo extends PureComponent {
  state = {
    titleToUpdate: this.props.title,
  };

  toggleVisibleForm = (id) => this.props.select_item_to_update(id);

  handleChange = (e) => this.setState({ titleToUpdate: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.titleToUpdate.length > 0) {
      this.props.update_todo({
        id: this.props.itemToUpdate,
        title: this.state.titleToUpdate,
      });
      this.toggleVisibleForm('');
    }
  };

  handleRemove = (id) => this.props.remove_todo(id);

  toggleStatus = (id) => this.props.toggle_status(id);

  render() {
    const { title, completed, id, itemToUpdate } = this.props;

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
          onChange={() => this.toggleStatus(id)}
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
          onClick={() => this.handleRemove(id)}
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
      remove_todo,
      toggle_status,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
