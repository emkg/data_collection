import React from 'react';
import Event from './components/Event';
import RadarSignatures from './components/RadarSignatures';


import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Event />
      </div>
    );
  }
}
