import * as actionTypes from './actionTypes';

const initState = {
  chatRoomList: {
    '人民广场': []
  },
  selectedChatRoom: '人民广场',
  selectedFriend: '',
  tabIndex: 0,
  showSearchUsers: false,
  searchedUsers: [],
  showSetting: false
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  let newState = JSON.parse(JSON.stringify(state));
  switch(type) {
    case actionTypes.RECEIVE_MESSAGE:
      newState.chatRoomList[payload.to].push({
        type: payload.type,
        from: payload.from,
        message: payload.message,
        date: payload.date
      });
      return newState;
    case actionTypes.RECEIVE_PRIVATE_MESSAGE:
      !(payload.from in newState.chatRoomList) && (newState.chatRoomList[payload.from] = []); 
      newState.chatRoomList[payload.from].push({
        type: payload.type,
        from: payload.from,
        message: payload.message,
        date: payload.date
      });
      return newState;
    case actionTypes.PUSH_MESSAGE:
      !(payload.to in newState.chatRoomList) && (newState.chatRoomList[payload.to] = []); 
      newState.chatRoomList[payload.to].push({
        type: payload.type,
        from: payload.from,
        message: payload.message,
        date: payload.date
      });
      return newState;
    case actionTypes.CHANGE_ROOM_TITLE:
      if (!(payload in newState.chatRoomList)) {
        newState.chatRoomList[payload] = [];
      }
      newState.selectedChatRoom = payload;
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
      };
    case actionTypes.CHANGE_SELECTED_FRIEND:
      return {
        ...newState,
        selectedFriend: payload
      };
    case actionTypes.CHANGE_TAB_INDEX:
      return {
        ...newState,
        tabIndex: payload
      };
    case actionTypes.CHANGE_SHOW_SETTING:
      return {
        ...newState,
        showSetting: payload
      };
    default:
      return newState;
  }
};

export default reducer;
