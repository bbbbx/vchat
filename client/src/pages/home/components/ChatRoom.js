import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ChatRoomWrapper
} from '../styled';

class ChatRoom extends Component {
  render() {
    return (
      <ChatRoomWrapper>ChatRoomWrapper</ChatRoomWrapper>
    );
  }
}

const mapStateToProps = state => ({
  account: state.login.account,
  username: state.login.username
});

export default connect(mapStateToProps, null)(ChatRoom);
