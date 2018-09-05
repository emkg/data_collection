import React from 'react';
import cx from 'classnames';

const stop = (event) => (event.stopPropagation(), event.preventDefault());
export default class CollectionSummaryRow extends React.Component {

    state = { noedit: false, value: this.props.value, editButton: "EDIT" };

    edit = (event) => {
      stop(event);
      const value = event.target.newValue.value === ""
                      ? this.state.value
                      : event.target.newValue.value;
      //const editButton = this.state.noedit ? "EDIT" : "ENTER";
      this.setState({ noedit: false, value: value });
    }

    showHideInput = () => {
      this.setState({ noedit: !this.state.noedit })
    }

    render() {
      const { noedit } = this.state;
      return (
        <div id={this.props.id} className="event-summary-row" >

            <a href={`#${this.props.id}`} className="full-width-a-tag" onClick={this.showHideInput}>{this.props.attr}</a>
            <a href={`#${this.props.id}`} onClick={this.showHideInput} className={cx({ noedit }, "middle")}>{this.state.value}</a>


          <form className={cx({ noedit : !noedit }, "edit-preview")} onSubmit={this.edit}>
            <input type="text" name="newValue" placeholder={this.state.value}/>

          </form>
        </div>
      )
    }

}
