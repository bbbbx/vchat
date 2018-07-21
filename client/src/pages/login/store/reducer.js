import io from 'socket.io-client';
import * as actionTypes from './actionTypes';

const initState = {
  loading: false,
  message: '',
  id: '',
  account: '',
  username: '',
  password: '',
  friends: [],
  token: '',
  isLogin: false,
  socket: io('http://localhost:8000'),
  showRegisterView: false
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch(type) {
    case actionTypes.CHANGE_MESSAGE:
      return {
        ...state,
        message: payload
      };
    case actionTypes.CHANGE_ACCOUNT_INPUT:
      return {
        ...state,
        account: payload
      };
    case actionTypes.CHANGE_USERNAME_INPUT:
      return {
        ...state,
        username: payload
      };
    case actionTypes.CHANGE_PASSWORD_INPUT:
      return {
        ...state,
        password: payload
      };
    case actionTypes.CHANGELOGIN:
      return {
        ...state,
        id: payload.id,
        account: payload.account,
        username: payload.username,
        password: payload.password,
        friends: payload.friends,
        token: payload.token,
        isLogin: payload.isLogin
      };
    case actionTypes.TOGGLE_SHOW_REGISTER_VIEW:
      return {
        ...state,
        showRegisterView: payload
      };
    case actionTypes.LOADING:
      return {
        ...state,
        loading: payload
      }
    case actionTypes.REGISTERED:
      return {
        ...state,
        id: payload.id,
        account: payload.account,
        username: payload.username,
        password: payload.password,
        friends: payload.friends,
        token: payload.token,
        isLogin: payload.isLogin,
        showRegisterView: payload.showRegisterView
      }
    default:
      return state;
  }
}

export default reducer;
