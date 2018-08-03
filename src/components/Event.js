import React from 'react';
import Instrument from './Instrument';
import Collection from './Collection';
import EventSummary from './EventSummary';

// TODO: handle submit

// TODO: establish correct event id

const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class Event extends React.Component {
  state = {
    mode: "begin", // "collect" or "end"
    collectionID: 0
  };

  handleInstrument = (mode) => {
    this.setState({ mode });
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
                  saveData={this.props.saveData}
                  handleSubmit={this.handleNewCollection}
                  collectionID={this.state.collectionID} />)
            : (<EventSummary />)
        }
      </div>
    )
  }
 }
