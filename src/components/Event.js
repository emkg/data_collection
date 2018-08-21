import React from 'react';
import Collection from './Collection';
import EventSummaryForm from './EventSummaryForm';
import Summary from './Summary';


// TODO: establish correct event id, validate this

const stop = (event) => (event.stopPropagation(), event.preventDefault());
// we do want a list of mobile radars because mobile radars need locations
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
   * String mode, Array collections
   * String instrument, boolean mobile, Object weatherEventData
   */
  state = {
    mode: "begin", // "collect" or "end"
    collections: [],
  };

  componentDidMount() {
    try {
      const savedState = JSON.parse(
                          decodeURIComponent(
                            document.cookie.replace(
                              /(?:(?:^|.*;\s*)eventState\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                            )
                          );
      this.setState(savedState);
    }
    catch(err) {
      console.log("There is no saved state.")
    }
  }

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
    this.saveState();
  }

  saveState() {
    document.cookie = "eventState=" + encodeURIComponent(JSON.stringify(this.state));
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
    this.setState({ weatherEventData: { instrument: instrument }, mobile });
  }

  /**
   * handleKickoffSubmit changes the mode to "collect",
   * saves initial event info, and if the instrument
   * is mobile, adds the first collection to state
   */
  handleKickoffSubmit = (event) => {
    stop(event);

    const event_info = {
      eventstartday: event.target.eventstartday.value,
      eventstarttime: event.target.eventstarttime.value
    }

    if(this.state.mobile) {
      const initCollection = {...event_info,
          collectionID: event.target.initID.value,
          locationLat: event.target.lat.value,
          locationLong: event.target.long.value
        };
      //this.setState({ initID: initCollection.collectionID })
      this.saveData(initCollection);
    }

    this.setState({
      mode: "collect",
      weatherEventData: {
        eventstartday: event_info.eventstartday,
        eventstarttime: event_info.eventstarttime
      }
    });
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
  handleEventSummarySubmit = (finalWeatherEventData) => {
    const weatherEventData = Object.assign(this.state.weatherEventData, finalWeatherEventData);
    this.setState({weatherEventData, mode: "end" })
  }

  /**
   *  Event renders different forms depending on the
   *  mode in state.
   *  @return Instrument if mode "begin", Collection
   *  if mode "collect", EventSummaryForm if mode is
   *  "summary", and a Summary if mode is "end".
   */
  render() {
    return (
      <div className="event">
        {this.state.mode === "begin" ?
          ( <div className="kickoff">
              <form onSubmit={this.handleKickoffSubmit}>
                Weather Event Start:
                <div className="datetime-input">
                  <input type="date" name="eventstartday" min="2018-01-01"/>
                  <input type="time" name="eventstarttime" min="00:00" max="23:59" />
                </div>
                <input type="number" name="initID" placeholder="Daily Collection Number"/>

                Instrument:
                <select name="instrument" onChange={this.handleInstrument}>
                  <option value="KOUN">KOUN</option>
                  <option value="NOXP">NOXP</option>
                </select>
                {this.state.mobile && (
                  <div>
                    <input type="number" name="lat" placeholder="lat"/>
                    <input type="number" name="long" placeholder="long"/>
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
                  mobile={this.state.mobile} />)

            : this.state.mode === "summary"

              ? (<EventSummaryForm handleSubmit={this.handleEventSummarySubmit} />)
              : (<Summary eventOver={this.props.eventOver}
                          weatherEventData={this.state.weatherEventData}
                          collections={this.state.collections}/>)
        }
      </div>
    )
  }
 }
