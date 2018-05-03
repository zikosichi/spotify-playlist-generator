import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import micIcon from '../../../../../../assets/icons/music-player.svg'
import './result-avatar.scss';

// Actions
import { updateFieldValue } from '../../../../../redux/actions'

// Components
import Preview from '../../../../Preview/Preview'

class ResultsAvatar extends React.Component {

  render() {
    const item = this.props.item
    const images = item.images ? item.images : item.album.images
    const avatar = images[0] ? images[0].url : null

    return (
      <div className={'avatar-box ' + (item.type === 'track' ? 'avatar-box--round' : '')}
           onMouseEnter={this.handleTogglePlay}
           onMouseLeave={this.handleTogglePlay}>
        <img src={avatar || micIcon}
             className="avatar" />
      </div>
    )
  }
}

ResultsAvatar.propTypes = {
  item: PropTypes.object.isRequired
};

export default ResultsAvatar