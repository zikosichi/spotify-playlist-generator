import React from 'react'
import { hot } from 'react-hot-loader'
import spotifyApi from 'utils/spotify'
import initInterceptor from 'utils/interceptor'

import { connect } from 'react-redux'

// Styles
import './app.scss'

// Actions
import { fetchUserRequest } from '../redux/actions'

// Components
import SearchBox from './SearchBox/SearchBox'
import Playlist from './Playlist/Playlist'

// Assets
import logoIcon from '../../assets/icons/play-button.svg'

class App extends React.Component {
  componentDidMount() {
    initInterceptor()
    this.getUserDetails()
  }

  getUserDetails() {
    this.props.fetchUserDetails()
  }

  render() {
    const logo = (
      <div className="app__logo">
        <img src={logoIcon}
             className="app__logo__img"/>
        Playlist Generator
      </div>
    )

    const user = (
      <div className="app__user">
        Hey, {this.props.user ? this.props.user.get('display_name') : ''}
      </div>
    )

    return (
      <div className="app">
        <header className="app__header">
          <div className="container">
            <div className="app__topbar">
              {logo}
              {user}
            </div>
            <div className="search-box">
              <SearchBox></SearchBox>
            </div>
          </div>
        </header>
        <div className="container">
          <Playlist></Playlist>
        </div>
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
