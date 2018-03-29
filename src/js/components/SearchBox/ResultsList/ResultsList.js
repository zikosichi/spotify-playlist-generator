import React from 'react'
import PropTypes from 'prop-types'
import ResultItem from './ResultItem/ResultItem'
import { connect } from 'react-redux'
import './results-list.scss'

class ResultsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentlyPlaying: null
    }

    this.handleShowMore = this.handleShowMore.bind(this)
  }

  // On show more click
  handleShowMore(e) {
    this.props.onShowMore(this.props.resultItems.next)
  }

  render() {
    const loadMore = (
      <div className="show-more"
        onClick={this.handleShowMore}>
        Show More...
      </div>
    )

    const noResultContent = (
      <div className="search-result__no-content">
        No results found
      </div>
    )

    const loadingContent = (
      <div className="search-result__no-content">
        Loading...
      </div>
    )

    return (
      <div>
        <div className="results-list">
          {this.props.resultItems.map((item) => {
            return (
              <ResultItem key={item.get('id')}
                          item={item.toJS()}/>
            )
          }
          )}
          {this.props.isFetching && loadingContent}
          {!this.props.isFetching && !this.props.resultItems.size && noResultContent}
          {this.props.nextUrl && loadMore}
        </div>
      </div>
    )
  }
}

ResultsList.propTypes = {
  onShowMore: PropTypes.func
}

// Map reducer props
const mapStateToProps = state => ({
  resultItems: state.get('items'),
  nextUrl: state.get('nextUrl'),
  isFetching: state.get('isFetching')
})

export default connect(mapStateToProps)(ResultsList)