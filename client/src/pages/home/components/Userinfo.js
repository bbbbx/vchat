import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  UserinfoWrapper
} from '../styled';
import { actionCreators } from '../store';

class Userinfo extends PureComponent {
  render() {
    const { username, avatarURL, showSetting, handleClickSetting } = this.props;
    return (
      <UserinfoWrapper>
        <div className='avatar'>
          <a href='/'>
            <img alt={avatarURL} src={avatarURL} />
          </a>
        </div>
        <div className='info'>
          <h3 className='nickname'>{username}</h3>
          <a className='setting-btn' onClick={() => handleClickSetting(showSetting)}>
            <svg className='icon' aria-hidden='true'>
              <use xlinkHref='#icon-setting'></use>
            </svg>
          </a>
        </div>
        {
          showSetting
            ? <ul className='setting'>
                <li className='setting-item'>修改资料</li>
                <li className='setting-item'>意见反馈</li>
                <li className='setting-item danger'>退出</li>
              </ul>
            : null
        }
      </UserinfoWrapper>
    );
  }
}

const mapStateToProps = state => ({
  username: state.login.username,
  avatarURL: state.login.avatarURL,
  showSetting: state.home.showSetting
});

const mapDispatchToState = dispatch => ({
  handleClickSetting(showSetting) {
    dispatch(actionCreators.changeShowSetting(!showSetting));
  }
});

export default connect(mapStateToProps, mapDispatchToState)(Userinfo);
