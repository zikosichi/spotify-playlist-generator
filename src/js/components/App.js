import React from 'react'
import { hot } from 'react-hot-loader'
import spotifyApi from 'utils/spotify'
import initInterceptor from 'utils/interceptor'

import { connect } from 'react-redux'

// Actions
import { fetchUserRequest } from '../redux/actions'

// Components
import SearchBox from './SearchBox/SearchBox'
import Playlist from './Playlist/Playlist'

class App extends React.Component {
  componentDidMount() {
    initInterceptor()
    this.getUserDetails()
  }

  getUserDetails() {
    this.props.fetchUserDetails()
  }

  render() {
    return (
      <div className="container">
        {/* {this.props.user ? this.props.user.get('display_name') : ''} */}
        <SearchBox></SearchBox>
        <Playlist></Playlist>
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  isFetchingUser: state.get('isFetchingUser'),
  user: state.get('user')
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  fetchUserDetails: () => dispatch(fetchUserRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App))
