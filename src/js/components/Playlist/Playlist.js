import React from 'react'
import { connect } from 'react-redux'
import magic from '../../../assets/icons/magic-wand.svg'

// Styles
import './playlist.scss'

// Components
import ResultAvatar from '../SearchBox/ResultsList/ResultItem/ResultAvatar/ResultAvatar';

// Actions
import { getSuggestionsRequest } from '../../redux/actions'

class Playlist extends React.Component {
  render() {

    const trackArtists = (item) => {
      return item.get('artists').toJS().map(a => a.name).join(', ')
    }

    const trackItem = (item) => (
      <div className="playlist__item">
        <ResultAvatar item={item.toJS()}/>
        <div className="playlist__item__content">
          <h3 className="playlist__item__content__title">
            {item.get('name')}
          </h3>
          <p className="playlist__item__content__sub-title">
            {item.get('type') === 'track' ? trackArtists(item) : 'Artist'}
          </p>
        </div>

        <div className="playlist__item__actions">
          <button className="playlist__item__action"
                  onClick={() => this.props.getSuggestionsRequest(item)}>
            <img src={magic}/>
          </button>
        </div>
      </div>
    )

    return (
      <div className="playlist">
        {this.props.playlist.map((item) => {
          return(
            <div key={item.get('id')}>
              {trackItem(item)}
              {/* <div><pre>{JSON.stringify(item, null, 2) }</pre></div> */}
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
  getSuggestionsRequest: (payload) => dispatch(getSuggestionsRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
