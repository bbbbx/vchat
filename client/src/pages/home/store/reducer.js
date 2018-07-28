import * as actionTypes from './actionTypes';

const initState = {
  messageList: [],
  onlineUsers: [],
  roomTitle: ''
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  let newState = JSON.parse(JSON.stringify(state));
  switch(type) {
    case actionTypes.RECEIVE_MESSAGE:
      newState.messageList.push({
        type: payload.type,
        from: payload.from,
        message: payload.message,
        date: payload.date
      });
      return newState;
    case actionTypes.UPDATE_ONLINE_USERS:
      newState.onlineUsers = JSON.parse(JSON.stringify(payload));
      return newState;
    case actionTypes.CHANGE_ROOM_TITLE:
      newState.roomTitle = payload;
      return newState;
    default:
      return newState;
  }
};

export default reducer;
