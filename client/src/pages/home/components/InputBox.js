import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  InputWrapper,
  Input,
  Button
} from '../styled';

class InputBox extends Component {
  render() {
    const { username, socket, handleSendMessage } = this.props;
    return (
      <InputWrapper>
        {/* <input />
        <button>发送</button> */}
        <Input innerRef={DOM => this.messageDOM = DOM} />
        <Button onClick={() => handleSendMessage(username, this.messageDOM, socket)}>发送</Button>
      </InputWrapper>
    );
  }
}

const mapStateToProps = state => ({
  username: state.login.username,
  socket: state.login.socket
});

const mapDispatchToProps = dispatch => ({
  handleSendMessage(username, messageDOM, socket) {
    socket.send({
      from: username,
      message: messageDOM.value
    });
    messageDOM.value = '';
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);
