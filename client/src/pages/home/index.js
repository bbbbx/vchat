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
    const { isLogin, socket, receiveMessage } = this.props;
    if (isLogin && socket) {
      socket
        .on('message', data => {
          receiveMessage(data);
        });
    }
  }

  render() {
    const { account, friends, messageList, isLogin, socket, roomTitle } = this.props;
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
                <Chatlist list={['chat room 1', 'chat room 2', 'chat room 3', 'chat room 4', 'chat room 5', 'chat room 6', '7777']} />
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
                messageList.map(item => (
                  <li key={item.message + item.date}>
                    <div className='date'>{item.date}</div>
                    {
                      item.type === 'public' && (
                        <Fragment>
                          <img className='avatar' alt={item.from} src={`https://www.gravatar.com/avatar/${md5(item.from)}?f=y&d=identicon`} />
                          <div>
                            <h4 className='username' dangerouslySetInnerHTML={{ __html: item.from }} />
                            <div className='message' dangerouslySetInnerHTML={{ __html: item.message }} />
                          </div>
                        </Fragment>
                      )
                    }
                    {
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
              this.messageListDOM.scrollTop = this.messageListDOM.scrollHeight;
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
