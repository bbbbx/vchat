import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  ChatlistWrapper,
  ChatRoomWrapper
} from '../styled';
import { actionCreators } from '../store';

class FriendList extends PureComponent {
  render() {
    const { friends, selectedFriend, handleSelectFriend } = this.props;
    return (
      <ChatlistWrapper>
        {
          friends.map((friend) => (
            <ChatRoomWrapper key={friend.account} className={selectedFriend === friend.account && 'active'} onClick={() => handleSelectFriend(friend.account)}>
              <div className='avatar'>
                <img alt={friend.account} src={friend.avatarURL} />
              </div>
              <div className='info'>
                <h3 className='nickname'>
                  <span className='nickname-text'>{friend.username}</span>
                </h3>
              </div>
            </ChatRoomWrapper>
          ))
        }
      </ChatlistWrapper>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.login.friends,
  selectedFriend: state.home.selectedFriend
});

const mapDispatchToProps = dispatch => ({
  handleSelectFriend(friendAccount) {
    console.log(friendAccount);
    dispatch(actionCreators.changeSelectedFriend(friendAccount));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
