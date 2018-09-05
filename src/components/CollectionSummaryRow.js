import React from 'react';
import cx from 'classnames';

const stop = (event) => (event.stopPropagation(), event.preventDefault());
export default class CollectionSummaryRow extends React.Component {

    state = { noedit: false, value: this.props.value, editButton: "EDIT" };

    edit = (event) => {
      stop(event);
      const value = event.target.newValue.value;
      //const editButton = this.state.noedit ? "EDIT" : "ENTER";
      this.setState({ noedit: false, value: value });
    }

    showHideInput = () => {
      this.setState({ noedit: !this.state.noedit })
    }

    render() {
      const { noedit } = this.state;
      return (
        <div className="event-summary-row" >

            <span onClick={this.showHideInput}>{this.props.attr}</span>
            <span onClick={this.showHideInput} className={cx({ noedit }, "middle")}>{this.state.value}</span>


          <form className={cx({ noedit : !noedit }, "edit-preview")} onSubmit={this.edit}>
            <input type="text" name="newValue" value={this.state.value}/>

          </form>
        </div>
      )
    }

}
