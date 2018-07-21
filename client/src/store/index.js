import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import persistedReducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   reducer,
//   composeEnhancers(
//     applyMiddleware(thunk),
//     persistState('login', {

//     })
//   )
// );

let store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

let persistor = persistStore(store);

export {
  store,
  persistor
};
