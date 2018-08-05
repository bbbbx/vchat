import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import './react-tabs.css';
import {
  HomeWrapper,
  HomeLeft,
  HomeRight
} from './styled';
import { actionCreators as loginActionCreators } from '../login/store';
import { actionCreators as homeActionCreators } from './store';
import Userinfo from './components/Userinfo';
import SearchUser from './components/SearchUser';
import Chatlist from './components/Chatlist';
import ChatWindow from './components/ChatWindow';
import '../../statics/iconfont/iconfont';
import '../../statics/iconfont/styled';

class Home extends Component {
  componentDidMount() {
    const { username, isLogin, socket, receiveMessage, receivePrivateMessage } = this.props;
    if (isLogin && socket) {
      socket
        .on('message', data => {
          if (data.to === username) {
            // 私聊
            receivePrivateMessage(data);
          } else {
            // 公聊
            receiveMessage(data);
          }
        });
    }
  }

  render() {
    const { 
      token,
      friends, 
      messageList, 
      isLogin, 
      socket
    } = this.props;
    if (isLogin && socket) {
      return (
        <HomeWrapper>
          <HomeLeft>
            <Userinfo />
            <SearchUser />

            <Tabs>
              <TabList>
                <Tab>
                  <svg className='icon' aria-hidden='true'>
                    <use xlinkHref='#icon-chat'></use>
                  </svg>
                </Tab>
                <Tab>
                  <svg className='icon' aria-hidden='true'>
                    <use xlinkHref='#icon-friends'></use>
                  </svg>
                </Tab>
              </TabList>

              <TabPanel>
                <Chatlist list={Object.keys(messageList)} />
              </TabPanel>
              <TabPanel>
                <Chatlist list={friends} />
              </TabPanel>
            </Tabs>
          </HomeLeft>

          <HomeRight>
            <ChatWindow />
          </HomeRight>
        </HomeWrapper>
      );
    } else {
      return <Redirect to='/login' />;
    }
  }
}

const mapStateToProps = state => ({
  token: state.login.token,
  isLogin: state.login.isLogin,
  account: state.login.account,
  username: state.login.username,
  friends: state.login.friends,
  socket: state.login.socket,
  messageList: state.home.messageList,
  roomTitle: state.home.roomTitle
});

const mapDispatchToProps = dispatch => ({
  connectSocket() {
    dispatch(loginActionCreators.connectSocket());
  },
  disconnectSocket() {
    dispatch(loginActionCreators.disconnectSocket());
  },
  receiveMessage(data) {
    dispatch(homeActionCreators.receiveMessage(data));
  },
  receivePrivateMessage(data) {
    dispatch(homeActionCreators.receivePrivateMessage(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
