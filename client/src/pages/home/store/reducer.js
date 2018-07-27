import * as actionTypes from './actionTypes';

const initState = {
  messageList: [],
  onlineUsers: []
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  let newState = JSON.parse(JSON.stringify(state));
  switch(type) {
    case actionTypes.RECEIVE_MESSAGE:
      newState.messageList.push({
        username: payload.username,
        message: payload.message,
        date: payload.date
      });
      return newState;
    case actionTypes.UPDATE_ONLINE_USERS:
      newState.onlineUsers = JSON.parse(JSON.stringify(payload));
      return newState;
    default:
      return {
        ...state
      };
  }
};

export default reducer;
