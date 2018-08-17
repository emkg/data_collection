import React from 'react';
import ReactJson from 'react-json-view';

//TODO: organize collection data
//TODO: polish the style
//TODO: add a way to edit the data

// TODO: send data to a store
// TODO: organize data batches to send to db tables
// TODO: create a json preview to display...


/**
 * Summary is a way to see the saved data submitted,
 * edit it, and submit it.
 *
 */
export default class Summary extends React.Component {
  /**
   *  handleSubmit will send the full state of this weather event
   *  to storage. Send Thankyou to app. Submits this Event.
   */
  handleSubmit = () => {
    // TODO: send state data to a fetch method
    this.props.eventOver("Your data has been collected!");
  }

  render() {
    const { weatherEventData } = this.props;
    const { collections } = this.props;
    const preview = {...weatherEventData, collections};
    return (
      <div>
        <h3>How does your data look?</h3>
        <ReactJson src={preview} />

        <div className="event-summary-row">Event Start: {weatherEventData.eventstartday} {weatherEventData.eventstarttime}</div>
        <div className="event-summary-row">Event End: {weatherEventData.eventendday} {weatherEventData.eventendday}</div>
        <div className="event-summary-row">Event Type: {weatherEventData.eventType}</div>
        <div className="event-summary-row">Event Description: {weatherEventData.eventDescription}</div>
        {collections.map(c => {
          return(
            <div className="event-summary-row">
              <div>{c.startDay}</div>
              <div>{c.startTime}</div>
            </div>
          )
        })

        }

        <div className="new-collection"
           onClick={this.handleSubmit}>{"It's ALL GOOD!"}
        </div>
      </div>
    )
  }
}
