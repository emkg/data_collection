import React from 'react';

//TODO: organize collection data
//TODO: polish the style
//TODO: add a way to edit the data
//TODO: add esdoc

// TODO: send data to a store
// TODO: organize data batches to send to db tables
// TODO: create a json preview to display...

export default class Summary extends React.Component {
  render() {
    return (
      <div>
        <h3>How does your data look?</h3>
        <div className="event-summary-row">Event Start: {this.props.data.eventstartday}</div>
        <div className="event-summary-row">{this.props.data.eventstarttime}</div>
        <div className="event-summary-row">Event End: {this.props.data.weatherEventData.eventendday}</div>
        <div className="event-summary-row">{this.props.data.weatherEventData.eventendday}</div>
        <div className="event-summary-row">Event Type: {this.props.data.weatherEventData.eventType}</div>
        <div className="event-summary-row">Event Description: {this.props.data.weatherEventData.eventDescription}</div>
        {this.props.data.collections.map(c => {
          return(
            <div className="event-summary-row">
              <div>{c.startDay}</div>
              <div>{c.startTime}</div>
            </div>
          )
        })

        }
      </div>
    )
  }
}
