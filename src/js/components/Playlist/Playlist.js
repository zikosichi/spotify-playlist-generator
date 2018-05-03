import React from 'react'
import { connect } from 'react-redux'
import { Trash, Radio, Edit } from 'react-feather';

// Styles
import './playlist.scss'

// Images
import magic from '../../../assets/icons/magic-wand.svg'
import rock from '../../../assets/icons/rock.svg'
import singer from '../../../assets/icons/singer.svg'
import radio from '../../../assets/icons/radio.svg'
import exportIcon from '../../../assets/icons/export.svg'

// Components
import ResultAvatar from '../SearchBox/ResultsList/ResultItem/ResultAvatar/ResultAvatar';
import Preview from '../Preview/Preview';
import Export from '../Export/Export';

// Actions
import { updateFieldValue, getSuggestionsRequest, removePlaylistItem } from '../../redux/actions'

class Playlist extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.updateFieldValue('playlistName', e.target.value)
  }

  render() {

    const trackArtists = (item) => {
      return item.get('artists').toJS().map(a => a.name).join(', ')
    }

    const trackItem = (item) => (
      <div className={`playlist__item playlist__item--${item.get('type')}`}>
        <ResultAvatar item={item.toJS()}/>
        <div className="playlist__item__content">
          <a className="playlist__item__content__title"
             target="_blank"
             href={item.getIn(['external_urls', 'spotify'])}>
            {item.get('name')}
          </a>
          <p className="playlist__item__content__sub-title">
            {item.get('type') === 'track' ? trackArtists(item) : 'Artist'}
          </p>
        </div>

        <div className="playlist__item__actions">
          {item.get('preview_url') && (
            <button className="playlist__item__action">
              <Preview previewUrl={item.get('preview_url')}></Preview>
            </button>
          )}
          <button className={`playlist__item__action playlist__item__action--magic ${this.props.playlist.size === 1 ? 'tooltip-visible' : ''}`}
                  onClick={() => this.props.getSuggestionsRequest(item)}
                  data-tooltip="Click here to expand">
            <Radio size={20}></Radio>
          </button>
          <button className="playlist__item__action playlist__item__action--remove"
                  onClick={() => this.props.removePlaylistItem(item.get('id'))}>
            <Trash size={20}></Trash>
          </button>
        </div>
      </div>
    )

    const empty = (
      <div>
        <div className="empty">
          <img className="empty__img" src={rock}/>
          <p className="empty__text">
            Start search up there
          </p>
        </div>

        <div className="info">
          <div className="row">
            <div className="col info__col">
              <img src={singer}
                   className="info__img"/>
              <p className="info__text">
                <b className="text-primary">1. </b>
                Search for your favorite songs or artist and select
              </p>
            </div>
            <div className="col info__col">
              <img src={radio}
                   className="info__img"/>
              <p className="info__text">
                <b className="text-primary">2. </b>
                Click the magic button that will populate the list
              </p>
            </div>
            <div className="col info__col">
              <img src={exportIcon}
                   className="info__img"/>
              <p className="info__text">
                <b className="text-primary">3. </b>
                Set the name of playlist and click "Export to Spotify"
              </p>
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <div>
        {this.props.playlist.size === 0 && empty}
        <div className="playlist">
          {this.props.playlist.size > 0 && (
            <div className="playlist__header">
              <div className="playlist__title">
                <Edit size={15} color="#E5E7E8"></Edit>
                <input type="text"
                      className="ml-2"
                      value={this.props.playlistName}
                      onChange={this.handleChange} />
              </div>
              <div className="playlist__export">
                <Export></Export>
              </div>
            </div>
          )}

          {this.props.playlist.map((item) => {
            return(
              <div key={item.get('id')}>
                {trackItem(item)}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

// Map reducer props
const mapStateToProps = state => ({
  playlist: state.get('playlist'),
  playlistName: state.get('playlistName'),
})

// Map reducer methods
const mapDispatchToProps = dispatch => ({
  getSuggestionsRequest: (payload) => dispatch(getSuggestionsRequest(payload)),
  removePlaylistItem: (payload) => dispatch(removePlaylistItem(payload)),
  updateFieldValue: (field, value) => dispatch(updateFieldValue(field, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
