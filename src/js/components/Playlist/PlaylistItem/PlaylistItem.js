import React from 'react'
import { connect } from 'react-redux'

// Styles
import './playlist-item.scss'

// Actions
import { fetchUserRequest } from '../../redux/actions'

class PlaylistItem extends React.Component {
  render() {
    return (
      <div className="playlist">
        Playlist Item
      </div>
    )
  }
}

// Define types
ResultsList.propTypes = {
  item: PropTypes.object,
};

// Map reducer props
const mapStateToProps = state => ({
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem)
