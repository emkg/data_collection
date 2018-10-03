import React from 'react';
import cx from 'classnames';

// prvent page refresh
const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class CollectionSummaryRow extends React.Component {
    state = {
      edit: false,
      value: this.props.value,
      editButton: "EDIT"
    };

    edit = (event) => {
      stop(event);
      const value = event.target.newValue.value === ""
                      ? this.state.value
                      : event.target.newValue.value;
      this.props.fn(false);
      this.setState({ edit: false, value: value });
    }

    showHideInput = () => {
      const edit = !this.state.edit;
      this.props.fn(edit);
      this.setState({ edit });
    }

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
