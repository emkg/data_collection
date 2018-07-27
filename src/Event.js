import React from 'react';
import Instrument from './Instrument';
import Collection from './Collection';
import EventSummary from './EventSummary';

//possibly, we'll route or just consitionally render

// event needs to render a router element -- collection
// when a collection is submitted and event ends, we can
// render a event completion form

export default class Event extends React.Component {
  render() {
    return (
      <div>
        <Instrument />
        <Collection />
        <EventSummary />
      </div>
    )
  }
 }
