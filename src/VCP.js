import React from 'react';
import DayPickerInput from 'react-day-picker';
import 'react-day-picker/lib/style.css';


export default class VCP extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={ () => (console.log("submitted!"))}>
          <DayPickerInput />
          <input type="time" name="time" min="00:00" max="23:59" />
          <input type="text" placeholder="VCP"/>
          <input type="submit" />
        </form>
      </div>
    )
  }
 }
