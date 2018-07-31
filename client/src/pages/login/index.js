import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
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

class Login extends PureComponent {
  componentDidMount() {
    console.log(`Login componentDidMount`);
  }

  render() {
    const { 
      loading,
      account,
      password,
      isLogin,
      socket,
      showRegisterView,
      handleChangeAccount, 
      handleChangePassword, 
      handleLogin,
      handleShowRegisterView
    } = this.props;
    const loadingComponent = loading && <Loading>登录中...</Loading>;
    console.log(`Login render`);
    return (
      showRegisterView
        ? <Register />
        : isLogin && socket
            ? <Redirect to='/' />
            : <Fragment>
                {loadingComponent}
                <LoginWrapper>
                  <LoginBox>
                    <Title>登录</Title>
                    <Input placeholder='账号' onChange={handleChangeAccount} autoFocus />
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
  showRegisterView: state.login.showRegisterView
});

const mapDispatchToProps = dispatch => ({
  handleLogin(account, password) {
    console.log('click login');
    if (account.trim() === '' || password.trim() === '') {
      alert('用户或密码不能为空');
    } else {
      const socket = io('http://localhost:8000', {
        query: {
          account
        }
      });
      socket
        .on('error', err => {
          alert(err);
          socket.close();
          localStorage.clear();
          dispatch(actionCreators.logout());
        })
        .on('connect', () => {
          console.log('connect callback');
        })
      dispatch(actionCreators.login({
        account,
        password,
        socket
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
