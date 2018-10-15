import React from 'react';


export default class TableCellWithClick extends React.Component {

  handleClick = () => {
    this.props.handleClick(this.props.ID);
  }

  render() {
    return (
      <td>
        <div onClick={this.handleClick}>
          <a href="javascript:;">{this.props.label}</a>
        </div>
      </td>
    )
  }


}
