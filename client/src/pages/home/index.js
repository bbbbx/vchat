import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Input
} from './styled';
import { actionCreators as loginActionCreators } from '../login/store';
import { actionCreators as homeActionCreators } from './store';

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
        <div>
          <h1>VChat</h1>
          <p>Welcome {username}</p>
          {
            friends.length === 0
              ? <p>未加到任何好友</p>
              : <div>
                  <p>Your friends: </p>
                  <ul>  
                    {
                      friends.map(item => (
                        <li key={item}>
                          <a href={'/users/' + item} >{item}</a>
                        </li>
                      ))
                    }
                  </ul>
                </div>
          }
          {
            <div>
              <p>在线用户：</p>
              <ul>  
                {
                  onlineUsers.map(item => (
                    <li key={item}>
                      <a href={'/users/' + item} >{item}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
          <p>Message: </p>
          <ul>
            {
              messageList.map(item => (
                <li key={item.message}>{item.username}：{item.message}</li>
              ))
            }
          </ul>
          <Input innerRef={DOM => this.messageDOM = DOM} />
          <Button onClick={() => handleSendMessage(username, this.messageDOM, socket)}>发送</Button>
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
