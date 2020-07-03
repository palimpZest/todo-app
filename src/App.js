import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import TodoForm from './containers/TodoForm';
import ButtonBar from './components/ButtonBar';
import VisibleTodoList from './containers/VisibleTodoList';

import './App.css';

class App extends Component {
  render() {
    const {
      match: { params },
    } = this.props;

    return (
      <div className="App">
        <h1 className="text-logo">tasker</h1>
        <TodoForm />
        <ButtonBar />
        <VisibleTodoList filter={params.filter || 'all'} />
      </div>
    );
  }
}

export default withRouter(App);
