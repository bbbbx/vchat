import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Input
} from './styled';
import { actionCreators as loginActionCreators } from '../login/store';

class Home extends Component {
  componentDidMount() {
    console.log(`Home componentDidMount`);
    const { isLogin, socket, connectSocket } = this.props;
    isLogin && !socket && connectSocket();
  }

  componentWillUnmount() {
    const { disconnectSocket } = this.props;
    console.log(`Home componentWillUnmount`);
    disconnectSocket();
    localStorage.clear();
  }

  render() {
    console.log(`Home render`);
    const { username, friends, isLogin, connectedSocket, handleSendMessage } = this.props;
    if (isLogin && connectedSocket) {
      return (
        <div>
          <h1>Home</h1>
          <p>Welcome {username}</p>
          <p>Your friends: </p>
          <ul>
            {
              friends.map(item => (
                <li key={item}>{item}</li>
              ))
            }
          </ul>
          <Input />
          <Button onClick={handleSendMessage}>发送</Button>
        </div>
      );
    } else {
      return <Redirect to='/login' />;
    }
  }
}

const mapStateToProps = state => ({
  isLogin: state.login.isLogin,
  account: state.login.account,
  username: state.login.username,
  friends: state.login.friends,
  socket: state.login.socket,
  connectedSocket: state.login.connectedSocket
});

const mapDispatchToProps = dispatch => ({
  handleSendMessage() {
    alert('handleSendMessage');
  },
  connectSocket() {
    dispatch(loginActionCreators.connectSocket());
  },
  disconnectSocket() {
    dispatch(loginActionCreators.disconnectSocket());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
