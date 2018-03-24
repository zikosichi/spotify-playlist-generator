import React from 'react'
import PropTypes from 'prop-types'
import ResultItem from './ResultItem/ResultItem'
import './results-list.scss'

class ResultsList extends React.Component {
  render() {
    const loadMore = (
      <div className="show-more">
        Show More...
      </div>
    )

    return (
      <div>
        <div className="results-list">
          {this.props.data.items && this.props.data.items.map((tab) =>
            <ResultItem key={tab.id} />
          )}
        </div>
        {this.props.data.next && loadMore}
      </div>
    )
  }
}

export default ResultsList;

ResultsList.propTypes = {
  data: PropTypes.object
}
