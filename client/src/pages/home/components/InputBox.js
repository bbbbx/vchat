import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {
  InputWrapper
} from '../styled';
dayjs.locale('zh-cn');

class InputBox extends Component {
  render() {
    const { username, roomTitle, socket, handleSendMessage, handleNextLine, scrollMessageList } = this.props;
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
            // e.preventDefault();
            if (e.ctrlKey) {
              handleNextLine(this.contentDOM); 
              return true;
            }  
            e.charCode === 13 && handleSendMessage(username, roomTitle, this.contentDOM, socket, scrollMessageList); 
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
          <span className='tips'>按下Ctrl+Enter换行</span>
          <span className='btn' onClick={() => handleSendMessage(username, this.contentDOM, socket, scrollMessageList)}>发送</span>
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
  handleSendMessage(username, roomTitle, contentDOM, socket, scrollMessageList) {
    // [TODO] 显示自己私聊给他人的信息
    socket.send({
      from: username,
      to: roomTitle,
      message: contentDOM.innerHTML,
      date: dayjs().format('HH:mm')
    });
    contentDOM.innerHTML = null;
    scrollMessageList();
  },
  handleNextLine(contentDOM) {
    contentDOM.innerHTML += '<br />';
    contentDOM.focus();
    var range = window.getSelection();   //创建range
    range.selectAllChildren(contentDOM); //range 选择obj下所有子内容
    range.collapseToEnd();               //光标移至最后

    contentDOM.scrollTop = contentDOM.scrollHeight;
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);
