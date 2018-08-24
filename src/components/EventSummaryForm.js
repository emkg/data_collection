import React from 'react';

// TODO: add esdoc
// TODO: fix the checkforms ...
//        TODO: the default checks and
//        TODO: the fact that the values are not collected

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
                <input type="checkbox" id="tornadic-supercell" name="radarSig" value="tornadic-supercell"  />
                <label htmlFor="tornadic-supercell">tornadic supercell</label>
              </div>
              <div>
                <input type="checkbox" id="hail" name="radarSig" value="hail" />
                <label htmlFor="hail">hail</label>
              </div>
              <div>
                <input type="checkbox" id="windshear" name="radarSig" value="windshear" />
                <label htmlFor="windshear">windshear</label>
              </div>
              <div>
                <input type="checkbox" id="gustnado" name="radarSig" value="gustnado" />
                <label htmlFor="gustnado">gustnado</label>
              </div>
              <div>
                <input type="checkbox" id="flood" name="radarSig" value="flood" />
                <label htmlFor="flood">flood</label>
              </div>

          </div>
         </div>

         <div className="checkform">
            <h1>Event Type</h1>
            <div>
            <div>
              <input type="checkbox" id="downburst" name="eventType" value="downburst" />
              <label htmlFor="downburst">downburst</label>
            </div>
            <div>
              <input type="checkbox" id="hail" name="eventType" value="hail" />
              <label htmlFor="hail">hail</label>
            </div>
            <div>
              <input type="checkbox" id="claws" name="eventType" value="claws" />
              <label htmlFor="tornado">tornado</label>
            </div>
            <div>
              <input type="checkbox" id="thunderstorm" name="eventType" value="thunderstorm"  />
              <label htmlFor="thunderstorm">thunderstorm</label>
            </div>
            </div>
          </div>
          <input type="date" name="endDay" min="2018-01-01" defaultValue={new Date().toJSON().slice(0,10)}/>
          <input type="time" name="endTime" min="00:00" max="23:59" defaultValue={new Date().toJSON().slice(11,16)}/>
          <textarea name="summary" cols="50" rows="10" placeholder="event summary..."/>
          <input type="submit" />

        </form>
      </div>
    )
  }
 }
