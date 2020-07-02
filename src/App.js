import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TodoForm from './containers/TodoForm';
import ButtonBar from './components/ButtonBar';
import VisibleTodoList from './containers/VisibleTodoList';

import {
  display_todos,
  remove_completed_todos,
  toggle_every_status,
} from './actions';

import { getActiveItems } from './helpers';

import checkMark from './check-mark.svg';

import './App.css';

class App extends Component {
  state = {
    value: '',
  };

  componentDidMount() {
    this.props.display_todos();
  }

  handleClearCompleted = () => {
    this.props.remove_completed_todos();
  };

  toogleEveryTodoStatus = () => {
    this.props.toggle_every_status();
  };

  render() {
    const {
      match: { params },
      hasTodos,
      activeItems,
      areSomeCompleted,
    } = this.props;

    return (
      <div className="App">
        <h1 className="text-logo">tasker</h1>
        <div className="todo-input-holder">
          <button
            className="toggle-all-button"
            data-testid="toggle-all-button-id"
            onClick={this.toogleEveryTodoStatus}
          >
            <img
              className={
                activeItems ? 'toogle-all-red-check' : 'toogle-all-green-check'
              }
              src={checkMark}
              alt="a check mark"
            />
          </button>
          <TodoForm />
        </div>
        <ButtonBar
          handleClearCompleted={this.handleClearCompleted}
          areSomeCompleted={areSomeCompleted}
          activeItems={activeItems}
          hasTodos={hasTodos}
        />
        <VisibleTodoList filter={params.filter || 'all'} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    hasTodos: state.todos && state.todos.length > 0,
    areSomeCompleted:
      state.todos && state.todos.some((item) => item.completed === true),
    activeItems: getActiveItems(state.todos),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      display_todos,
      remove_completed_todos,
      toggle_every_status,
    },
    dispatch,
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
