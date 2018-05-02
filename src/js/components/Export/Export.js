import React from 'react'

import { connect } from 'react-redux'

import { updateFieldValue, createPlaylistRequest } from '../../redux/actions'

class Export extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.props.updateFieldValue('playlistName', e.target.value)
  }

  handleSubmit() {
    const { user, playlistName, playlist } = this.props
    this.props.createPlaylistRequest({
      id: user.get('id'),
      name: playlistName,
      playlist: playlist.toJS(),
    })
  }

  render() {
    return (
      <div className="container">
        <input type="text"
               value={this.props.playlistName}
               onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>
          Export
        </button>
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  user: state.get('user'),
  playlistName: state.get('playlistName'),
  playlist: state.get('playlist'),
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  updateFieldValue: (field, value) => dispatch(updateFieldValue(field, value)),
  createPlaylistRequest: (payload) => dispatch(createPlaylistRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Export)
