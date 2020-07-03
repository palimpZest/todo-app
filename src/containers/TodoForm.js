import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import ToggleButton from '../components/ToggleButton';

import { add_todo, toggle_every_status } from '../actions';

import { getActiveItems } from '../helpers';

class TodoForm extends Component {
  state = {
    value: '',
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.value.length > 0) {
      this.props.add_todo({
        id: uuidv4(),
        title: this.state.value,
        completed: false,
      });
      this.setState({ value: '' });
    }
  };

  toggleEveryTodoStatus = () => this.props.toggle_every_status();

  render() {
    const { activeItems } = this.props;
    return (
      <div className="todo-input-holder">
        <ToggleButton
          activeItems={activeItems}
          toggleEveryTodoStatus={this.toggleEveryTodoStatus}
        />
        <form onSubmit={this.handleSubmit}>
          <input
            className="todo-input"
            data-testid="todo-input-id"
            type="text"
            autoFocus
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="What do you want to do today ?"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeItems: getActiveItems(state.todos),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      add_todo,
      toggle_every_status,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
