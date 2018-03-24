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
          {this.props.resultItems && this.props.resultItems.map((tab) =>
            <ResultItem key={tab.id} />
          )}
        </div>
        {this.props.showLoadMore && loadMore}
      </div>
    )
  }
}

export default ResultsList;

ResultsList.propTypes = {
  resultItems: PropTypes.array,
  showLoadMore: PropTypes.bool,
  onShowMore: PropTypes.func
}
