import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TodoForm from './containers/TodoForm';
import ButtonBar from './components/ButtonBar';
import VisibleTodoList from './containers/VisibleTodoList';

import { display_todos, remove_completed_todos } from './actions';

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
        <TodoForm />
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
    },
    dispatch,
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
