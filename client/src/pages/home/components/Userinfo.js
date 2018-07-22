import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  UserinfoWrapper
} from '../styled';

class Userinfo extends Component {
  render() {
    const { username } = this.props;
    return (
      <UserinfoWrapper>
        <div className='avatar'>avatar</div>
        <div className='info'>
          <h3 className='nickname'>{username}</h3>
          <a className='setting'>setting</a>
        </div>
      </UserinfoWrapper>
    );
  }
}

const mapStateToProps = state => ({
  account: state.login.account,
  username: state.login.username
});

export default connect(mapStateToProps, null)(Userinfo);
