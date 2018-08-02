import React from 'react';

export default class Tab extends React.Component {
  handleClick = () => {
    this.props.handleClick(this.props.tab)
  }

  render() {
    return (
      <div className="tab" onClick={this.handleClick}>
        {this.props.tab.toUpperCase()} 
      </div>
    )
  }
}
