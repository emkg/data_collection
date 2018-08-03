import React from 'react';
//import DayPickerInput from 'react-day-picker';
//import 'react-day-picker/lib/style.css';


// TODO: handle submit
// TODO: add RadarSignatures?

export default class EventSummary extends React.Component {
  render() {
    return (
      <div>
        <form>
          <div>
            <input type="checkbox" id="tornadic-supercell" name="feature" value="tornadic-supercell" checked />
            <label for="downburst">Downburst</label>
          </div>
          <div>
            <input type="checkbox" id="hail" name="feature" value="hail" />
            <label for="thunderstorm">Thunderstorm</label>
          </div>
          <div>
            <input type="checkbox" id="claws" name="feature" value="claws" />
            <label for="tornado">Tornado</label>
          </div>

          <input type="date" name="day" min="2018-01-01"/>
          <input type="time" name="time" min="00:00" max="23:59" />
          <textarea name="paragraph_text" cols="50" rows="10" placeholder="remarks..."/>
          <input type="submit" />

        </form>
      </div>
    )
  }
 }
