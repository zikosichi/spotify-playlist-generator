import React from 'react';
import PropTypes from 'prop-types';
import './result-avatar.scss';

class ResultsAvatar extends React.Component {
  render() {
    return (
      <div className="avatar-box">
        <img src={this.props.avatarUrl}
             className="avatar"/>
      </div>
    )
  }
}

export default ResultsAvatar;

ResultsAvatar.propTypes = {
  avatarUrl: PropTypes.string
};