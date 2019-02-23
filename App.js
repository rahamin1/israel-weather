import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import RouterComponent from './src/RouterComponent';

class App extends Component {

  render() {
    const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}

export default App;
