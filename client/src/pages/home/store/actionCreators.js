import axios from 'axios';
import * as actionTypes from './actionTypes';

const changeSearchedUsers = users => ({
  type: actionTypes.CHANGE_SEARCH_USERS,
  payload: users
});

export const receiveMessage = payload => ({
  type: actionTypes.RECEIVE_MESSAGE,
  payload
});

export const receivePrivateMessage = payload => ({
  type: actionTypes.RECEIVE_PRIVATE_MESSAGE,
  payload
});

export const pushMessage = payload => ({
  type: actionTypes.PUSH_MESSAGE,
  payload
});

export const changeRoomTitle = title => ({
  type: actionTypes.CHANGE_ROOM_TITLE,
  payload: title
});

export const toggleShowSearchUsers = show => ({
  type: actionTypes.TOGGLE_SHOW_SEARCH_USERS,
  payload: show
});

export const getUsers = (token, username) => dispatch => {
  axios
    .get('http://localhost:8000/api/users', {
      params: {
        token,
        field: 'username',
        value: username
      }
    })
    .then(({ data }) => {
      console.log(data);
      if (data.code === 0) {
        const searchUsers = data.data;
        dispatch(changeSearchedUsers(searchUsers));
      } else {
        console.log(data.code, data.message);
      }
    })
    .catch(error => {
      alert(error)
    });
};
