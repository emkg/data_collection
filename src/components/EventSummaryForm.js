import React from 'react';
import RadarSignatures from './RadarSignatures';


const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class EventSummaryForm extends React.Component {

  handleSubmit = (event) => {
    stop(event);
    const e = event.target;
    const data = {
      collectionID: this.props.collectionID,
      eventType: e.eventType.value,
      endDay: e.endDay.value,
      endTime: e.endTime.value,
      eventSummary: e.summary.value
    }

    this.props.handleSubmit(data);
  }

  render() {
    return (
      <div className="event-summary">
        <form onSubmit={this.handleSubmit}>
          <RadarSignatures />
          <div>
            <input type="checkbox" id="tornadic-supercell" name="eventType" value="tornadic-supercell" checked />
            <label for="downburst">Downburst</label>
          </div>
          <div>
            <input type="checkbox" id="hail" name="eventType" value="hail" />
            <label for="thunderstorm">Thunderstorm</label>
          </div>
          <div>
            <input type="checkbox" id="claws" name="eventType" value="claws" />
            <label for="tornado">Tornado</label>
          </div>

          <input type="date" name="endDay" min="2018-01-01"/>
          <input type="time" name="endTime" min="00:00" max="23:59" />
          <textarea name="summary" cols="50" rows="10" placeholder="remarks..."/>
          <input type="submit" />

        </form>
      </div>
    )
  }
 }
