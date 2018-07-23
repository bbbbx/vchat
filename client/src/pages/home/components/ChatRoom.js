import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ChatRoomWrapper
} from '../styled';

class ChatRoom extends Component {
  render() {
    return (
      <ChatRoomWrapper>
        <div className='avatar'>
          <img alt='alt' src='https://avatars1.githubusercontent.com/u/22176164?s=460&v=4' />
        </div>
        <div className='info'>
          <h3 className='nickname'>
            <span className='nickname-text'>{this.props.nickname}</span>
          </h3>
        </div>
      </ChatRoomWrapper>
    );
  }
}

const mapStateToProps = state => ({
  account: state.login.account,
  username: state.login.username
});

export default connect(mapStateToProps, null)(ChatRoom);
