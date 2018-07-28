import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import {
  ChatRoomWrapper
} from '../styled';
import { actionCreators } from '../store';

class ChatRoom extends Component {
  render() {
    const { account, changeRoomTitle } = this.props;
    const hashedAccount = md5(account);
    return (
      <ChatRoomWrapper onClick={() => changeRoomTitle(account)}>
        <div className='avatar'>
          <img alt={account} src={`https://www.gravatar.com/avatar/${hashedAccount}?f=y&d=identicon`} />
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
  friends: state.login.friends
});

const mapDispatchToProps = dispatch => ({
  changeRoomTitle(account) {
    dispatch(actionCreators.changeRoomTitle(account));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
