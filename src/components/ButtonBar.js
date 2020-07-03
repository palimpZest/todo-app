import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FilterLink from '../containers/FilterLink';

import { VisibilityFilters, remove_completed_todos } from '../actions';

import { getActiveItems } from '../helpers';

class ButtonBar extends Component {
  handleClearCompleted = () => {
    this.props.remove_completed_todos();
  };

  render() {
    const { hasTodos, areSomeCompleted, activeItems } = this.props;

    return (
      <>
        {hasTodos && (
          <>
            <div data-testid="button-bar-id" className="button-bar">
              <div>
                <FilterLink filter={VisibilityFilters.SHOW_ALL_TODOS}>
                  <button>All</button>
                </FilterLink>

                <FilterLink filter={VisibilityFilters.SHOW_ACTIVE_TODOS}>
                  <button data-testid="button-active-id">Active</button>
                </FilterLink>

                <FilterLink filter={VisibilityFilters.SHOW_COMPLETED_TODOS}>
                  <button data-testid="button-completed-id">Completed</button>
                </FilterLink>

                {areSomeCompleted && (
                  <button
                    data-testid="button-clear-completed-id"
                    onClick={this.handleClearCompleted}
                  >
                    Clear completed
                  </button>
                )}
              </div>
            </div>
            <div className="items-left">{activeItems} items left</div>
          </>
        )}
      </>
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
      remove_completed_todos,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);
