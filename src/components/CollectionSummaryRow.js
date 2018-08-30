import React from 'react';
import cx from 'classnames';

const stop = (event) => (event.stopPropagation(), event.preventDefault());
export default class CollectionSummaryRow extends React.Component {

    state = { noedit: false, value: this.props.value, editButton: "EDIT" };

    edit = (event) => {
      stop(event);
      const value = event.target.value;
      const editButton = this.state.noedit ? "EDIT" : "ENTER";
      this.setState({ noedit: !this.state.noedit, value, editButton });

    }

    render() {
      const { noedit } = this.state;
      return (
        <div className="event-summary-row">
          <div>
            <span>{this.props.attr}</span>
            <span className={cx({ noedit } )}>{this.state.value}</span>
          </div>

          <form className="edit-preview" onSubmit={this.edit}>
            <input type="text" className={cx({ noedit : !noedit })}  />
            <input type="submit" value={this.state.editButton}/>
          </form>
        </div>
      )
    }

}
