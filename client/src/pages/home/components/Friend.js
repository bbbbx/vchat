import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  FriendWrapper
} from '../styled';

class Friend extends PureComponent {
  render() {
    const { selectedFriend } = this.props;
    return (
      <FriendWrapper>
        {
          selectedFriend
            ? <div>{selectedFriend}</div>
            : <div>未选择</div>
        }
      </FriendWrapper>
    );
  }
}

const mapStateToProps = state => ({
  selectedFriend: state.home.selectedFriend
});

export default connect(mapStateToProps)(Friend);
