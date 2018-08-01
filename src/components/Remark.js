import React from 'react';
import DayPickerInput from 'react-day-picker';
import 'react-day-picker/lib/style.css';

// TODO: handle submit

export default class Remark extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={ () => (console.log("submitted!"))}>
          <DayPickerInput />
          <input type="time" name="time" min="00:00" max="23:59" />
          <textarea name="paragraph_text" cols="50" rows="10" placeholder="remarks..."/>
          <input type="submit" />
        </form>
      </div>
    )
  }
 }
