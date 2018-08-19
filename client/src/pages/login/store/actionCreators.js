import axios from 'axios';
import * as actionTypes from './actionTypes';

const changeLogin = payload => ({
  type: actionTypes.CHANGELOGIN,
  payload
});

const registered = payload => ({
  type: actionTypes.REGISTERED,
  payload
})

const loading = payload => ({
  type: actionTypes.LOADING,
  payload
});

const changeFriends = friends => ({
  type: actionTypes.CHANGE_FRIENDS,
  payload: friends
});

export const connectSocket = payload => ({
  type: actionTypes.CONNECT_SOCKET,
  payload
});

export const disconnectSocket = () => ({
  type: actionTypes.DISCONNECT_SOCKET
});

export const changeMessage = (payload) => ({
  type: actionTypes.CHANGE_MESSAGE,
  payload
});

export const changeAccountInput = (payload) => ({
  type: actionTypes.CHANGE_ACCOUNT_INPUT,
  payload
});

export const changeUsernameInput = (payload) => ({
  type: actionTypes.CHANGE_USERNAME_INPUT,
  payload
});

export const changePasswordInput = (payload) => ({
  type: actionTypes.CHANGE_PASSWORD_INPUT,
  payload
});

export const login = payload => dispatch => {
  dispatch(loading(true));
  axios
    .post('http://localhost:8000/api/users/login', {
      account: payload.account,
      password: payload.password
    })
    .then(({ data }) => {
      dispatch(loading(false));
      if (data.code !== 0) {
        alert(data.message);
        return;
      } else {
        const { user, token } = data.data;
        dispatch(changeLogin({
          id: user._id,
          account: user.account,
          username: user.username,
          avatarURL: user.avatarURL,
          friends: user.friends,
          token,
          isLogin: true,
          socket: payload.socket
        }));
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const logout = () => ({
  type: actionTypes.LOGOUT
});

export const toggleShowRegisterView = show => ({
  type: actionTypes.TOGGLE_SHOW_REGISTER_VIEW,
  payload: show
});

export const register = payload => dispatch => {
  dispatch(loading(true));
  axios
    .post('http://localhost:8000/api/users/register', {
      account: payload.account,
      username: payload.username,
      password: payload.password 
    })
    .then(({ data }) => {
      dispatch(loading(false));
      if (data.code !== 0) {
        alert(data.message);
        return;
      } else {
        const { user, token } = data.data;
        dispatch(registered({
          id: user._id,
          account: user.account,
          username: user.username,
          password: user.password,
          friends: user.friends,
          token,
          isLogin: true,
          showRegisterView: false,
          socket: payload.socket
        }));
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const addFriend = (token, account, friend) => dispatch => {
  axios
    .patch('http://localhost:8000/api/user/friend', {
      token,
      account,
      friend
    })
    .then((({ data }) => {
      if (data.code === 0) {
        dispatch(changeFriends(data.data.friends));
        alert('添加成功');
      } else {
        alert(data.message);
      }
    }));
}
