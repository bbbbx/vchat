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
import ChatRoomList from './components/ChatRoomList';
import ChatWindow from './components/ChatWindow';
import FriendList from './components/FriendList';
import Friend from './components/Friend';
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
      tabIndex,
      chatRoomList, 
      isLogin, 
      socket,
      handleSelectTabs
    } = this.props;
    if (isLogin && socket) {
      return (
        <HomeWrapper>
          <HomeLeft>
            <Userinfo />
            <SearchUser />

            <Tabs 
              selectedIndex={tabIndex}
              onSelect={index => handleSelectTabs(index)}
            >
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
                <ChatRoomList list={Object.keys(chatRoomList)} />
              </TabPanel>
              <TabPanel>
                <FriendList />
              </TabPanel>
            </Tabs>
          </HomeLeft>

          <HomeRight>
            {
              tabIndex === 0
                ? <ChatWindow />
                : tabIndex === 1
                  ? <Friend />
                  : <div>{tabIndex} 错误</div>

            }
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
  username: state.login.username,
  socket: state.login.socket,
  chatRoomList: state.home.chatRoomList,
  tabIndex: state.home.tabIndex
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
  },
  handleSelectTabs(index) {
    dispatch(homeActionCreators.changeTabIndex(index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
