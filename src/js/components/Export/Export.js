import React from 'react'

import { connect } from 'react-redux'

import { createPlaylistRequest } from '../../redux/actions'

class Export extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
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
      <div>
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
  createPlaylistRequest: (payload) => dispatch(createPlaylistRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Export)
