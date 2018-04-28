import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

import Router from './Router';

export default class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      // NOTE: we should give to the Provider an instance of stores (Redux) to connect with all tags => createStore()
      //applaying the Reduxthunk middleware to store
      //second arg for init state (if we want top pass it)
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
