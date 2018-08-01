import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {
  InputWrapper
} from '../styled';
import { actionCreators } from '../store';
dayjs.locale('zh-cn');

class InputBox extends PureComponent {
  render() {
    const { username, roomTitle, socket, handleSendMessage } = this.props;
    console.log(dayjs().format('HH:mm'));
    return (
      <InputWrapper>
        <div className='toolbar'>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-face"></use>
          </svg>
        </div>
        <div 
          contentEditable 
          className='content' 
          onKeyPress={e => {
            if (e.ctrlKey && e.charCode === 13) {
              handleSendMessage(username, roomTitle, this.contentDOM, socket);
            } else if (e.charCode === 13) {
              // e.preventDefault();
            }
          }}
          ref={DOM => {
            this.contentDOM = DOM
            setTimeout((DOM = this.contentDOM) => {
              DOM.focus();
            }, 0);
            return this.contentDOM;
          }}
        ></div>
        <div className='action'>
          <span className='tips'>按下Ctrl+Enter发送消息</span>
          <span className='btn' onClick={() => handleSendMessage(username, roomTitle, this.contentDOM, socket)}>发送</span>
        </div>
      </InputWrapper>
    );
  }
}

const mapStateToProps = state => ({
  username: state.login.username,
  roomTitle: state.home.roomTitle,
  socket: state.login.socket
});

const mapDispatchToProps = dispatch => ({
  handleSendMessage(username, roomTitle, contentDOM, socket) {
    const date = dayjs().format('HH:mm');
    if (!contentDOM.innerHTML) {
      alert('消息不能为空');
      return ;
    }
    // 广播自己发送的消息给其他人
    socket.send({
      from: username,
      to: roomTitle,
      message: contentDOM.innerHTML,
      date
    });
    // 显示自己发送的消息
    dispatch(actionCreators.pushMessage({
      type: 'my_message',
      from: username,
      to: roomTitle,
      message: contentDOM.innerHTML,
      date
    }));
    contentDOM.innerText = '';
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);
