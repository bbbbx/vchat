import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import {
  ContentWrapper
} from '../styled';
import InputBox from './InputBox';

class ChatWindow extends Component {
  componentDidUpdate() {
    this.messageListDOM.children.length !== 0
      && this.messageListDOM.children[this.messageListDOM.children.length-1].scrollIntoViewIfNeeded(true);
  }
  
  render() {
    const { roomTitle, messageList } = this.props;
    return (
      <Fragment>
        <div className='title'>{roomTitle}</div>
        <ContentWrapper innerRef={DOM => { this.messageListDOM = DOM; }}>
          {
            messageList[roomTitle].map((item, index) => (
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
  roomTitle: state.home.roomTitle,
  messageList: state.home.messageList
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
