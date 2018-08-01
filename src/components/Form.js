import React from 'react';
import DayPickerInput from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import cx from 'classnames';


export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={ () => (console.log("submitted!"))}>
           // kickoff
           <DayPickerInput />
           <input type="time" name="time" min="00:00" max="23:59" />
           // location
           <input type="number" placeholder="start sector"/>
           <input type="number" placeholder="end sector"/>

           // VCP
           <input type="text" placeholder="VCP"/>

           // Sector
           <DayPickerInput />
           <input type="time" name="time" min="00:00" max="23:59" />
           <input type="number" placeholder="start sector"/>
           <input type="number" placeholder="end sector"/>

           // Warning
           <DayPickerInput />
           <input type="time" name="time" min="00:00" max="23:59" />
           <input type="text" placeholder="counties..."  />
           <textarea name="paragraph_text" cols="50" rows="10" placeholder="Warning text"/>

           // Report
           <DayPickerInput />
           <input type="time" name="time" min="00:00" max="23:59" />
           <textarea name="paragraph_text" cols="50" rows="10" placeholder="Report text"/>

           // Remark
           <DayPickerInput />
           <input type="time" name="time" min="00:00" max="23:59" />
           <textarea name="paragraph_text" cols="50" rows="10" placeholder="remarks..."/>

           <input type="submit" />
        </form>
      </div>
    )
  }
 }
