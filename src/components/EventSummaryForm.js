import React from 'react';

// TODO: add esdoc


const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class EventSummaryForm extends React.Component {
  state = {
    radarSigs: []
  }

  collectRadarSigs = (event) => {
    let { radarSigs } = this.state;
    event.target.checked ?
      (
        radarSigs.push(event.target.value),
        this.setState({ radarSigs })
      )
      :
      (
        radarSigs = radarSigs.filter( e => e !== event.target.value),
        this.setState({ radarSigs })
      )
  }

  getEventType = (event) => {
    this.setState({ eventType : event.target.value })
  }

  handleSubmit = (event) => {
    stop(event);
    const e = event.target;
    const data = {
      eventType: this.state.eventType,
      eventRadarSigs: this.state.radarSigs.toString(),
      eventEnd: this.props.convertTime(e.endDay.value, e.endTime.value),
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
              <input type="checkbox" id="tornadic-supercell" onChange={this.collectRadarSigs} value="tornadic-supercell"  />
              <label htmlFor="tornadic-supercell">tornadic supercell</label>

              <input type="checkbox" id="hail" onChange={this.collectRadarSigs} value="hail" />
              <label htmlFor="hail">hail</label>

              <input type="checkbox" id="windshear" onChange={this.collectRadarSigs} value="windshear" />
              <label htmlFor="windshear">windshear</label>

              <input type="checkbox" id="gustnado" onChange={this.collectRadarSigs} value="gustnado" />
              <label htmlFor="gustnado">gustnado</label>

              <input type="checkbox" id="flood" onChange={this.collectRadarSigs} value="flood" />
              <label htmlFor="flood">flood</label>
            </div>
         </div>

         <div className="checkform">
            <h1>Event Type</h1>
              <div>
                <input type="checkbox" id="downburst" onChange={this.getEventType} value="downburst" />
                <label htmlFor="downburst">downburst</label>

                <input type="checkbox" id="hail" onChange={this.getEventType} value="hail" />
                <label htmlFor="hail">hail</label>

                <input type="checkbox" id="claws" onChange={this.getEventType} value="claws" />
                <label htmlFor="tornado">tornado</label>

                <input type="checkbox" id="thunderstorm" onChange={this.getEventType} value="thunderstorm"  />
                <label htmlFor="thunderstorm">thunderstorm</label>
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
