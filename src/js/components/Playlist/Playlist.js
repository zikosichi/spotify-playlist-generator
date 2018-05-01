import React from 'react'

import { connect } from 'react-redux'

// Actions
import { fetchUserRequest } from '../redux/actions'

class App extends React.Component {
  render() {
    return (
      <div className="container">
        This is Playlist
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  isFetchingUser: state.get('isFetchingUser'),
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  fetchUserDetails: () => dispatch(fetchUserRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App))
