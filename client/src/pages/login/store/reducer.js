import io from 'socket.io-client';

const initState = {
  account: '',
  username: '',
  password: '',
  isLogin: false,
  socket: io('http://localhost:8000')
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default reducer;
