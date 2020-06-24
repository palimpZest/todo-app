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
        <h1>todos</h1>
        <div style={{ display: 'flex' }}>
          <button
            data-testid="toggle-all-button-id"
            onClick={this.toogleEveryTodoStatus}
          >
            v
          </button>
          <TodoForm />
        </div>
        <VisibleTodoList filter={params.filter || 'all'} />
        <ButtonBar
          handleClearCompleted={this.handleClearCompleted}
          areSomeCompleted={areSomeCompleted}
          activeItems={activeItems}
          hasTodos={hasTodos}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    hasTodos: state.todos.length > 0,
    areSomeCompleted: state.todos.some((item) => item.completed === true),
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
