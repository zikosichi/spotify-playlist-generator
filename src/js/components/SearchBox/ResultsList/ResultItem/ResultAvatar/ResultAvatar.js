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
    if (this.props.currentlyPlayedUrl === this.props.item.preview_url) {
      this.props.updateFieldValue('currentlyPlayedUrl', null);
    } else {
      this.props.updateFieldValue('currentlyPlayedUrl', this.props.item.preview_url);
    }
  }

  // Stop preview on component destroy
  componentWillUnmount() {
    if (this.props.currentlyPlayedUrl === this.props.item.preview_url) {
      this.props.updateFieldValue('currentlyPlayedUrl', null);
    }
  }

  render() {
    const item = this.props.item
    const images = item.images ? item.images : item.album.images
    const avatar = images[0] ? images[0].url : null

    const playBtn = (
      <div className="avatar-box__play">
        {
          this.props.currentlyPlayedUrl === this.props.item.preview_url ?
          <i className="fa fa-stop avatar-box__play--stop"></i> :
          <i className="fa fa-play avatar-box__play--play"></i>
        }
      </div>
    )

    return (
      <div className={'avatar-box ' + (item.type === 'track' ? 'avatar-box--round' : '')}
           onMouseEnter={this.handleTogglePlay}
           onMouseLeave={this.handleTogglePlay}>
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
  currentlyPlayedUrl: state.get('currentlyPlayedUrl')
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value) => dispatch(updateFieldValue(field, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultsAvatar)