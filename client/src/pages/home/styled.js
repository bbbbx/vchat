import styled from 'styled-components';

export const HomeWrapper = styled.main`
  display: flex;
  margin: 0 12%;
  height: 100%;
  border-radius: 3px;
  // background: yellowgreen;
`;

export const HomeLeft = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  border-radius: inherit;
  background: rgb(46, 50, 56);
`;

export const UserinfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  color: white;
  border-top-left-radius: inherit;
  .avatar {
    flex: 1;
  }
  .info {
    flex: 3;
    display: flex;
    .nickname {
      flex: 4;
    }
    .setting {
      flex: 1;
    }
  }
`;

export const ChatlistWrapper = styled.div`
  flex: 4;
  // background: #343434;
  overflow: auto;
`;

export const ChatRoomWrapper = styled.div`
  height: 64px;
  background: red;
`;

export const HomeRight = styled.div`
  flex: 5;
  // background: red;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  flex: 5;
  overflow: auto;
`;

export const InputWrapper = styled.div`
  flex: 2;
`;

export const Button = styled.button`

`;

export const Input = styled.input`

`;
