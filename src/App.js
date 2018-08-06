import React from 'react';
import Event from './components/Event';


import './App.css';

export default class App extends React.Component {
  state = { event: false }

  startEvent = (thankyou) => {
    this.setState({ event: !this.state.event, thankyou })
  }

  render() {
    return (
      <div className="app">
      <h1>Radar Operations Data Collection</h1>

      {!this.state.event && (
        <div>
          {this.state.thankyou}
          <p>Press go to collect data
          when weather events are in progress.</p>

          <div className="new-collection"
                 onClick={this.startEvent}>GO</div>
        </div>)}

      {this.state.event && (<Event eventOver={this.startEvent} />)}

      </div>
    );
  }
}
