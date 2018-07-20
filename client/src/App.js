import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      socket: io('http://localhost:8000')
    };
    this.handleSendMsg = this.handleSendMsg.bind(this);
  }

  componentDidMount() {
    this.state.socket.on('message', data => {
      this.setState((provState) => ({
        msg: provState.msg + data
      }));
    });
  }

  handleSendMsg() {
    this.state.socket.send('hello world!');
  }

  render() {
    return (
      <div>
        { this.state.msg }
        <button onClick={this.handleSendMsg}>Send</button>
      </div>
    );
  }
}

export default App;
