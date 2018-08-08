import React from 'react';
import Instrument from './Instrument';
import Collection from './Collection';
import EventSummaryForm from './EventSummaryForm';
import Summary from './Summary';

// TODO: handle submit

// TODO: establish correct event id, validate this


const stop = (event) => (event.stopPropagation(), event.preventDefault());

const mobileInstruments = ['NOXP'];


/**
 * Testing esdoc
 *
 */
export default class Event extends React.Component {
  state = {
    mode: "begin", // "collect" or "end"
    collectionID: 0,
    collections: [],

  };

  /**
   *
   * @param data - a data object. 
   */
  saveData = (data) => {
    const { collections } = this.state;
    collections.push(data);
    this.setState( { collections } )
  }

  handleInstrument = (instrument) => {
    const mobile = mobileInstruments.includes(instrument);
    this.setState({ mode: "collect", instrument, mobile });
  }

  handleEndCollection = () => {
    this.setState({ mode: "summary" })
  }

  handleEventSummary = (event) => {
    this.setState({ event, mode: "end" })
  }

  handleSubmit = () => {
    // TODO: send state data to a fetch method
    this.props.eventOver("Your data has been collected!");
  }

  render() {
    return (
      <div className="event">
        {this.state.mode === "begin" ?
          (<Instrument handleSubmit={this.handleInstrument} />)
          : this.state.mode === "collect"
            ? (<Collection
                  saveData={this.saveData}
                  handleSubmit={this.handleEndCollection}
                  collectionID={this.state.collectionID}
                  mobile={this.state.mobile} />)
            : this.state.mode === "summary"
              ? (<EventSummaryForm  handleSubmit={this.handleEventSummary} />)
              : (<div>
                    <Summary  data={this.state}/>
                    <div className="new-collection"
                       onClick={this.handleSubmit}>{"It's ALL GOOD!"}
                    </div>
                  </div>
                )
        }


      </div>
    )
  }
 }
