import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  componentDidMount() {
    this.props.socket.send('from client');
    this.props.socket.on('message', data => {
      console.log(data);
    });
  }

  render() {
    const { isLogin } = this.props;
    if (!isLogin) {
      return <Redirect to='/login' />;
    }
    return (
      <div>
        Home
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.login.isLogin,
  socket: state.login.socket
});

export default connect(mapStateToProps, null)(Home);
