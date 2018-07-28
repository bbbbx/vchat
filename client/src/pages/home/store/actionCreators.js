import * as actionTypes from './actionTypes';

export const receiveMessage = payload => ({
  type: actionTypes.RECEIVE_MESSAGE,
  payload
});

export const receivePrivateMessage = payload => ({
  type: actionTypes.RECEIVE_PRIVATE_MESSAGE,
  payload
})

export const updateOnlineUsers = onlineUsers => ({
  type: actionTypes.UPDATE_ONLINE_USERS,
  payload: onlineUsers
});

export const changeRoomTitle = title => ({
  type: actionTypes.CHANGE_ROOM_TITLE,
  payload: title
});
