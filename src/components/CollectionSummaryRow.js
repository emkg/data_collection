import React from 'react';
import cx from 'classnames';

const stop = (event) => (event.stopPropagation(), event.preventDefault());
export default class CollectionSummaryRow extends React.Component {
    state = { noedit: false };

    edit = (event) => {
      stop(event);
      this.setState({ noedit: !this.state.noedit });
    }

    render() {
      const { noedit } = this.state;
      return (
        <div className="event-summary-row">
          <span>{this.props.attr}</span> <span className={cx({ noedit } )}>{this.props.value}</span>
          <input className={cx({ noedit : !noedit })} type="text" />
          <button onClick={this.edit}>EDIT</button>
        </div>
      )
    }

}
