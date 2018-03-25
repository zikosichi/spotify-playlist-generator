import React from 'react'
import PropTypes from 'prop-types'
import ResultItem from './ResultItem/ResultItem'
import './results-list.scss'

class ResultsList extends React.Component {
  constructor(props) {
    super(props)
    this.handleShowMore = this.handleShowMore.bind(this)
  }

  // On show more click
  handleShowMore(e) {
    this.props.onShowMore(this.props.resultItems.next)
  }

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
                title={item.name}
                subTitle={item.album ? item.album.name : this.props.type}
                avatarUrl={avatarUrl}
                previewUrl={previewUrl}
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
  type: PropTypes.string,
  resultItems: PropTypes.array,
  showLoadMore: PropTypes.bool,
  onShowMore: PropTypes.func
}
