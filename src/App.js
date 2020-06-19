import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { display_todos, add_todo } from './actions';

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

  render() {
    const { todos } = this.props;

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
  return bindActionCreators({ display_todos, add_todo }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
