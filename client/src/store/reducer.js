import { combineReducers } from 'redux';
import { reducer as loginReducer } from '../pages/login/store';

const reducer = combineReducers({
  login: loginReducer
});

export default reducer;