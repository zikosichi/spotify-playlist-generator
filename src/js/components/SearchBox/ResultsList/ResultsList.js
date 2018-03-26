import React from 'react'
import PropTypes from 'prop-types'
import ResultItem from './ResultItem/ResultItem'
import AudioPlayer from '../../../utils/audioPlayer'
import './results-list.scss'

class ResultsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentlyPlaying: null
    }

    this.handleShowMore = this.handleShowMore.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handleDestroy = this.handleDestroy.bind(this)
  }

  // On show more click
  handleShowMore(e) {
    this.props.onShowMore(this.props.resultItems.next)
  }

  // On item destroy
  handleDestroy(e) {
    AudioPlayer.stopAudio()
    this.setState({
      currentlyPlaying: null
    })
  }

  // Handle preview play
  handlePlay(previewUrl, id) {
    if (this.state.currentlyPlaying !== id) {
      AudioPlayer.playAudio(previewUrl)
      this.setState({
        currentlyPlaying: id
      })
    } else {
      AudioPlayer.stopAudio()
      this.setState({
        currentlyPlaying: null
      })
    }
  }

  // Parse image url
  parseImageUrl(item) {
    return this.props.type === 'track'
      ? item.album && item.album.images && item.album.images[0] ? item.album.images[0].url : ''
      : item.images && item.images[0] ? item.images[0].url : ''
  }

  render() {
    const loadMore = (
      <div className="show-more"
        onClick={this.handleShowMore}>
        Show More...
      </div>
    )

    return (
      <div>
        <div className="results-list">
          {this.props.resultItems && this.props.resultItems.map((item) => {

            const images = this.props.type === 'track' ?
              item.album ? item.album.images : null : item.images
            const avatarUrl = images && images[0] ? images[0].url : ''
            const previewUrl = item.preview_url || null;

            return (
              <ResultItem key={item.id}
                id={item.id}
                title={item.name}
                subTitle={item.album ? item.album.name : this.props.type}
                avatarUrl={avatarUrl}
                previewUrl={previewUrl}
                currentlyPlaying={this.state.currentlyPlaying}
                onDestroy={this.handleDestroy}
                togglePlay={() => this.handlePlay(previewUrl, item.id)}
                type={this.props.type}
                />
            )
          }
          )}
        </div>
        {this.props.showLoadMore && loadMore}
      </div>
    )
  }
}

export default ResultsList;

ResultsList.propTypes = {
  type: PropTypes.string.isRequired,
  resultItems: PropTypes.array.isRequired,
  showLoadMore: PropTypes.bool,
  onShowMore: PropTypes.func
}
