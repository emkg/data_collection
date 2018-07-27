import React from 'react';
import Event from './Event';
import RadarSignatures from './RadarSignatures';

import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Event />
        <RadarSignatures />
      </div>
    );
  }
}
