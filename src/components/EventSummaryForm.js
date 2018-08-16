import React from 'react';

// TODO: add esdoc
const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class EventSummaryForm extends React.Component {

  handleSubmit = (event) => {
    stop(event);
    const e = event.target;
    const data = {
      eventType: e.eventType.value,
      eventRadarSigs: e.radarSig.value,
      eventendday: e.endDay.value,
      eventendtime: e.endTime.value,
      eventDescription: e.summary.value
    }

    this.props.handleSubmit(data);
  }

  render() {
    return (
      <div className="event-summary">
        <form onSubmit={this.handleSubmit}>
        <div className="checkform">
            <h1>Radar Signatures</h1>
            <div>
            <div>
              <input type="checkbox" id="tornadic-supercell" name="radarSig" value="tornadic-supercell" checked />
              <label for="tornadic-supercell">Tornadic Supercell</label>
            </div>
            <div>
              <input type="checkbox" id="hail" name="radarSig" value="hail" />
              <label for="hail">Hail</label>
            </div>
            <div>
              <input type="checkbox" id="claws" name="radarSig" value="claws" />
              <label for="claws">Claws</label>
            </div>
            <div>
              <input type="checkbox" id="tornadic-supercell" name="radarSig" value="tornadic-supercell" checked />
              <label for="tornadic-supercell">Tornadic Supercell</label>
            </div>
            <div>
              <input type="checkbox" id="hail" name="radarSig" value="hail" />
              <label for="hail">Hail</label>
            </div>
            <div>
              <input type="checkbox" id="claws" name="radarSig" value="claws" />
              <label for="claws">Claws</label>
              </div>
            </div>
         </div>
         <div className="checkform">
            <h1>Event Type</h1>
            <div>
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
            </div>
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
