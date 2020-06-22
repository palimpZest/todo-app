// https://testing-library.com/docs/example-react-redux
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';

import todoReducer, { initialState as reducerInitialState } from './reducers';

function renderWithRouter(
  ui,
  {
    initialState = {
      todos: reducerInitialState,
    },
    store = createStore(todoReducer, initialState),
    route = '/',
    path = '/',
    ...renderOptions
  } = {},
) {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Route path={`${path}`}>{children}</Route>
      </MemoryRouter>
    </Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithRouter };
