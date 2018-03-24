import React from 'react';
import PropTypes from 'prop-types';


// Styles
import './tabs.scss';

class Tabs extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const tabs = this.props.tabItems.map((tab, index) =>
      <li className={"tab-item " + (this.props.selectedIndex === index && 'tab-item--active')}
        key={tab.alias}>
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
      alias: PropTypes.string
    })
  ),
  selectedIndex: PropTypes.number
}

Tabs.defaultProps = {
  tabItems: [],
  selectedIndex: 0
};