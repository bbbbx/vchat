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
        <div className='avatar'>
          <a href='/'>
            <img alt='alt' src='https://avatars1.githubusercontent.com/u/22176164?s=460&v=4' />
          </a>
        </div>
        <div className='info'>
          <h3 className='nickname'>{username}</h3>
          <a className='setting'>
            <svg className='icon' aria-hidden='true'>
              <use xlinkHref='#icon-setting'></use>
            </svg>
          </a>
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
