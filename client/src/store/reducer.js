import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as homeReducer } from '../pages/home/store';

const loginPersistConfig = {
  key: 'login',
  storage,
  blacklist: ['socket']
};

// const rootPersistConfig = {
//   key: 'root',
//   storage: storage,
// };

const rootReducer = combineReducers({
  login: persistReducer(loginPersistConfig, loginReducer),
  home: homeReducer
});

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default rootReducer;