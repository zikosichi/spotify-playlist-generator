import React from 'react';
import PropTypes from 'prop-types';

// Assets
import searchIcon from '../../../../assets/icons/search-icon.svg';

// Styles
import './search-bar.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchString: '' };

    // Bind events
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // On form submit
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.state.searchString);
  }

  // On search input change
  handleChange(e) {
    this.setState({
      searchString: e.target.value
    })
  }

  render() {
    return (
      <form className="d-flex search-bar"
        onSubmit={this.handleSubmit}>
        <div className="input-group search-bar__input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <img src={searchIcon} />
            </span>
          </div>
          <input type="text"
            placeholder="Search for a song, album or artist"
            className="form-control search-bar__input"
            value={this.state.searchString}
            onChange={this.handleChange}
          />
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

SearchBar.propTypes = {
  onSearch: PropTypes.func
};