import React from 'react';
import PropsTypes from 'prop-types';
import cx from 'classnames';

/**
 * Tab is an anchor tag that tells its parent it has been clicked.
 */
export default class Tab extends React.Component {

  /**
   * passes the value of this tabs prop back up to the parent container
   * via the handleClick fn prop
   */
  handleClick = () => {
    this.props.handleClick(this.props.tab);
  }

  /**
   * @return {jsx} an anchor tag (accessible) that when clicked changes in appearance
   * and has an effect with respect to the handleClick fn passed as props
   */
  render() {
    const { clicked } = this.props;
    return (
      <a href="#" className={cx("tab", { clicked })} onClick={this.handleClick}>
        {this.props.tab}
      </a>
    )
  }
}


Tab.propTypes = {
  tab: PropTypes.string
}
