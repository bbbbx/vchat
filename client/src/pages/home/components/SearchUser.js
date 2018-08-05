import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  SearchWrapper
} from '../styled';
import { actionCreators as homeActionCreators } from '../store';
import { actionCreators as loginActionCreators } from '../../login/store';

class SearchUser extends PureComponent {
  componentDidMount() {
    const { toggleShowSearchUsers } = this.props;
    document.addEventListener('click', e => {
      e.target !== this.searchDOM && toggleShowSearchUsers(false);
    });
  }

  renderSearchedUsers() {
    const { token, account, friends, showSearchUsers, searchedUsers, handleAddFriend } = this.props;
    if (showSearchUsers && searchedUsers.length !== 0) {
      return searchedUsers.map(searchedUser => (
        <div key={searchedUser.account} className='user'>
          <img className='avatar' alt={searchedUser.avatarURL} src={searchedUser.avatarURL} />
          <div className='user-info'>
            <p className='info'>{searchedUser.username}</p>
            <p className='info account'>{searchedUser.account}</p>
          </div>
          {
            // friends.includes(searchedUser.account)
            friends.some(friend => friend.account === searchedUser.account)
              ? <button 
                  className='btn btn-disable'
                  disabled={true}
                >
                  已添加
                </button>
              : searchedUser.account === account
                  ? <button 
                      className='btn btn-disable'
                      disabled={true}
                    >
                      不能添加自己
                    </button>
                  : <button 
                      className='btn btn-success'
                      onClick={() => handleAddFriend(token, account, searchedUser.account)}
                    >
                      添加好友
                    </button>
          }
        </div>
      ));
    } else if (showSearchUsers && searchedUsers.length === 0) {
      return (
        <div className='user'>
          <div className='user-info'>
            <h4 className='not-match'>查无此人</h4>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { token, toggleShowSearchUsers, handleSearchChange } = this.props;
    return (
      <SearchWrapper>
        <input 
          ref={DOM => this.searchDOM = DOM}
          className='searchbox'  
          placeholder='🔍搜索' 
          onFocus={() => toggleShowSearchUsers(true)}
          onChange={() => handleSearchChange(token, this.searchDOM)}
        /> 
        <div className='searched-users'>
          {this.renderSearchedUsers()}
        </div>
        }
      </SearchWrapper>
    )
  }
}

const mapStateToProps = state => ({
  token: state.login.token,
  account: state.login.account,
  friends: state.login.friends,
  showSearchUsers: state.home.showSearchUsers,
  searchedUsers: state.home.searchedUsers
});

const mapDispatchToProps = dispatch => ({
  toggleShowSearchUsers(show) {
    dispatch(homeActionCreators.toggleShowSearchUsers(show));
  },
  handleSearchChange(token, searchDOM) {
    console.log(searchDOM.value);
    if (!searchDOM.value.trim()) {
      return ;
    }
    dispatch(homeActionCreators.getUsers(token, searchDOM.value));
  },
  handleAddFriend(token, account, friend) {
    if (window.confirm('确定添加吗？')) {
      console.log(token, account, friend);
      dispatch(loginActionCreators.addFriend(token, account, friend));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
