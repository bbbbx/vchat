import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  ChatlistWrapper
} from '../styled';
import ChatRoom from './ChatRoom';

class ChatRoomList extends PureComponent {

  render() {
    const { chatRoomList } = this.props;
    const chatRoomListTitle = Object.keys(chatRoomList);
    return (
      <ChatlistWrapper>
        {
          chatRoomListTitle.map((chatRoomTitle) => (
            <ChatRoom 
              key={chatRoomTitle} 
              chatRoomTitle={chatRoomTitle}
            />
          ))
        }
      </ChatlistWrapper>
    );
  }
}

const mapStateToProps = state => ({
  chatRoomList: state.home.chatRoomList,
});

export default connect(mapStateToProps, null)(ChatRoomList);
