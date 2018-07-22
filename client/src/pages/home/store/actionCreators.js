import * as actionTypes from './actionTypes';

export const receiveMessage = payload => ({
  type: actionTypes.RECEIVE_MESSAGE,
  payload
});
