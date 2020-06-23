import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { add_todo } from '../actions';

class TodoForm extends Component {
  state = {
    value: '',
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.add_todo({
      id: uuidv4(),
      title: this.state.value,
      completed: false,
    });
    this.setState({ value: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          data-testid="todo-input-id"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    areSomeCompleted: state.todos.some((item) => item.completed === true),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      add_todo,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);