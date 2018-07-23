import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import {
  LoginWrapper,
  RegisterBox,
  Input,
  Button,
  Title,
  Loading
} from '../styled';
import { actionCreators } from '../store';

class Register extends Component {
  render() {
    const {
      loading,
      message,
      account, 
      username, 
      password, 
      handleChangeAccount, 
      handleChangeUsername, 
      handleChangePassword, 
      handleRegister,
      confirmPasswordEqual,
      handleShowRegisterView
    } = this.props;
    const loadingComponent = loading && <Loading>注册中...</Loading>;
    return (
      <Fragment>
        {loadingComponent}
        <LoginWrapper>
          <RegisterBox>
            {
              message
                ? <Title className='message'>{message}</Title>
                : <Title>注册</Title>
            }
            <Input placeholder='账号' onChange={handleChangeAccount} />
            <Input placeholder='用户名' onChange={handleChangeUsername} />
            <Input placeholder='密码' type='password' onChange={e => handleChangePassword(e, this.confirmPasswordDOM)} />
            <Input innerRef={DOM => this.confirmPasswordDOM = DOM} required placeholder='确认密码' type='password' onChange={e => confirmPasswordEqual(e, password)} />
            {
              message
                ? <Button disabled className="register" onClick={() => handleRegister(account, username, password)}>立即注册</Button>
                : <Button className="register" onClick={() => handleRegister(account, username, password)}>立即注册</Button>
            }
            <Button className="back-to-login" onClick={() => handleShowRegisterView(false)}>返回</Button>
          </RegisterBox>
        </LoginWrapper>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.login.loading,
  message: state.login.message,
  account: state.login.account,
  username: state.login.username,
  password: state.login.password
});

const mapDispatchToProps = dispatch => ({
  handleChangeAccount(e) {
    dispatch(actionCreators.changeAccountInput(e.target.value));
  },
  handleChangeUsername(e) {
    dispatch(actionCreators.changeUsernameInput(e.target.value));
  },
  handleChangePassword(e, confirmPasswordDOM) {
    dispatch(actionCreators.changePasswordInput(e.target.value));
    if (e.target.value !== confirmPasswordDOM.value) {
      dispatch(actionCreators.changeMessage('密码不一致'));
    } else {
      dispatch(actionCreators.changeMessage(''));
    }
  },
  confirmPasswordEqual(e, password) {
    if (e.target.value !== password) {
      dispatch(actionCreators.changeMessage('密码不一致'));
    } else {
      dispatch(actionCreators.changeMessage(''));
    }
  },
  handleRegister(account, username, password) {
    if (account.trim() === '' || username.trim() === '' || password.trim() === '') {
      alert('信息不能为空');
    } else {
      dispatch(actionCreators.register({
        account,
        username,
        password,
        socket: io('http://localhost:8000')
      }));
    }
  },
  handleShowRegisterView(show) {
    dispatch(actionCreators.toggleShowRegisterView(show));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
