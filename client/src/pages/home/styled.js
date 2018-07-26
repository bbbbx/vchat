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
    padding: 20px 10px;
    img {
      width: 40px;
      border-radius: 3px;
    }
  }
  .info {
    flex: 5;
    display: flex;
    .nickname {
      flex: 4;
    }
    .setting {
      flex: 1;
      padding-top: 20px;
      cursor: pointer;
    }
  }
`;

export const ChatlistWrapper = styled.div`
  flex: 4;
  overflow: auto;
`;

export const ChatRoomWrapper = styled.div`
  overflow: hidden;
  padding: 12px 18px 11px;
  border-bottom: 1px solid #292c33;
  position: relative;
  cursor: pointer;
  height: 64px;
  color: white;
  .avatar {
    float: left;
    margin-right: 10px;
    position: relative;
    img {
      width: 40px;
      border-radius: 3px;
    }
  }
  .info {
    overflow: hidden;
    .nickname {
      overflow: hidden;
      margin: 0;
      font-weight: 400;
      font-size: 13px;
      color: #fff;
      line-height: 20px;
      .nickname-text {
        max-width: 200px;
        display: inline-block;
        vertical-align: top;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
    }
  }
`;

export const HomeRight = styled.div`
  flex: 5;
  // background: red;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  flex: 5;
`;

export const MessageList = styled.ul`
  overflow: auto;
`;

export const InputWrapper = styled.div`
  flex: 2;
`;

export const Button = styled.button`

`;

export const Input = styled.input`

`;
