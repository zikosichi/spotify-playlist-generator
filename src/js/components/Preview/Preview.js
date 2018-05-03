import React from 'react'

import { connect } from 'react-redux'

// Actions
import { updateFieldValue } from '../../redux/actions'

// Styles
import './preview.scss'

class Preview extends React.Component {
  constructor(props) {
    super(props)

    this.handleTogglePlay = this.handleTogglePlay.bind(this)
  }

  // On play click
  handleTogglePlay() {
    if (this.props.currentlyPlayedUrl === this.props.previewUrl) {
      this.props.updateFieldValue('currentlyPlayedUrl', null);
    } else {
      this.props.updateFieldValue('currentlyPlayedUrl', this.props.previewUrl);
    }
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
           onMouseEnter={this.handleTogglePlay}
           onMouseLeave={this.handleTogglePlay}>
        {
          this.props.currentlyPlayedUrl === this.props.previewUrl ?
          <i className="fa fa-stop preview__btn"></i> :
          <i className="fa fa-play preview__btn"></i>
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
