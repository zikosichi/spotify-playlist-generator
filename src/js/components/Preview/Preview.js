import React from 'react'

import { connect } from 'react-redux'
import { Play, StopCircle } from 'react-feather';

// Actions
import { updateFieldValue } from '../../redux/actions'

// Styles
import './preview.scss'

class Preview extends React.Component {
  constructor(props) {
    super(props)

    this.handlePlay = this.handlePlay.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }

  // Play on mouseover
  handlePlay() {
    this.props.updateFieldValue('currentlyPlayedUrl', this.props.previewUrl);
  }

  // Stop on mouseleave
  handleStop() {
    this.props.updateFieldValue('currentlyPlayedUrl', null);
  }

  // Stop preview on component destroy
  componentWillUnmount() {
    if (this.props.currentlyPlayedUrl === this.props.previewUrl) {
      this.props.updateFieldValue('currentlyPlayedUrl', null);
    }
  }

  render() {
    const playBtn = (
      <div className="preview"
           onMouseEnter={this.handlePlay}
           onMouseLeave={this.handleStop}>
        {
          this.props.currentlyPlayedUrl === this.props.previewUrl ?
          <StopCircle size={20}></StopCircle> :
          <Play size={20}></Play>
        }
      </div>
    )

    return playBtn //this.props.previewUrl
  }
}

// Map reducer props
const mapStateToProps = state => ({
  currentlyPlayedUrl: state.get('currentlyPlayedUrl'),
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value) => dispatch(updateFieldValue(field, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
