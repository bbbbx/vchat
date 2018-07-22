import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
  Button,
  Input
} from './styled';
import { actionCreators as loginActionCreators } from '../login/store';
import { actionCreators as homeActionCreators } from './store';
import Userinfo from './components/Userinfo';
import Chatlist from './components/Chatlist';
import ContentBox from './components/ContentBox';
import InputBox from './components/InputBox';

class Home extends Component {
  componentDidMount() {
    const { isLogin, socket, username, onlineUsers, receiveMessage, updateOnlineUsers } = this.props;
    if (isLogin && socket) {
      socket.emit('add_user', username);
      socket.on('message', ({ from, message}) => {
        receiveMessage({ username: from, message });
      });
      socket.on('update_onlineUsers', onlineUsers => {
        updateOnlineUsers(onlineUsers);
      });
      socket.on('user_already_online', username => {
        alert(`${username} 已在线`); // [TODO] 用户已在线？
      });
    }
  }

  render() {
    const { username, friends, onlineUsers, messageList, isLogin, socket, handleSendMessage } = this.props;
    if (isLogin && socket) {
      return (
        <HomeWrapper>
          <HomeLeft>
            <Userinfo>
            </Userinfo>
            <Chatlist>
            </Chatlist>
          </HomeLeft>
          <HomeRight>
            <ContentBox />
            <InputBox />
          </HomeRight>
        </HomeWrapper>
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
  messageList: state.home.messageList,
  onlineUsers: state.home.onlineUsers
});

const mapDispatchToProps = dispatch => ({
  handleSendMessage(username, messageDOM, socket) {
    socket.send({
      from: username,
      message: messageDOM.value
    });
    messageDOM.value = '';
  },
  connectSocket() {
    dispatch(loginActionCreators.connectSocket());
  },
  disconnectSocket() {
    dispatch(loginActionCreators.disconnectSocket());
  },
  receiveMessage({ username, message }) {
    dispatch(homeActionCreators.receiveMessage({ username, message }));
  },
  updateOnlineUsers(onlineUsers) {
    dispatch(homeActionCreators.updateOnlineUsers(onlineUsers));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
