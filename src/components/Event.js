import React from 'react';
import Instrument from './Instrument';
import Collection from './Collection';
import EventSummary from './EventSummary';

// TODO: handle submit

// IDEA: possibly, we'll route or just consitionally render
// event needs to render a router element -- collection
// when a collection is submitted and event ends, we can
// render a event completion form

// TODO: establish correct event id

const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class Event extends React.Component {
  state = {
    mode: "begin" // "collect" or "end"
  };

  handleSubmit = (mode) => {
    this.setState({ mode });
  }

  render() {
    return (
      <div>
        {this.state.mode === "begin" ?
          (<Instrument handleSubmit={this.handleSubmit} />)
          : this.state.mode === "collect"
            ? (<Collection />)
            : (<EventSummary />)
        }
      </div>
    )
  }
 }
