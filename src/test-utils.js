// https://testing-library.com/docs/example-react-redux
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoReducer, { initialState as reducerInitialState } from './reducers';

function render(
  ui,
  {
    initialState = {
      todos: reducerInitialState,
    },
    store = createStore(todoReducer, initialState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
