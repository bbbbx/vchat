import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  SearchWrapper
} from '../styled';
import { actionCreators } from '../store';

class SearchUser extends PureComponent {
  componentDidMount() {
    const { toggleShowSearchUsers } = this.props;
    document.addEventListener('click', e => {
      e.target !== this.searchDOM && toggleShowSearchUsers(false);
    });
  }

  renderSearchedUsers() {
    const { token, account, showSearchUsers, searchedUsers, handleAddFriend } = this.props;
    if (showSearchUsers && searchedUsers.length !== 0) {
      return searchedUsers.map(item => (
        <div key={item.account} className='user'>
          <img className='avatar' alt={item.avatarURL} src={item.avatarURL} />
          <div className='user-info'>
            <p className='info'>{item.username}</p>
            <p className='info account'>{item.account}</p>
          </div>
          <button 
            className='btn-success'
            onClick={() => handleAddFriend(token, account, item.account)}
          >
            添加好友
          </button>
        </div>
      ));
    } else if (showSearchUsers && searchedUsers.length === 0) {
      return (
        <div className='user'>
          <div className='user-info'>
            <p>查无此人</p>
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
          onChange={() => handleSearchChange(token, this.searchDOM)} /> 
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
  showSearchUsers: state.home.showSearchUsers,
  searchedUsers: state.home.searchedUsers
});

const mapDispatchToProps = dispatch => ({
  toggleShowSearchUsers(show) {
    dispatch(actionCreators.toggleShowSearchUsers(show));
  },
  handleSearchChange(token, searchDOM) {
    console.log(searchDOM.value);
    if (!searchDOM.value.trim()) {
      return ;
    }
    dispatch(actionCreators.getUsers(token, searchDOM.value));
  },
  handleAddFriend(token, account, friend) {
    if (window.confirm('确定添加吗？')) {
      console.log(token, account, friend);
      axios
        .patch('http://localhost:8000/api/user/friend', {
          token,
          account,
          friend
        })
        .then((({ data }) => {
          console.log(data);
          if (data.code === 0) {
            // [TODO] 更新本地 state.login.friends
            alert('添加成功');
          } else {
            alert(data.message);
          }
        }));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
