import React from 'react';
import PropsTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';



// prevent page from refreshing when form is submitted.
const stop = (event) => (event.stopPropagation(), event.preventDefault());

/**
 * EventSummaryForm stores the form elements necessary to
 *  summarize a weather event. It is the last step in the
 * data collection process before the preview in Summary.
 */
export default class EventSummaryForm extends React.Component {
  /**
   * state stores the checked radar signatures and event types
   * (both arrays) and the strings typed in the "other" input when
   * that option gets checked
   */
  state = {
    radarSigs: [],
    eventTypes: [],
    radSigOtherChecked: false,
    eventTypeOtherChecked: false
  }

  /**
   * collects the checks from the radar signatures check form
   *   is essentially identical to getEventType
   *  @param {event} event - the event from the input elements
   */
  getRadarSigs = (event) => {
    // DRY this up! needs to be modularized
    const target = event.target;
    let { radarSigs } = this.state;
    target.checked ?
      ( radarSigs.push(target.value) ) :
      ( radarSigs = radarSigs.filter( e => e !== target.value))
    this.setState({ radarSigs });
  }

  /**
   * collects the checks from the event types check form
   *    is essentially identical to getRadarSigs
   * @param {event} event - the event from the input elements
   */
  getEventType = (event) => {
    // DRY this up! needs to be modularized
    const target = event.target;
    let { eventTypes } = this.state;
    target.checked ?
      ( eventTypes.push(target.value) ) :
      ( eventTypes = eventTypes.filter( e => e !== target.value))

    this.setState({ eventTypes });
  }

  /**
   * Updates the state of the other option in
   *  all check forms
   * @param {event} event - the event from the input element
   */
  handleOtherChecks = (event) => {
    const target = event.target;
    const name = target.name;
    this.setState({ [name] : target.checked });
  }

  /**
   * stores the value of the new text input element that appears
   * when the other option is checked on either checkform in state
   *
   * @param {event} event - the event from the input element
   */
  handleOtherInput = (event) => {
    stop(event);
    this.setState({ [event.target.name] : event.target.value })
  }

  /**
   * gathers values put in the "other" text input if they exist
   *  and appends them to existing arrays for radarSigs and eventTypes
   */
  getOtherValues() {
    let { radarSigs, eventTypes } = this.state;
    this.state.radSigOtherValue && radarSigs.push(this.state.radSigOtherValue);
    this.state.eventTypeOtherValue && eventTypes.push(this.state.eventTypeOtherValue);
    this.setState({ radarSigs, eventTypes })
  }

  /**
   * saves weather event summary data to the Event
   *  @param {event} event - the event from the input element
   */
  handleSubmit = (event) => {
    stop(event);
    const e = event.target;
    this.getOtherValues();
    const data = {
      eventType: this.state.eventTypes.toString(),
      eventRadarSigs: this.state.radarSigs.toString(),
      eventEnd: this.props.convertTime(e.endDay.value, e.endTime.value),
      eventDescription: e.summary.value
    }
    this.props.handleSubmit(data);
  }

  /**
   * @return {jsx} a fully accessible form including two checkforms,
   *  date, time, and a text field for summary information.
   *
   */
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
                <input type="checkbox" id="downburst" onChange={this.getRadarSigs} value="downburst" />
                downburst
              </label>

              <label htmlFor="hail">
                <input type="checkbox" id="hail" onChange={this.getRadarSigs} value="hail" />
                hail
              </label>

              <label htmlFor="bow-echo">
                <input type="checkbox" id="bow-echo" onChange={this.getRadarSigs} value="bow echo" />
                bow echo
              </label>

              <label htmlFor="TDS">
                <input type="checkbox" id="TDS" onChange={this.getRadarSigs} value="TDS" />
                TDS
              </label>

              <label htmlFor="mesocyclone">
                <input type="checkbox" id="mesocyclone" onChange={this.getRadarSigs} value="mesocyclone" />
                mesocyclone
              </label>

              <label htmlFor="TVS">
                <input type="checkbox" id="TVS" onChange={this.getRadarSigs} value="TVS" />
                TVS
              </label>

              <label htmlFor="refreezing">
                <input type="checkbox" id="refreezing" onChange={this.getRadarSigs} value="refreezing" />
                refreezing (winter)
              </label>
              <label htmlFor="radSigOtherChecked">
                <input type="checkbox" id="radSigOther" name="radSigOtherChecked" onChange={this.handleOtherChecks} value={this.state.radarSigsOtherValue} />
                {this.state.radSigOtherChecked
                  ?  (<input className="other-input" type="text" name="radSigOtherValue" onChange={this.handleOtherInput}/>)
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

                <label htmlFor="eventTypeOtherChecked">
                  <input type="checkbox" id="radSigOther" name="eventTypeOtherChecked" onChange={this.handleOtherChecks} value={this.state.eventTypeOtherValue} />
                  {this.state.eventTypeOtherChecked
                    ?  (<input className="other-input" type="text" name="eventTypeOtherValue" onChange={this.handleOtherInput}/>)
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
          <Button variant="contained" size="small" type="submit" aria-label="Save Data" aria-required="true">
            <SaveIcon  /> Save
          </Button>
        </form>
      </div>
    )
  }
 }

 EventSummaryForm.propTypes = {
   
 }
