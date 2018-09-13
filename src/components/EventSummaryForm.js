import React from 'react';
import moment from 'moment';

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
        <h2>Weather Event Summary</h2>
        <p>Enter the details of the weather event to summarize before submitting the data to storage. </p>
        <div className="checkform">
            <h3>Radar Signatures</h3>
            <div>

              <input type="checkbox" id="downburst" onChange={this.collectRadarSigs} value="downburst" />
              <label htmlFor="downburst">downburst</label>

              <input type="checkbox" id="hail" onChange={this.collectRadarSigs} value="hail" />
              <label htmlFor="hail">hail</label>

              <input type="checkbox" id="bow-echo" onChange={this.collectRadarSigs} value="bow echo" />
              <label htmlFor="bow-echo">bow echo</label>

              <input type="checkbox" id="TDS" onChange={this.collectRadarSigs} value="TDS" />
              <label htmlFor="TDS">TDS</label>

              <input type="checkbox" id="mesocyclone" onChange={this.collectRadarSigs} value="mesocyclone" />
              <label htmlFor="mesocyclone">mesocyclone</label>

              <input type="checkbox" id="TVS" onChange={this.collectRadarSigs} value="TVS" />
              <label htmlFor="TVS">TVS</label>

              <input type="checkbox" id="refreezing" onChange={this.collectRadarSigs} value="refreezing" />
              <label htmlFor="refreezing">refreezing (winter)</label>

              <input type="checkbox" id="other" onChange={this.collectRadarSigs} value="other" />
              <label htmlFor="other">other</label>
            </div>
         </div>

         <div className="checkform">
            <h3>Event Type</h3>
              <div>
                <input type="checkbox" id="tornadic-supercell" onChange={this.getEventType} value="tornadic-supercell"  />
                <label htmlFor="tornadic-supercell">tornadic supercell</label>

                <input type="checkbox" id="nontornadic-supercell" onChange={this.getEventType} value="nontornadic-supercell"  />
                <label htmlFor="nontornadic-supercell">nontornadic supercell</label>

                <input type="checkbox" id="quasi-linear-convextive-system" onChange={this.getEventType} value="quasi-linear convextive system" />
                <label htmlFor="quasi-linear-convextive-system">quasi-linear convextive system</label>

                <input type="checkbox" id="mesoscale-convective-system" onChange={this.getEventType} value="mesoscale convective system" />
                <label htmlFor="mesoscale-convective-system">mesoscale convective system</label>

                <input type="checkbox" id="heavy-rain" onChange={this.getEventType} value="heavy rain/flash flooding"  />
                <label htmlFor="heavy-rain">heavy rain/flash flooding</label>

                <input type="checkbox" id="mutilcell-storms" onChange={this.getEventType} value="mutilcell storms" />
                <label htmlFor="mutilcell-storms">mutilcell storms</label>

                <input type="checkbox" id="winter-precipitation" onChange={this.getEventType} value="winter precipitation" />
                <label htmlFor="winter-precipitation">winter precipitation</label>

                <input type="checkbox" id="convective-initiation" onChange={this.getEventType} value="convective initiation" />
                <label htmlFor="convective-initiation">convective initiation</label>

                <input type="checkbox" id="other" onChange={this.getEventType} value="other"  />
                <label htmlFor="other">other</label>
              </div>
          </div>

          <p>Weather Event End Day and Time:</p>
          <div className="datetime-input">
            <input type="date"
                   aria-label={"weather event end day"}
                   aria-required="true"
                   name="endDay"
                   min="2018-01-01"
                   required
                   defaultValue={this.props.today}
            />
            <input type="time"
                   aria-label={"weather event end time"}
                   aria-required="true"
                   name="endTime"
                   min="00:00"
                   max="23:59"
                   required
                   defaultValue={this.props.timeNow}
              />
          </div>
          <label htmlFor="summary">Weather Event Summary:</label>
          <textarea name="summary"
                    cols="50"
                    rows="10"
          />
          <input type="submit" className="form-enter-data" value="enter data" />
        </form>
      </div>
    )
  }
 }
