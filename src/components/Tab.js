import React from 'react';
import cx from 'classnames';

export default class Tab extends React.Component {

  handleClick = () => {
    this.props.handleClick(this.props.tab);
  }

  render() {
    const { clicked } = this.props;
    return (
      <div className={cx("tab", { clicked })} onClick={this.handleClick}>
        {this.props.tab.toUpperCase()}
      </div>
    )
  }
}
