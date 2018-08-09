import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'md5';
import {
  ChatRoomWrapper
} from '../styled';
import { actionCreators } from '../store';

class ChatRoom extends PureComponent {
  static propTypes = {
    chatRoomTitle: propTypes.string.isRequired
  };

  render() {
    const { chatRoomTitle, selectedChatRoom, friends,  changeRoomTitle } = this.props;
    const friend = friends.filter(friend => friend.account === chatRoomTitle)[0];
    return (
      <ChatRoomWrapper className={selectedChatRoom === chatRoomTitle && 'active'} onClick={() => changeRoomTitle(chatRoomTitle)}>
        <div className='avatar'>
          <img 
            alt={chatRoomTitle} 
            src={friend? friend.avatarURL: `https://www.gravatar.com/avatar/${md5(chatRoomTitle)}?f=y&d=identicon`} />
        </div>
        <div className='info'>
          <h3 className='nickname'>
            <span className='nickname-text'>{chatRoomTitle}</span>
          </h3>
        </div>
      </ChatRoomWrapper>
    );
  }
}

const mapStateToProps = state => ({
  selectedChatRoom: state.home.selectedChatRoom,
  friends: state.login.friends
});

const mapDispatchToProps = dispatch => ({
  changeRoomTitle(account) {
    dispatch(actionCreators.changeRoomTitle(account));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
