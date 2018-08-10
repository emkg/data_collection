import React from 'react';
import Instrument from './Instrument';
import Collection from './Collection';
import EventSummaryForm from './EventSummaryForm';
import Summary from './Summary';

import DayPickerInput from 'react-day-picker';
import 'react-day-picker/lib/style.css';



// TODO: establish correct event id, validate this

// we do want a list of mobile radars because mobile radars need locations
const stop = (event) => (event.stopPropagation(), event.preventDefault());
const mobileInstruments = ['NOXP'];


/**
 * An Event is the object that stores data collections.
 * If an instrument is stationary, an Event will have
 * one collectionID for its collections.
 * If an instrument is mobile, then the event will
 * have a new collectionID for every location update.
 */
export default class Event extends React.Component {
  /**
   * String mode, Number collectionID, Array collections
   * String instrument, boolean mobile, Object weatherEventData
   */
  state = {
    mode: "begin", // "collect" or "end"
    collectionID: 0,
    collections: [],

  };

  /**
   * saveData pushes a new data object into the
   * collections array and saves it to state.
   * Each "collection" is an object from
   * a specific state of the Form in Collection.
   *
   * @param data - a data object.
   */
  saveData = (data) => {
    const { collections } = this.state;
    collections.push(data);
    this.setState( { collections } )
  }

  /**
   * handleInstrument stores the instrument in state,
   * determines if we're mobile and therefore controls whether
   * or not we see location fields rendered for the Event.
   * @param event - the change event from select option fields
   */
  handleInstrument = (event) => {
    stop(event);
    const instrument = event.target.value;
    const mobile = mobileInstruments.includes(instrument);
    this.setState({ instrument, mobile });
  }

  handleKickoffSubmit = (event) => {
    stop(event);
    // TODO: gather up the event data
    this.setState({ mode: "collect" });
  }

  /**
   * handleEndCollection changes the mode to "summary".
   * passed as function prop to Collection.
   */
  handleEndCollection = () => {
    this.setState({ mode: "summary" })
  }

  /**
   * handleEventSummary stores the summary data and flips mode to "end".
   * sent as function prop to EventSummaryForm
   */
  handleEventSummary = (weatherEventData) => {
    this.setState({ weatherEventData, mode: "end" })
  }

  /**
   *  handleSubmit will send the full state of this weather event
   *  to storage. Send Thankyou to app. Submits this Event.
   */
  handleSubmit = () => {
    // TODO: send state data to a fetch method
    this.props.eventOver("Your data has been collected!");
  }

  /**
   *  Event renders different forms depending on the
   *  mode in state.
   *  @return Instrument if mode "begin", Collection
   *  if mode "collect", EventSummaryForm if mode is
   *  "summary", and a Summary if mode is "end".
   *
   */
  render() {
    return (
      <div className="event">
        {this.state.mode === "begin" ?
          ( <div className="kickoff">
              <form onSubmit={this.handleKickoffSubmit}>
                <DayPickerInput />
                <select name="instrument" onChange={this.handleInstrument}>
                  <option value="KOUN">KOUN</option>
                  <option value="NOXP">NOXP</option>
                </select>
                <input type="time" name="time" min="00:00" max="23:59" />
                {this.state.mobile && (
                  <div>
                    <input type="number" placeholder="lat"/>
                    <input type="number" placeholder="long"/>
                  </div>
                )}
                <input type="submit" />
              </form>
            </div>
          )
          : this.state.mode === "collect"

            ? (<Collection
                  saveData={this.saveData}
                  endCollection={this.handleEndCollection}
                  collectionID={this.state.collectionID}
                  mobile={this.state.mobile} />)

            : this.state.mode === "summary"

              ? (<EventSummaryForm  handleSubmit={this.handleEventSummary} />)
              : (<div>
                    <Summary  data={this.state}/>
                    <div className="new-collection"
                       onClick={this.handleSubmit}>{"It's ALL GOOD!"}
                    </div>
                  </div>
                )
        }
      </div>
    )
  }
 }
