import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import micIcon from '../../../../../../assets/icons/music-player.svg'
import playIcon from '../../../../../../assets/icons/play-button-icon.svg'
import stopIcon from '../../../../../../assets/icons/stop.svg'
import './result-avatar.scss';

// Actions
import { updateFieldValue } from '../../../../../redux/actions'

class ResultsAvatar extends React.Component {
  constructor(props) {
    super(props)

    this.handleTogglePlay = this.handleTogglePlay.bind(this)
  }

  // On play click
  handleTogglePlay() {
    if (this.props.currentlyPlayedPreviewUrl === this.props.item.preview_url) {
      this.props.updateFieldValue('currentlyPlayedPreviewUrl', null);
    } else {
      this.props.updateFieldValue('currentlyPlayedPreviewUrl', this.props.item.preview_url);
    }
  }

  // Stop preview on component destroy
  componentWillUnmount() {
    if (this.props.currentlyPlayedPreviewUrl === this.props.item.preview_url) {
      this.props.updateFieldValue('currentlyPlayedPreviewUrl', null);
    }
  }

  render() {
    const item = this.props.item
    const images = item.images ? item.images : item.album.images
    const avatar = images[0] ? images[0].url : null

    const playBtn = (
      <div className="avatar-box__play"
           onClick={this.handleTogglePlay}>
        {
          this.props.currentlyPlayedPreviewUrl === this.props.item.preview_url ?
          <img className="avatar-box__play--stop" src={stopIcon} /> :
          <img className="avatar-box__play--play" src={playIcon} />
        }
      </div>
    )

    return (
      <div className={'avatar-box ' + (item.type === 'track' ? 'avatar-box--round' : '')}>
        <img src={avatar || micIcon}
          className="avatar" />
        {item.preview_url && playBtn}
      </div>
    )
  }
}

ResultsAvatar.propTypes = {
  item: PropTypes.object.isRequired
};

// Map reducer props
const mapStateToProps = state => ({
  currentlyPlayedPreviewUrl: state.get('currentlyPlayedPreviewUrl')
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value) => dispatch(updateFieldValue(field, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultsAvatar)