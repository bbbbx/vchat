import * as actionTypes from './actionTypes';

const initState = {
  isLogin: false,
  id: '',
  account: '',
  username: '',
  password: '',
  friends: [],
  token: '',
  socket: null,
  message: '',
  loading: false,
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
        isLogin: payload.isLogin,
        socket: payload.socket
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
      };
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
        showRegisterView: payload.showRegisterView,
        socket: payload.socket
      };
    case actionTypes.CONNECT_SOCKET:
      return {
        ...state,
        socket: payload.socket
      };
    case actionTypes.DISCONNECT_SOCKET:
      return {
        ...state,
        socket: null
      };
    case actionTypes.LOGOUT:
      return {
        ...initState
      };
    case actionTypes.CHANGE_FRIENDS:
      return {
        ...state,
        friends: payload
      };
    default:
      return {
        ...state
      };
  }
}

export default reducer;
