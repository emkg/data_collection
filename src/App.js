import React from 'react';
import Event from './Event';
import VCP from './VCP';
import Sector from './Sector';
import Remark from './Remark';
import Warning from './Warning';
import Report from './Report';
import RadarSignatures from './RadarSignatures';

import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Event />
        <VCP />
        <Sector />
        <Remark />
        <Warning />
        <Report />
        <RadarSignatures />
      </div>
    );
  }
}
