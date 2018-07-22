import * as actionTypes from './actionTypes';

export const receiveMessage = payload => ({
  type: actionTypes.RECEIVE_MESSAGE,
  payload
});

export const updateOnlineUsers = onlineUsers => ({
  type: actionTypes.UPDATE_ONLINE_USERS,
  payload: onlineUsers
});
