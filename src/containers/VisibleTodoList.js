import { connect } from 'react-redux';
import { remove_todo, toggle_status } from '../actions';
import TodoList from '../components/TodoList';
import { VisibilityFilters } from '../actions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL_TODOS:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED_TODOS:
      return todos.filter((t) => t.completed);
    case VisibilityFilters.SHOW_ACTIVE_TODOS:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(state.todos, ownProps.filter),
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleRemove: (id) => dispatch(remove_todo(id)),
  toggleStatus: (id) => dispatch(toggle_status(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
