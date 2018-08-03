import React from 'react';
import Megastore from './components/Megastore';


import './App.css';

export default class App extends React.Component {
  state = { event: false }

  startEvent = () => {
    this.setState({ event: !this.state.event })
  }

  render() {
    return (
      <div className="app">
      <h1>Radar Operations Data Collection</h1>

      {!this.state.event && (
        <div>
          <p>Press go to collect data
          when weather events are in progress.</p>

          <div className="new-collection"
                 onClick={this.startEvent}>GO</div>
        </div>)}

      {this.state.event && (<Megastore />)}

      </div>
    );
  }
}
