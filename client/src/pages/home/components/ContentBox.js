import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ContentWrapper,
  MessageList
} from '../styled';

class ContentBox extends Component {
  render() {
    const { messageList } = this.props;
    return (
      <ContentWrapper>
        <h3>Friend name</h3>
        <MessageList>
          {
            messageList.map(item => (
              <li key={item.message}>{item.username}：{item.message}</li>
            ))
          }
        </MessageList>
      </ContentWrapper>
    );
  }
}

const mapStateToProps = state => ({
  messageList: state.home.messageList
});

export default connect(mapStateToProps, null)(ContentBox);
