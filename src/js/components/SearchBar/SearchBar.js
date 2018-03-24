import React from 'react';
import searchIcon from '../../../assets/icons/search-icon.svg';

// Styles
import './search-bar.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form className="d-flex search-bar">
        <div className="input-group search-bar__input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <img src={searchIcon}/>
            </span>
          </div>
          <input type="text"
            className="form-control search-bar__input" />
        </div>
        <button type="submit"
          className="btn btn-success ml-3 search-bar__btn">
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;