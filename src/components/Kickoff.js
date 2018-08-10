import React from 'react';
import DayPickerInput from 'react-day-picker';
import 'react-day-picker/lib/style.css';

// TODO: do we need this to be a component?

// without stop, form will reset the app with a window refresh
const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class Kickoff extends React.Component {
  render() {
    return (
      <div>
        <form>
          <DayPickerInput />
          <select name="instrument" onChange={this.handleInstrument}>
            <option value="KOUN">KOUN</option>
            <option value="NOXP">NOXP</option>
          </select>
          <input type="time" name="time" min="00:00" max="23:59" />
          {this.state.mobile && (
            <div>
              <input type="number" placeholder="lat"/>
              <input type="number" placeholder="long"/>
            </div>
          )}
          <input type="submit" />
        </form>
      </div>
    )
  }
}
