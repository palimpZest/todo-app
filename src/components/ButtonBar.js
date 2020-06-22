import React from 'react';
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions';

const ButtonBar = () => (
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
  </div>
);

export default ButtonBar;
