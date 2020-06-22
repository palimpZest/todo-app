import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ButtonBar from './components/ButtonBar';
import VisibleTodoList from './containers/VisibleTodoList';

import { display_todos, add_todo, remove_completed_todos } from './actions';

import './App.css';

class App extends Component {
  state = {
    value: '',
  };

  componentDidMount() {
    this.props.display_todos();
  }

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

  handleClearCompleted = () => {
    this.props.remove_completed_todos();
  };

  render() {
    const {
      match: { params },
      areSomeCompleted,
    } = this.props;

    return (
      <div className="App">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            data-testid="todo-input-id"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
        <VisibleTodoList filter={params.filter || 'all'} />
        <ButtonBar
          handleClearCompleted={this.handleClearCompleted}
          areSomeCompleted={areSomeCompleted}
        />
      </div>
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
      display_todos,
      add_todo,
      remove_completed_todos,
    },
    dispatch,
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
