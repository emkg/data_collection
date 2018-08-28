import React from 'react';
import ReactJson from 'react-json-view';
//import Form from './Form';

// TODO: add a way to edit the data


/**
 * Summary is a way to see the saved data submitted,
 * edit it, and submit it.
 *
 */
export default class Summary extends React.Component {
  state = {};

  componentDidMount() {
    const { collections } = this.props;
    const { weatherEventData } = this.props;
    this.setState({ collections, weatherEventData });

  }

  edit = (index) => {
    console.log(index);
    this.setState({ editOn: !this.state.editOn })
  }

  /**
   *  handleSubmit will send the full state of this weather event
   *  to storage. Send Thankyou to app. Submits this Event.
   */
  handleSubmit = () => {
    document.cookie = "eventState=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    this.props.eventOver("Your data has been collected!");
    this.sendDataToDatabase(this.state.weatherEventData, "event");
    let cid;
    this.state.collections.map( (c, i) => {
      if(c.id !== c.collectionID) {
        cid = c.collectionID;
      }

      if(c.collectionType === "loc") {
        console.log(`collection type ${c.collectionType}`);
        cid = c.collectionID, this.sendDataToDatabase(c, "collection");
      } else {
        this.sendDataToDatabase(c, c.collectionType);
      }
    });

  }


  /**
   *
   * @param jsonPayload an object that will be sent
   * to the database stringified
   * @param type a string that is the collection type
   * or "event" that corresponds to a php file
   */
  sendDataToDatabase = (jsonPayload, type) => {
    fetch(`./api/${type}.php`, {
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
    if(this.state.collections) {
      const collectionsDisplay = this.state.collections.map((c, i) => {
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
          <div className="event-summary-row">
            Event Instrument: {this.state.weatherEventData.instrument}
          </div>
          <div className="event-summary-row">
            Event Start: {this.state.weatherEventData.eventStart}
          </div>
          <div className="event-summary-row">
            Event End: {this.state.weatherEventData.eventEnd}
          </div>
          <div className="event-summary-row">
            Event Radar Signatures: {this.state.weatherEventData.eventRadarSigs}
          </div>
          <div className="event-summary-row">
            Event Type: {this.state.weatherEventData.eventType}
          </div>
          <div className="event-summary-row">
            Event Description: {this.state.weatherEventData.eventDescription}
          </div>

          <h3>Individual Collections</h3>

          {collectionsDisplay}



          <div className="new-collection"
             onClick={this.handleSubmit}>{"It's ALL GOOD!"}
          </div>
        </div>
      )
    } else {
      return ( <div/>)
    }
  }
}
