import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  FriendWrapper
} from '../styled';
import { actionCreators } from '../store';

class Friend extends PureComponent {
  render() {
    const { 
      selectedFriend,
      friends, 
      changeSelectedChatRoom
    } = this.props;
    const friend = friends.filter(friend => friend.account === selectedFriend)[0];
    return (
      <FriendWrapper>
        {
          selectedFriend
            ? <div className='user'>
                <img className='avatar' src={friend.avatarURL} alt={friend.avatarURL} />
                <div className='user-info'>
                  <div className='username'>{friend.username}</div>
                  <div className='account'>{friend.account}</div>
                </div>
                <button 
                  className='send-message' 
                  onClick={() => changeSelectedChatRoom(friend.account)}>
                  发送消息
                </button>
              </div>
            : <div className='user'>
                <div className='user-info'>未选择</div>
              </div>
        }
      </FriendWrapper>
    );
  }
}

const mapStateToProps = state => ({
  selectedFriend: state.home.selectedFriend,
  friends: state.login.friends
});

const mapDispatchToProps = dispatch => ({
  changeSelectedChatRoom(account) {
    dispatch(actionCreators.changeRoomTitle(account));
    dispatch(actionCreators.changeTabIndex(0));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Friend);
