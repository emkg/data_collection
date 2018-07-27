import React from 'react';
import DayPickerInput from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class Kickoff extends React.Component {
  render() {
    return (
      <div>
        <form>
        <DayPickerInput />
          <input type="time" name="time" min="00:00" max="23:59" />
          <input type="number" placeholder="start sector"/>
          <input type="number" placeholder="end sector"/>
          <input type="submit" />
        </form>
      </div>
    )
  }
}
