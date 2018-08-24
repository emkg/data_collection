import React from 'react';
import Collection from './Collection';
import EventSummaryForm from './EventSummaryForm';
import Summary from './Summary';
import uuidv4 from 'uuid/v4';


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
    eventID: uuidv4()
  };


  /**
   * Retreive saved cookie in case data submission was interrupted.
   *
   */
  componentDidMount() {
    try {
      const savedState = JSON.parse(
                          decodeURIComponent(
                            document.cookie.replace(
                              /(?:(?:^|.*;\s*)eventState\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                            )
                          );
      this.setState({...savedState, mode: "begin", mobile: false});
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
   * handleKickoffSubmit changes the mode to "collect",
   * saves initial event info, and if the instrument
   * is mobile, adds the first collection to state
   * @param event - the event from the form submit
   */
  handleKickoffSubmit = (event) => {
    stop(event);

    const event_info = {
      eventstartday: event.target.eventstartday.value,
      eventstarttime: event.target.eventstarttime.value
    }

    if(this.state.mobile) {
      const initCollection = {...event_info,
          dailyCollectionNumber: event.target.initID.value,
          locationLat: event.target.lat.value,
          locationLong: event.target.long.value
        };
      //this.setState({ initID: initCollection.collectionID })
      this.saveData(initCollection);
    }

    const instrument = event.target.instrument.value;
    const mobile = mobileInstruments.includes(instrument);

    this.setState({
      mode: "collect",
      mobile: mobile,
      weatherEventData: {
        eventstartday: event_info.eventstartday,
        eventstarttime: event_info.eventstarttime,
        instrument: instrument
      }
    });

    this.saveState();
  }

  /**
   * handleEndCollection changes the mode to "summary".
   * passed as function prop to Collection.
   */
  handleEndCollection = () => {
    this.setState({ mode: "summary" })
    this.saveState();
  }

  /**
   * handleEventSummary stores the summary data and flips mode to "end".
   * sent as function prop to EventSummaryForm
   */
  handleEventSummarySubmit = (finalWeatherEventData) => {
    const weatherEventData = Object.assign(this.state.weatherEventData, finalWeatherEventData);
    this.setState({weatherEventData, mode: "end" })
    this.saveState();
  }

  isMobile = (event) => {
      stop(event);
      mobileInstruments.includes(event.target.value)
      ? this.setState({ mobile : true })
      : this.setState({ mobile : false })
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
                  <input type="date" name="eventstartday" min="2018-01-01" defaultValue={new Date().toJSON().slice(0,10)}/>
                  <input type="time" name="eventstarttime" min="00:00" max="23:59" defaultValue={new Date().toJSON().slice(11,16)}/>
                </div>
                <input type="number" name="initID" placeholder="Daily Collection Number"/>

                Instrument:
                <select name="instrument" onChange={this.isMobile}>
                  <option value="KOUN">KOUN</option>
                  <option value="NOXP">NOXP</option>
                </select>
                {this.state.mobile && (
                  <div>
                    <input type="number" name="lat"  placeholder="lat" />
                    <input type="number" name="long" placeholder="long" />
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
                  mobile={this.state.mobile}
                  eventID={this.state.eventID} />)

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
