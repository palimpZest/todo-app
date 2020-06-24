import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';

import Root from './Root';

import todoReducer from './reducers';
import { saveState, loadState } from './helpers';

import * as serviceWorker from './serviceWorker';

import './index.css';

const savedState = loadState();

const store = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)(createStore)(todoReducer, savedState);

store.subscribe(() =>
  setTimeout(() => {
    saveState(store.getState());
  }, 1000),
);

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
