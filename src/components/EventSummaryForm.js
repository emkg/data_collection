import React from 'react';
import moment from 'moment';
import cx from 'classnames';

// TODO: add esdoc


const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class EventSummaryForm extends React.Component {
  state = {
    radarSigs: [],
    radSigOtherChecked: false,
    eventTypeOtherChecked: false
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
              <label htmlFor="downburst">
                <input type="checkbox" id="downburst" onChange={this.collectRadarSigs} value="downburst" />
                downburst
              </label>

              <label htmlFor="hail">
                <input type="checkbox" id="hail" onChange={this.collectRadarSigs} value="hail" />
                hail
              </label>

              <label htmlFor="bow-echo">
                <input type="checkbox" id="bow-echo" onChange={this.collectRadarSigs} value="bow echo" />
                bow echo
              </label>

              <label htmlFor="TDS">
                <input type="checkbox" id="TDS" onChange={this.collectRadarSigs} value="TDS" />
                TDS
              </label>

              <label htmlFor="mesocyclone">
                <input type="checkbox" id="mesocyclone" onChange={this.collectRadarSigs} value="mesocyclone" />
                mesocyclone
              </label>

              <label htmlFor="TVS">
                <input type="checkbox" id="TVS" onChange={this.collectRadarSigs} value="TVS" />
                TVS
              </label>

              <label htmlFor="refreezing">
                <input type="checkbox" id="refreezing" onChange={this.collectRadarSigs} value="refreezing" />
                refreezing (winter)
              </label>
              <label htmlFor="radSigOtherValue">
                <input type="checkbox" id="radSigOther" name="radSigOtherValue" onChange={this.collectRadarSigs} value={this.state.radarSigsOtherValue} />
                {this.state.radSigOtherChecked
                  ?  (<input className="other-input" type="text" name="radSigOtherValue" />)
                  :  (<React.Fragment>other</React.Fragment>)
                }
              </label>




            </div>
         </div>

         <div className="checkform">
            <h3>Event Type</h3>
              <div>
                <label htmlFor="tornadic-supercell">
                  <input type="checkbox" id="tornadic-supercell" onChange={this.getEventType} value="tornadic-supercell"  />
                  tornadic supercell
                </label>

                <label htmlFor="nontornadic-supercell">
                  <input type="checkbox" id="nontornadic-supercell" onChange={this.getEventType} value="nontornadic-supercell"  />
                  nontornadic supercell
                </label>

                <label htmlFor="quasi-linear-convextive-system">
                  <input type="checkbox"
                         id="quasi-linear-convextive-system"
                         onChange={this.getEventType}
                         value="quasi-linear convextive system"
                   />
                  quasi-linear convextive system
                </label>

                <label htmlFor="mutilcell-storms">
                  <input type="checkbox" id="mutilcell-storms" onChange={this.getEventType} value="mutilcell storms" />
                  mutilcell storms
                </label>

                <label htmlFor="mesoscale-convective-system">
                  <input type="checkbox" id="mesoscale-convective-system" onChange={this.getEventType} value="mesoscale convective system" />
                  mesoscale convective system
                </label>

                <label htmlFor="heavy-rain">
                  <input type="checkbox" id="heavy-rain" onChange={this.getEventType} value="heavy rain/flash flooding"  />
                  heavy rain/flash flooding
                </label>



                <label htmlFor="winter-precipitation">
                  <input type="checkbox" id="winter-precipitation" onChange={this.getEventType} value="winter precipitation" />
                  winter precipitation
                </label>

                <label htmlFor="convective-initiation">
                  <input type="checkbox" id="convective-initiation" onChange={this.getEventType} value="convective initiation" />
                  convective initiation
                </label>

                <label htmlFor="eventTypeOtherValue">
                  <input type="checkbox" id="radSigOther" name="eventTypeOtherValue" onChange={this.collectRadarSigs} value={this.state.eventTypeOtherValue} />
                  {this.state.eventTypeOtherChecked
                    ?  (<input className="other-input" type="text" name="eventTypeOtherValue" />)
                    :  (<React.Fragment>other</React.Fragment>)
                  }
                </label>
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
