import * as actionTypes from './actionTypes';

const initState = {
  messageList: {
    '人民广场': []
  },
  onlineUsers: [],
  roomTitle: '人民广场',
  showSearchUsers: false,
  searchedUsers: []
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  let newState = JSON.parse(JSON.stringify(state));
  switch(type) {
    case actionTypes.RECEIVE_MESSAGE:
      newState.messageList[payload.to].push({
        type: payload.type,
        from: payload.from,
        message: payload.message,
        date: payload.date
      });
      return newState;
    case actionTypes.RECEIVE_PRIVATE_MESSAGE:
      !(payload.from in newState.messageList) && (newState.messageList[payload.from] = []); 
      newState.messageList[payload.from].push({
        type: payload.type,
        from: payload.from,
        message: payload.message,
        date: payload.date
      });
      return newState;
    case actionTypes.PUSH_MESSAGE:
      !(payload.to in newState.messageList) && (newState.messageList[payload.to] = []); 
      newState.messageList[payload.to].push({
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
      if (!(payload in newState.messageList)) {
        newState.messageList[payload] = [];
      }
      newState.roomTitle = payload;
      return newState;
    case actionTypes.TOGGLE_SHOW_SEARCH_USERS:
      return {
        ...newState,
        showSearchUsers: payload
      };
    case actionTypes.CHANGE_SEARCH_USERS:
      return {
        ...newState,
        searchedUsers: payload
      }
    default:
      return newState;
  }
};

export default reducer;
