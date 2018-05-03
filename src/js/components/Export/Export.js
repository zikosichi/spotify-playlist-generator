import React from 'react'

import { connect } from 'react-redux'

import { createPlaylistRequest } from '../../redux/actions'

// Styles
import './export.scss'

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

  tracksLength() {
    return this.props.playlist.filter(item => item.get('type') === 'track').size;
  }

  render() {
    const openBtn = (
      <a onClick={this.handleSubmit}
         href={this.props.createdPlaylist && this.props.createdPlaylist.external_urls.spotify}
         target="_blank"
         className="export__btn">
        Open in Spotify
        <i className="fas fa-external-link-alt ml-2"></i>
      </a>
    )

    const exportBtn = (
      <button onClick={this.handleSubmit}
              className="export__btn ml-2">
        Export to Spotify
        {this.props.isCreatingPlaylist && <i className="fa fa-spinner fa-spin ml-2"></i>}
      </button>
    )

    return (
      <div>
        {this.props.createdPlaylist && openBtn}
        {this.tracksLength() > 0 && exportBtn}
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  user: state.get('user'),
  playlistName: state.get('playlistName'),
  playlist: state.get('playlist'),
  isCreatingPlaylist: state.get('isCreatingPlaylist'),
  createdPlaylist: state.get('createdPlaylist'),
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  createPlaylistRequest: (payload) => dispatch(createPlaylistRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Export)
