import React from 'react';
import ResultItem from './ResultItem/ResultItem';

class ResultsList extends React.Component {
  render() {
    return (
      <div>
        <ResultItem />
        <ResultItem />
        <ResultItem />
        <ResultItem />
      </div>
    )
  }
}

export default ResultsList;