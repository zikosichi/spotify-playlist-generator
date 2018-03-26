import React from 'react';
import PropTypes from 'prop-types';
import micIcon from '../../../../../../assets/icons/music-player.svg'
import playIcon from '../../../../../../assets/icons/play-button-icon.svg'
import stopIcon from '../../../../../../assets/icons/stop.svg'
import './result-avatar.scss';

class ResultsAvatar extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    if (this.props.currentlyPlaying === this.props.id) {
      this.props.onDestroy()
    }
  }

  render() {
    const playBtn = (
      <div className="avatar-box__play"
        onClick={this.props.togglePlay}>
        {
          this.props.currentlyPlaying === this.props.id ?
          <img className="avatar-box__play--stop" src={stopIcon} /> :
          <img className="avatar-box__play--play" src={playIcon} />
        }
      </div>
    )

    return (
      <div className={'avatar-box ' + (this.props.type === 'track' ? 'avatar-box--round' : '')}>
        <img src={this.props.avatarUrl || micIcon}
          className="avatar" />
        {this.props.previewUrl && playBtn}
      </div>
    )
  }
}

export default ResultsAvatar;

ResultsAvatar.propTypes = {
  avatarUrl: PropTypes.string,
  previewUrl: PropTypes.string,
  currentlyPlaying: PropTypes.string,
  type: PropTypes.string,
  togglePlay: PropTypes.func,
  id: PropTypes.string,
  onDestroy: PropTypes.func
};
