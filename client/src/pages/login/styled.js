import styled, { keyframes } from 'styled-components';

const rotateY = keyframes`
  from {
    transform: rotatey(-180deg);
    opacity: .3;
  }

  to {
    transform: perspective(1000px) rotatey(0deg);
    opacity: 1;
  }
`;

const rotateYReverse = keyframes`
  from {
    transform: rotatey(-180deg);
    opacity: .3;
  }

  to {
    transform: perspective(1000px) rotatey(0deg);
    opacity: 1;
  }
`;

export const LoginWrapper = styled.section`
  margin: 0;
  padding: 0 30vw;
  height: 100%;
  background: #eee;
  display: flex;

  @media (max-width: 720px) {
    padding: 0 10vw;
  }
`;

export const LoginBox = styled.div`
  margin: 3em 0;
  padding: 2em 2em;
  flex: 1;
  background: #333;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  box-shadow: 0 0 25px black;
  animation: ${rotateY} 1s linear;
`;

export const RegisterBox = styled.div`
  margin: 3em 0;
  padding: 2em 2em;
  flex: 1;
  background: #333;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  box-shadow: 0 0 25px black;
  animation: ${rotateYReverse} 1s linear;
`;

export const Input = styled.input`
  margin: .3em 0;
  flex: 1;
  font-size: 1.5em;
  border: 0;
  border-radius: 1em;
`;

export const LinkWrapper = styled.div`
  margin: 1.5em 0 0;
  flex: 1;
  flex-direction: row;
  font-size: 1.1em;
  a {
    margin: 0 .5em;
    flex: 1;
    color: white;
    cursor: pointer;
  }
  a:hover {
    box-shadow: 0 1px 0 #0366d6;
  }
  a.register {
    float: left;
  }
  a.forget-password {
    float: right;
  }
`;

export const Button = styled.button`
  margin: 1.5em 0 0;
  flex: 1;
  background: yellowgreen;
  border: 0;
  border-radius: 2em;
  font-size: 1.2em;
  cursor: pointer;
  &.login {
    font-size: 1.5em;
  }
  &.register {
    flex: 2;
  }
  &.back-to-login {
    margin: 1em 0;
    background-color: white;
    color: #333;
    font-size: 1em;
  }
`;

export const Title = styled.h1`
  transition: color .5s;
  font-size: 3em;
  margin: 2em 0 .5em;
  text-align: center;
  color: white;
  &.message {
    color: #d73a49;
  }
`;

export const Loading = styled.div`
  position: fixed;
  width: 200px;
  height: 200px;
  line-height: 200px;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
  background: white;
  border: 1px solid #ccc;
  border-radius: .2em;
  box-shadow: 0 0 0 50vmax rgba(51, 51, 51, .8);
  text-align: center;
  font-size: 2em;
`;