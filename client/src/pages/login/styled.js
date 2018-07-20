import styled from 'styled-components';

export const LoginWrapper = styled.section`
  margin: 0;
  padding: 0 25vw;
  height: 100%;
  background: beige;
  display: flex;
`;

export const LoginBox = styled.div`
  padding: 5em 2em;
  flex: 1;
  background: #333;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
`;

export const Input = styled.input`
  margin: .3em 0;
  flex: 1;
  font-size: 1.5em;
  border: 0;
  border-radius: 1em;
`;

export const Button = styled.button`
  margin: 2em 0;
  flex: 1;
  background: yellowgreen;
  border: 0;
  border-radius: 2em;
  font-size: 1.5em;
`;

export const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  color: white;
`;