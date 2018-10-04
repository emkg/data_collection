import React from 'react';
import cx from 'classnames';

// prvent page refresh
const stop = (event) => (event.stopPropagation(), event.preventDefault());

/**
 * CollectionSummaryRow is a single row of information with a label
 * and a value. Clicking the label or the value makes the value
 * become a text input field so that the value is editable.
 */
export default class CollectionSummaryRow extends React.Component {
    /**
     * state stores the value of the Row (String), whether the
     * editable input field should be open (boolean)
     */
    state = {
      edit: false,
      value: this.props.value
    };

    /**
     *  stores the value of the event fired (submit) and sets the
     *  state of the edit boolean to false
     * @param event - the event from the input element
     */
    edit = (event) => {
      stop(event);
      const value = event.target.newValue.value === ""
                      ? this.state.value
                      : event.target.newValue.value;
      this.props.fn(false);
      this.setState({ edit: false, value: value });
    }

    /**
     * turns the state of the edit boolean
     * to true if false and false if true
     */
    showHideInput = () => {
      const edit = !this.state.edit;
      this.props.fn(edit);
      this.setState({ edit });
    }

    /**
     * @return a fully accessible "row" of labelled data with
     *  the ability to become editable on a click event
     * 
     */
    render() {
      const { edit } = this.state;
      return (
        <div className="event-summary-row" >

            <a tabindex={0} href="javascript:;" className="full-width-a-tag" onClick={this.showHideInput}>{this.props.attr}</a>
            <a tabindex={0} href="javascript:;" onClick={this.showHideInput} className={cx({ edit }, "middle")}>{this.state.value}</a>


          <form className={cx({ edit : !edit }, "edit-preview")} onSubmit={this.edit}>
            <input type="text" className="edit-preview-input" name="newValue" placeholder={this.state.value}/>
          </form>
        </div>
      )
    }

}
