import React from 'react';
import PropTypes from 'prop-types';


// Styles
import './tabs.scss';

class Tabs extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(index) {
    this.props.onTabSelect(index)
  }

  render() {
    const tabs = this.props.tabItems.map((tab, index) =>
      <li className={"tab-item " + (this.props.selectedIndex === index && 'tab-item--active')}
        key={tab.type}
        onClick={this.handleClick.bind(this, index)}>
        {tab.title}
      </li>
    );

    return (
      <ul className="tabs">
        {tabs}
      </ul>
    )
  }
}

export default Tabs;

Tabs.propTypes = {
  tabItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.string
    })
  ),
  selectedIndex: PropTypes.number,
  onTabSelect: PropTypes.func
}

Tabs.defaultProps = {
  tabItems: [],
  selectedIndex: 0
};