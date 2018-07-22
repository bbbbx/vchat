import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ChatlistWrapper
} from '../styled';
import ChatRoom from './ChatRoom';

class Chatlist extends Component {
  render() {
    return (
      <ChatlistWrapper>
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
      </ChatlistWrapper>
    );
  }
}

const mapStateToProps = state => ({
  account: state.login.account,
  username: state.login.username
});

export default connect(mapStateToProps, null)(Chatlist);
