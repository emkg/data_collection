import React from 'react';
import Instrument from './Instrument';
import Collection from './Collection';
import EventSummaryForm from './EventSummaryForm';
import Summary from './Summary';

// TODO: handle submit

// TODO: establish correct event id, validate this


const stop = (event) => (event.stopPropagation(), event.preventDefault());

const mobileInstruments = ['NOXP'];



export default class Event extends React.Component {
  state = {
    mode: "begin", // "collect" or "end"
    collectionID: 0,
    collections: [],

  };

  saveData = (data) => {
    const { collections } = this.state;
    collections.push(data);
    this.setState( { collections } )
  }

  handleInstrument = (instrument) => {
    const mobile = mobileInstruments.includes(instrument);
    this.setState({ mode: "collect", instrument, mobile });
  }

  handleEndEvent = (event) => {
    this.setState({ event, mode: "summary" })
  }

  handleNewCollection = () => {
    this.setState({ collectionID: this.state.collectionID + 1, mode: "end" });
  }

  render() {
    return (
      <div className="event">
        {this.state.mode === "begin" ?
          (<Instrument handleSubmit={this.handleInstrument} />)
          : this.state.mode === "collect"
            ? (<Collection
                  saveData={this.saveData}
                  handleSubmit={this.handleNewCollection}
                  collectionID={this.state.collectionID}
                  mobile={this.state.mobile} />)
            : this.state.mode === "end"
              ? (<EventSummaryForm  handleSubmit={this.handleEndEvent} />)
              : (<Summary  data={this.state}/>)
        }
      </div>
    )
  }
 }
