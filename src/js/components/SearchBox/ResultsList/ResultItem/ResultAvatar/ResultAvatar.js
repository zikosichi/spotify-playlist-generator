import React from 'react';
import PropTypes from 'prop-types';
import micIcon from '../../../../../../assets/icons/music-player.svg'
import './result-avatar.scss';

class ResultsAvatar extends React.Component {
  render() {
    return (
      <div className="avatar-box">
        <img src={this.props.avatarUrl || micIcon}
             className="avatar"/>
      </div>
    )
  }
}

export default ResultsAvatar;

ResultsAvatar.propTypes = {
  avatarUrl: PropTypes.string
};