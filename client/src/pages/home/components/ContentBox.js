import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ContentWrapper
} from '../styled';

class ContentBox extends Component {
  render() {
    const { messageList } = this.props;
    return (
      <ContentWrapper>
        {
          messageList.map(item => (
            <li key={item.message} dangerouslySetInnerHTML={{ __html: item.username + '：' + item.message }} />
          ))
        }
      </ContentWrapper>
    );
  }
}

const mapStateToProps = state => ({
  messageList: state.home.messageList
});

export default connect(mapStateToProps, null)(ContentBox);
