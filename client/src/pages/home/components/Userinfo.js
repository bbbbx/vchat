import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import {
  UserinfoWrapper
} from '../styled';

class Userinfo extends PureComponent {
  render() {
    const { account, username } = this.props;
    return (
      <UserinfoWrapper>
        <div className='avatar'>
          <a href='/'>
            <img alt='alt' src={`https://www.gravatar.com/avatar/${md5(account)}?f=y&d=identicon`} />
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
