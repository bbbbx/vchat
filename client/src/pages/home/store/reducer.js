import * as actionTypes from './actionTypes';

const initState = {
  messageList: []
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch(type) {
    case actionTypes.RECEIVE_MESSAGE:
      let newState = JSON.parse(JSON.stringify(state));
      newState.messageList.push({
        username: payload.username,
        message: payload.message
      });
      return newState;
    default:
      return {
        ...state
      };
  }
};

export default reducer;
