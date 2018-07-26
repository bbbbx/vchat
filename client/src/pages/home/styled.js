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
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background-color: #eee;
  height: 100%;
  .title {
    // width: 100%;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #d6d6d6;
    z-index: 1024;
    padding: 10px 0;
    margin: 0 19px;
    line-height: 30px;
    font-weight: 400;
    height: 25px;
    font-size: 14px;
  }
`;

export const ContentWrapper = styled.ul`
  flex: 5;
  position: absolute;
  margin: 0;
  padding: 0 19px;
  top: 45px;
  bottom: 180px;
  right: 0;
  left: 0;
  overflow: auto;
  li {
    list-style: none;
  }
`;

export const InputWrapper = styled.div`
  flex: 2;
  height: 180px;
  margin-right: 19px;
  border-top: 1px solid #d6d6d6;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const Button = styled.button`

`;

export const Input = styled.input`

`;
