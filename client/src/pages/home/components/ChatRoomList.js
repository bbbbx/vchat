import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ChatlistWrapper
} from '../styled';
import ChatRoom from './ChatRoom';

class ChatRoomList extends PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  render() {
    const { list } = this.props;
    return (
      <ChatlistWrapper>
        {
          list.map((item, index) => (
            <ChatRoom nickname={item} key={item} account={list[index]} />
          ))
        }
      </ChatlistWrapper>
    );
  }
}

// ChatRoomList.propTypes = {
//   list: PropTypes.arrayOf(PropTypes.string).isRequired
// };

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps, null)(ChatRoomList);
