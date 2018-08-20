import React from 'react';
import ReactJson from 'react-json-view';
import Form from './Form';

// TODO: polish the style
// TODO: add a way to edit the data
// TODO: send data to a store
// TODO: organize data batches to send to db tables


/**
 * Summary is a way to see the saved data submitted,
 * edit it, and submit it.
 *
 */
export default class Summary extends React.Component {
  state = {};

  edit = () => {
    this.setState({ editOn: !this.state.editOn })
  }

  /**
   *  handleSubmit will send the full state of this weather event
   *  to storage. Send Thankyou to app. Submits this Event.
   */
  handleSubmit = () => {
    // TODO: send state data to a fetch method
    document.cookie = "eventState" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    this.props.eventOver("Your data has been collected!");
  }

  render() {
    const { weatherEventData } = this.props;
    const { collections } = this.props;
    return (
      <div>
        <h3>How does your data look?</h3>
        <ReactJson src={weatherEventData} />

        {collections.map((c, i) => {
          <div className="event-summary-row">
            <ReactJson src={c} />
            <button onClick={this.edit}>EDIT</button>
          </div>
          })
        }

        <div className="event-summary-row">Event Start: {weatherEventData.eventstartday} {weatherEventData.eventstarttime}</div>
        <div className="event-summary-row">Event End: {weatherEventData.eventendday} {weatherEventData.eventendday}</div>
        <div className="event-summary-row">Event Type: {weatherEventData.eventType}</div>
        <div className="event-summary-row">Event Description: {weatherEventData.eventDescription}</div>



        <div className="new-collection"
           onClick={this.handleSubmit}>{"It's ALL GOOD!"}
        </div>
      </div>
    )
  }
}
