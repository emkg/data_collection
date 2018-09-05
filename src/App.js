import React from 'react';
import Event from './components/Event';
import './App.css';



/**
 *  App houses the data collection mechanism and model
 *  for the Radar Operations.
 *
 */
export default class App extends React.Component {
  state = { weatherEvent: false }

  componentDidMount() {
    window.scrollTo(0,0);
  }
  /**
   * When startEvent is triggered, the weatherEvent in state
   *   is flipped on or off. A thankyou message can be supplied,
   *   which will be displayed when the event is flipped to false.
   */
  startEvent = (thankyou) => {
    this.setState({ weatherEvent: !this.state.weatherEvent, thankyou })
    window.scrollTo(0,0);
  }

  /**
   * Render the app.
   * @return In a weather event, an Event will be rendered.
   * Otherwise, we will see the GO button, and a thankyou message if it
   * exists.
   */
  render() {
    return (
      <div className="app">
      <h1>Radar Operations Data Collection</h1>

      {!this.state.weatherEvent && (
        <div>
          {this.state.thankyou}
          <p>Press go to collect data
          when weather events are in progress.</p>

          <div className="new-collection"
                 onClick={this.startEvent}>GO</div>
        </div>)}

      {this.state.weatherEvent && (<Event eventOver={this.startEvent} />)}

      </div>
    );
  }
}
