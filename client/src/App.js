import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import { store, persistor } from './store';
import Login from './pages/login';
import Home from './pages/home';
import { Loading } from './pages/login/styled';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading>同步中...</Loading>} persistor={persistor} >
          <BrowserRouter>
            <Fragment>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
            </Fragment>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
