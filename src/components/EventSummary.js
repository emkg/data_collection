import React from 'react';
import RadarSignatures from './RadarSignatures';


// TODO: handle submit

export default class EventSummary extends React.Component {
  render() {
    return (
      <div className="event-summary">
        <form>
          <RadarSignatures />
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
