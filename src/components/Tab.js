import React from 'react';
import cx from 'classnames';

//TODO: add esdoc

export default class Tab extends React.Component {

  handleClick = () => {
    this.props.handleClick(this.props.tab);
  }

  render() {
    const { clicked } = this.props;
    return (
      <a href="#" className={cx("tab", { clicked })} onClick={this.handleClick}>
        {this.props.tab.toUpperCase()}
      </a>
    )
  }
}
