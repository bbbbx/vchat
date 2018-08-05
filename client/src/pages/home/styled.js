import styled from 'styled-components';

export const HomeWrapper = styled.main`
  display: flex;
  margin: 0 12%;
  height: 100%;
  border-radius: 3px;
`;

export const HomeLeft = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  border-radius: inherit;
  background: rgb(46, 50, 56);
`;

export const UserinfoWrapper = styled.div`
  flex: 2;
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

export const SearchWrapper = styled.div`
  flex: 1;
  position: relative;
  .searchbox {
    display: block;
    box-sizing: border-box;
    margin-bottom: 10px;
    height: 70%;
    width: 100%;
    padding: 10px;
    font-size: 1em;
    line-height: 2em;
    border-radius: 10px;
    background-color: #26292e;
    color: white;
  }
  .searched-users {
    z-index: 10;
    position: absolute;
    background: white;
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    .user {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-top: 5px;
      margin-bottom: 5px;
      .avatar {
        flex: 1;
        padding: 5px;
        border-radius: 5px;
        width: 40px;
        height: 40px;
      }
      .user-info {
        flex: 1 1 calc(100% / 3);
        border-radius: 3px;
        .info {
          margin: 0;
          padding: 1px;
        }
        .account {
          font-size: 12px;
          color: #999;
        }
        .not-match {
          margin: 0;
          padding: 3px 9px;
          font-weight: 400;
          margin-top: 10px;
        }
      }
      .btn {
        flex: 1 1 calc(100% / 3);
        border-radius: 5px;
        margin: 5px;
        font-size: 1.2em;
        background: white;
        color: black;
      }
      .btn-success {
        background: yellowgreen;
        color: #292C33;
      }
      .btn-disable {
        background: white;
        color: #818182;
      }
    }
    .user:last-child {
      border-bottom: 0;
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
  border-bottom: 1px solid #292C33;
  position: relative;
  cursor: pointer;
  height: 64px;
  color: white;
  &.active {
    background: #3a3f45;
  }
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

export const ContentWrapper = styled.div`
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
    overflow: hidden;
    list-style: none;
    margin-bottom: 16px;
    .date {
      // display: inline-block;
      text-align: center;
      font-size: 12px;
      margin: 10px auto;
      padding: 1px 18px;
      max-width: 50%;
      color: #b2b2b2;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 2px;
      float: left;
      cursor: pointer;
    }
    .my-avatar {
      float: right;
    }
    .username {
      margin: 0;
      font-weight: 400;
      padding-left: 10px;
      font-size: 12px;
      height: 22px;
      line-height: 24px;
      color: #4f4f4f;
      width: 350px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    }
    .message {
      display: inline-block;
      position: relative;
      padding: 9px 13px;
      text-align: left;
      font-size: 14px;
      background: white;
      border-radius: 3px;
      margin-left: 15px;
    }
    .my-message {
      display: inline-block;
      position: relative;
      padding: 9px 13px;
      text-align: left;
      font-size: 14px;
      background: yellowgreen;
      border-radius: 3px;
      margin-right: 15px;
      float: right;
    }
    .message::before {
      content: '';
      width: 0;
      height: 0;
      border: 10px solid white;
      border-left-color: transparent;
      border-top-color: transparent;
      border-bottom-color: transparent;
      position: absolute;
      top: 10px;
      left: -20px;
    }
    .my-message::before {
      content: '';
      width: 0;
      height: 0;
      border: 10px solid yellowgreen;
      border-right-color: transparent;
      border-top-color: transparent;
      border-bottom-color: transparent;
      position: absolute;
      top: 10px;
      right: -20px;
    }
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
  .toolbar {
    height: 30px;
    padding: 5px 17px;
    .icon {
      font-size: 30px;
    }
  }
  .content {
    height: 100px;
    margin: 0;
    padding-left: 20px;
    border: 0;
    outline: none;
    overflow: auto;
    font-size: 14px;
  }
  .action {
    height: 30px;
    text-align: right;
    margin-top: 5px;
    .tips {
      color: #888;
      font-size: 12px;
      margin-left: 10px;
      margin-right: 7px;
      text-align: right;
    }
    .btn {
      text-decoration: none;
      background-color: #fff;
      color: #222;
      padding-left: 30px;
      padding-right: 30px;
      display: inline-block;
      border: 1px solid #c1c1c1;
      border-radius: 4px;
      padding: 3px 20px;
      font-size: 14px;
      outline: 0;
      cursor: pointer;
      text-align: right;
    }
  }
`;
