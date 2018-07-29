import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import md5 from 'md5';
import './react-tabs.css';
import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
  ContentWrapper
} from './styled';
import { actionCreators as loginActionCreators } from '../login/store';
import { actionCreators as homeActionCreators } from './store';
import Userinfo from './components/Userinfo';
import Chatlist from './components/Chatlist';
import InputBox from './components/InputBox';
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
    const { friends, messageList, isLogin, socket, roomTitle } = this.props;
    if (isLogin && socket) {
      return (
        <HomeWrapper>
          <HomeLeft>
            <Userinfo>
            </Userinfo>
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
                <Chatlist list={['人民广场']} />
              </TabPanel>
              <TabPanel>
                <Chatlist list={friends} />
              </TabPanel>
            </Tabs>
          </HomeLeft>

          <HomeRight>
            <div className='title'>{roomTitle}</div>
            {/* <ContentBox /> */}
            <ContentWrapper innerRef={DOM => { this.messageListDOM = DOM; }}>
              {
                messageList[roomTitle].map((item, index) => (
                  <li key={item.message + item.date + index}>
                    <div className='date'>{item.date}</div>
                    { // 别人发送的消息，显示名称
                      item.type === 'other_message' && (
                        <Fragment>
                          <img className='avatar' alt={item.from} src={`https://www.gravatar.com/avatar/${md5(item.from)}?f=y&d=identicon`} />
                          <div>
                            <h4 className='username' dangerouslySetInnerHTML={{ __html: item.from }} />
                            <div className='message' dangerouslySetInnerHTML={{ __html: item.message }} />
                          </div>
                        </Fragment>
                      )
                    }
                    { // 自己发送的消息，不显示名称
                      item.type === 'my_message' && (
                        <Fragment>
                          <img className='avatar my-avatar' alt={item.from} src={`https://www.gravatar.com/avatar/${md5(item.from)}?f=y&d=identicon`} />
                          <div className='my-message' dangerouslySetInnerHTML={{ __html: item.message }} />
                        </Fragment>
                      )
                    }
                  </li>      
                ))
              }
            </ContentWrapper>
            <InputBox scrollMessageList={() => {
              this.messageListDOM.scrollTop = this.messageListDOM.scrollHeight - 104;
            }} />
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
