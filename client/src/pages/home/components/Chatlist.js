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
        {
          this.props.list.map(item => (
            <ChatRoom nickname={item} key={item} />
          ))
        }
      </ChatlistWrapper>
    );
  }
}

const mapStateToProps = state => ({
  account: state.login.account,
  username: state.login.username
});

export default connect(mapStateToProps, null)(Chatlist);
