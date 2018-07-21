import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  LoginWrapper,
  LoginBox,
  Input,
  Button,
  Title,
  LinkWrapper,
  Loading
} from './styled';
import { actionCreators } from './store';
import Register from './components/Register';

class Login extends Component {
  componentDidMount() {
    console.log(`Login componentDidMount`);
  }

  render() {
    const { 
      loading,
      account,
      password,
      isLogin,
      connectedSocket,
      showRegisterView,
      handleChangeAccount, 
      handleChangePassword, 
      handleLogin,
      handleShowRegisterView
    } = this.props;
    const loadingComponent = loading && <Loading>登录中...</Loading>;
    console.log(`Login render`,isLogin, connectedSocket);
    return (
      showRegisterView
        ? <Register />
        : isLogin && connectedSocket
            ? <Redirect to='/' />
            : <Fragment>
                {loadingComponent}
                <LoginWrapper>
                  <LoginBox>
                    <Title>登录</Title>
                    <Input placeholder='账号' onChange={handleChangeAccount} />
                    <Input placeholder='密码' type='password' onChange={handleChangePassword} />
                    <Button className="login" onClick={() => handleLogin(account, password)}>登录</Button>
                    <LinkWrapper>
                      <a className='register' onClick={() => handleShowRegisterView(true)}>注册</a>
                      <a className='forget-password' onClick={() => alert('待实现')}>忘记密码？</a>
                    </LinkWrapper>
                  </LoginBox>
                </LoginWrapper>
              </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.login.loading,
  isLogin: state.login.isLogin,
  account: state.login.account,
  password: state.login.password,
  socket: state.login.socket,
  connectedSocket: state.login.connectedSocket,
  showRegisterView: state.login.showRegisterView
});

const mapDispatchToProps = dispatch => ({
  handleLogin(account, password) {
    console.log('click login');
    if (account.trim() === '' || password.trim() === '') {
      alert('用户或密码不能为空');
    } else {
      dispatch(actionCreators.login({
        account,
        password
      }));
    }
  },
  handleChangeAccount(e) {
    dispatch(actionCreators.changeAccountInput(e.target.value));
  },
  handleChangePassword(e) {
    dispatch(actionCreators.changePasswordInput(e.target.value));
  },
  handleShowRegisterView(show) {
    dispatch(actionCreators.toggleShowRegisterView(show));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
