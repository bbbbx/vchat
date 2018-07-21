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
    const { username, friends, isLogin } = this.props;
    if (isLogin) {
      return (
        <div>
          <h1>Home</h1>
          <p>Welcome {username}</p>
          <p>Your friends: </p>
          <ul>
            {
              friends.map(item => (
                <li key={item}>{item}</li>
              ))
            }
          </ul>
        </div>
      );
    } else {
      return <Redirect to='/login' />;
    }
  }
}

const mapStateToProps = state => ({
  isLogin: state.login.isLogin,
  account: state.login.account,
  username: state.login.username,
  friends: state.login.friends,
  socket: state.login.socket
});

export default connect(mapStateToProps, null)(Home);
