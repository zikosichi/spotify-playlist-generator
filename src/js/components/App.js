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
      <div className={`app ${this.props.playlist.size === 0 && ' app--empty'}`}>
        <header className="app__header">
          <div className="container app__header__container">
            <div className="app__topbar row">
              <div className="col">
                {logo}
              </div>
              <div className="col-12 col-sm-auto">
                {user}
              </div>
            </div>
            <div className="search-box">
              <SearchBox></SearchBox>
            </div>
          </div>
          <div className="app__header__pattern"></div>
        </header>
        <div className="app__playlist container">
          <Playlist></Playlist>
        </div>
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  isFetchingUser: state.get('isFetchingUser'),
  user: state.get('user'),
  playlist: state.get('playlist'),
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  fetchUserDetails: () => dispatch(fetchUserRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App))
