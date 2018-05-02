import React from 'react'
import { connect } from 'react-redux'

import './playlist.scss'

// Actions
import { fetchUserRequest } from '../../redux/actions'

class Playlist extends React.Component {
  render() {

    const trackItem = (
      <div>Track</div>
    )

    const artistItem = (
      <div>Artist</div>
    )

    return (
      <div className="playlist">
        {this.props.playlist.map((item) => {
          return(
            <div>
              {item.get('type') === 'track' && trackItem }
              {item.get('type') === 'artist' && artistItem }
            </div>
          )
        })}
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  playlist: state.get('playlist'),
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  fetchUserDetails: () => dispatch(fetchUserRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
