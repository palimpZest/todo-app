import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { display_todos } from './actions';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.display_todos();
  }

  render() {
    const { todos } = this.props;

    return (
      <div className="App">
        <h1>todos</h1>
        <input />
        {todos && todos.map((item) => <p key={item.id}>{item.title}</p>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ display_todos }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
