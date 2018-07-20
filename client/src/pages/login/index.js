import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  LoginWrapper,
  LoginBox,
  Input,
  Button,
  Title
} from './styled';

class Login extends Component {
  render() {
    const { handleChangeAccount, handleChangePassword, handleLogin } = this.props;
    return (
      <LoginWrapper>
        <LoginBox>
          <Title>登录</Title>
          <Input placeholder='账号' onChange={handleChangeAccount} />
          <Input placeholder='密码' type='password' onChange={handleChangePassword}/>
          <Button onClick={handleLogin}>登录</Button>
        </LoginBox>
      </LoginWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.login.isLogin,
  account: state.login.account,
  password: state.login.password,
  socket: state.login.socket
});

const mapDispatchToProps = dispatch => ({
  handleLogin() {
    console.log('click login');
    
  },
  handleChangeAccount(e) {
    console.log('change account', e.target.value);
  },
  handleChangePassword(e) {
    console.log('change password', e.target.value);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
