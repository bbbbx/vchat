import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import {
  ContentWrapper
} from '../styled';
import InputBox from './InputBox';

class ChatWindow extends Component {
  componentDidUpdate() {
    this.chatRoomListDOM.children.length !== 0
      && this.chatRoomListDOM.children[this.chatRoomListDOM.children.length-1].scrollIntoViewIfNeeded(true);
  }
  
  render() {
    const { selectedChatRoom, chatRoomList } = this.props;
    return (
      <Fragment>
        <div className='title'>{selectedChatRoom}</div>
        <ContentWrapper innerRef={DOM => { this.chatRoomListDOM = DOM; }}>
          {
            chatRoomList[selectedChatRoom].map((item, index) => (
              <li key={item.message + item.date + index}>
                <div className='date'>{item.date}</div>
                { // 别人发送的消息，显示名称
                  item.type === 'other_message' && (
                    <Fragment>
                      <img className='avatar' alt={item.from} src={`https://www.gravatar.com/avatar/${md5(item.from)}?f=y&d=identicon`} />
                      <div>
                        <h4 className='username' dangerouslySetInnerHTML={{ __html: item.from }} />
                        <div className='message' dangerouslySetInnerHTML={{ __html: item.message }} />
                      </div>
                    </Fragment>
                  )
                }
                { // 自己发送的消息，不显示名称
                  item.type === 'my_message' && (
                    <Fragment>
                      <img className='avatar my-avatar' alt={item.from} src={`https://www.gravatar.com/avatar/${md5(item.from)}?f=y&d=identicon`} />
                      <div className='my-message' dangerouslySetInnerHTML={{ __html: item.message }} />
                    </Fragment>
                  )
                }
              </li>      
            ))
          }
        </ContentWrapper>
        <InputBox />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  selectedChatRoom: state.home.selectedChatRoom,
  chatRoomList: state.home.chatRoomList
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
