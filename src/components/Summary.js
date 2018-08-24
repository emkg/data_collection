import React from 'react';
import ReactJson from 'react-json-view';
//import Form from './Form';

// TODO: polish the style
// TODO: add a way to edit the data

// TODO: organize data batches to send to db tables


/**
 * Summary is a way to see the saved data submitted,
 * edit it, and submit it.
 *
 */
export default class Summary extends React.Component {
  state = {};

  edit = (index) => {
    console.log(index);
    this.setState({ editOn: !this.state.editOn })
  }

  /**
   *  handleSubmit will send the full state of this weather event
   *  to storage. Send Thankyou to app. Submits this Event.
   */
  handleSubmit = () => {
    // TODO: send state data to a fetch method
    document.cookie = "eventState=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    this.props.eventOver("Your data has been collected!");
    this.sendDataToDatabase(this.state.weatherEventData)
  }


  /**

   * @param jsonPayload an object that will be sent
   * to the database stringified
   */
  sendDataToDatabase = (jsonPayload) => {
    fetch("./api/event.php", {
      method: "POST",
      mode: "same-origin",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonPayload)
    })
  }

  render() {
    const { weatherEventData } = this.props;
    const { collections } = this.props;
    const collectionsDisplay = collections.map((c, i) => {
        let rows = [];
        for (var property in c) {
          let rowvalue = `${property}: ${c[property]}`;
          rows.push(<div>{rowvalue}</div>);
        }
        return (
          <div className="event-summary-row">
            {rows}
            <button onClick={this.edit}>EDIT</button>
          </div>
        );
    });

    return (
      <div>
        <h1>How does your data look?</h1>

        <h3>Event Summary</h3>
        <div className="event-summary-row">Event Instrument: {weatherEventData.instrument}</div>
        <div className="event-summary-row">Event Start: {weatherEventData.eventstartday} {weatherEventData.eventstarttime}</div>
        <div className="event-summary-row">Event End: {weatherEventData.eventendday} {weatherEventData.eventendTime}</div>
        <div className="event-summary-row">Event Radar Signatures: {weatherEventData.eventRadarSigs}</div>
        <div className="event-summary-row">Event Type: {weatherEventData.eventType}</div>
        <div className="event-summary-row">Event Description: {weatherEventData.eventDescription}</div>

        <h3>Individual Collections</h3>

        {collectionsDisplay}



        <div className="new-collection"
           onClick={this.handleSubmit}>{"It's ALL GOOD!"}
        </div>
      </div>
    )
  }
}
