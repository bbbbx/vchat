import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import Login from './pages/login';
import Home from './pages/home';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
