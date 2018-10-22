import React, { Fragment } from 'react';
import ReactJson from 'react-json-view';
import CollectionSummaryRow from './CollectionSummaryRow';
import BigYellowButton from './BigYellowButton';

// TODO: add a way to edit the data


/**
 * Summary is a way to see the saved data submitted,
 * edit it, and submit it.
 */
export default class Summary extends React.Component {
  /**
   * state stores a count of open CollectionSummaryRows as editing, a number
   * as well as the collections prop object and weatherEventData prop object
   */
  state = { editing: 0 };

  /**
   * when component mounts, put collection and weather event data
   * in state.
   */
  componentDidMount() {
    const { collections } = this.props;
    const { weatherEventData } = this.props;
    this.setState({ collections, weatherEventData });

  }

  /**
   * Keeps track of how many CollectionSummaryRows are open
   * for editing. True increases count, false lowers count.
   * @param bool - a True or False value - true if CollectionSummaryRows are
   *  opened for editing, false if they are closed
   */
  isEditing = (bool) => {
    let { editing } = this.state;
    bool ? editing++ : editing--;
    this.setState({ editing })
  }

  /**
   *  handleSubmit will send the full state of this weather event
   *  to storage. Send Thankyou to app. Submits this Event.
   *
   *  If editable fields are open, a yellow snackbar will appear
   *  with a helpful message to the user instead of submitting incomplete
   *   information to the DB.
   */
  handleSubmit = () => {
    if(this.state.editing) {
      this.props.snackbar('warning', 'Press enter on the open text field so your data gets saved before submitting again.');
    } else {
      document.cookie = "eventState=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      this.props.eventOver("Your data has been collected!");
      this.sendDataToDatabase(this.state.weatherEventData, "event");
      this.state.collections.map( (c, i) => {
        debugger;
        if(c.collectionType === "loc") {
          debugger;
          this.sendDataToDatabase(c, "location");
        } else {
          debugger;
          this.sendDataToDatabase(c, c.collectionType);
        }
      });
      window.scrollTo(0,0);
    }
  }

  /**
   * @param stringInCamelCase - a string with uppercase letters
   *   adjacent to lowercase letters
   * @return a string - the value of stringInCamelCase in all lowercase
   *   and spaces between words as indicated by camel cases
   */
  removeCamelCase(stringInCamelCase) {
    return stringInCamelCase.replace(
      /[a-z][A-Z]/g, (letters, i) => (
        letters[0] + " " + letters[1].toLowerCase()
      )
    );
  }

  /**
   * Sends information to permanent storage.
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

  /**
   * Creates an array of renderable components based on data passed to this
   * component via props that will allow users to edit data before submitting.
   *
   * @param object - a json object we iterate to create CollectionSummaryRows
   * @param array - an optional array of components we can append to, else start from scratch
   * @return an array of CollectionSummaryRow components
   */
  getCollectionSummaryRows = (object, array) => {
    let newArray = array || [];
    for (var property in object) {
      if (property.slice(-2) !== "ID" && property !== "" && property !== "//") {
        newArray.push(<CollectionSummaryRow
                    fn={this.isEditing}
                    attr={this.removeCamelCase(property)}
                    value={object[property]}/>);
      }
    }
    return newArray;
  }

  /**
   * @return a stylish, editable table presenting the event data and
   * collection data ready to be submitted to permanent storage featuring
   * a BigYellowButton signaling the user to submit when ready.
   */
  render() {
    if(this.state.collections) {
      const collectionsDisplay = this.state.collections.map((c, i) => {
          let rows = [];
          rows.push(<h4>{c["collectionType"]}</h4>);
          rows = this.getCollectionSummaryRows(c, rows);
          return (
            <Fragment>
              {rows}
            </Fragment>
          );
      });
      const eventDisplay = this.getCollectionSummaryRows(this.state.weatherEventData);
      return (
        <div>
          <h2>How does your data look?</h2>

          <h3>Event Summary</h3>
          {eventDisplay}

          <br/>
          <br/>

          <h3>Individual Collections</h3>
          <div className="collections-summary" >
            {collectionsDisplay}
          </div>

          <BigYellowButton
              handleButtonPress={this.handleSubmit}
              buttonText="It's ALL GOOD!" />
        </div>
      )
    } else {
      return ( <div/>)
    }
  }
}
