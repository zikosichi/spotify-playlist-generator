import React from 'react';
import PropTypes from 'prop-types';
import micIcon from '../../../../../../assets/icons/music-player.svg'
import playIcon from '../../../../../../assets/icons/play-button-icon.svg'
import AudioPlayer from '../../../../../utils/audioPlayer'
import './result-avatar.scss';

class ResultsAvatar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentlyPlayed: ''
    }

    // Bind events
    this.handlePlay = this.handlePlay.bind(this)
  }

  handlePlay() {
    this.setState({
      isPlaying: true
    })

    AudioPlayer.playAudio(this.props.previewUrl)
  }

  componentWillUnmount() {
    AudioPlayer.stopAudio()
  }

  render() {
    const playBtn = (
      <div className="avatar-box__play"
        onClick={this.handlePlay}>
        <img src={playIcon} />
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
  type: PropTypes.string
};
