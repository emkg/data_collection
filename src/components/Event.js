import React from 'react';
import Collection from './Collection';
import EventSummaryForm from './EventSummaryForm';
import Summary from './Summary';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import Select from 'react-select';

const stop = (event) => (event.stopPropagation(), event.preventDefault());
// we do want a list of mobile radars because mobile radars need locations
const mobileInstruments = ['NOXP'];
const options = [ { value: 'KOUN', label: "KOUN" }, { value: 'NOXP' , label: 'NOXP' }];

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
    eventID: uuidv4(),
    today: new Date().toJSON().slice(0,10),
    selectedOption: null
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

  convertTime = (day, time) => {
    return moment(`${day} ${time}`).utc().format()
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
      eventStart: this.convertTime(event.target.eventstartday.value,
                                  event.target.eventstarttime.value)
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

    const instrument = this.state.selectedOption.value;
    const mobile = mobileInstruments.includes(instrument);

    this.setState({
      mode: "collect",
      mobile: mobile,
      weatherEventData: {
        eventStart: event_info.eventStart,
        instrument: instrument,
        collector: event.target.collector.value,
        collectorEmail: event.target.collectorEmail.value
      }
    });

    this.saveState();
    window.scrollTo(0,0);
  }

  /**
   * handleEndCollection changes the mode to "summary".
   * passed as function prop to Collection.
   */
  handleEndCollection = () => {
    this.setState({ mode: "summary" })
    this.saveState();
    window.scrollTo(0,0);
  }

  /**
   * handleEventSummary stores the summary data and flips mode to "end".
   * sent as function prop to EventSummaryForm
   */
  handleEventSummarySubmit = (finalWeatherEventData) => {
    let weatherEventData = Object.assign(this.state.weatherEventData, finalWeatherEventData);
    weatherEventData = {...weatherEventData, eventID: this.state.eventID};
    this.setState({weatherEventData, mode: "end" })
    this.saveState();
    window.scrollTo(0,0);
  }

  isMobile = (selectedOption) => {
      mobileInstruments.includes(selectedOption.value)
      ? this.setState({ mobile : true, selectedOption })
      : this.setState({ mobile : false, selectedOption })
  }

  getTimeNow = () => {
    return new moment().utc().toJSON().slice(11,16);
  }

  /**
   *  Event renders different forms depending on the
   *  mode in state.
   *  @return Instrument if mode "begin", Collection
   *  if mode "collect", EventSummaryForm if mode is
   *  "summary", and a Summary if mode is "end".
   */
  render() {
    const { selectedOption } = this.state;
    return (
      <div className="event">
        {this.state.mode === "begin" ?
          ( <div className="kickoff">
              <form onSubmit={this.handleKickoffSubmit}>

                <label htmlFor="collector">Your name:</label>
                <input type="text" name="collector" placeholder="Jane Doe"/>
                <label htmlFor="collectorEmail">A good contact email:</label>
                <input type="email" name="collectorEmail" placeholder="jane.doe@noaa.gov"/>
                <p>  Weather Event Start:</p>
                <div className="datetime-input">
                  <input type="date"
                         aria-label={"weather event start day"}
                         aria-required="true"
                         name="eventstartday"
                         min="2018-01-01"
                         required
                         defaultValue={this.state.today}
                  />
                  <input type="time"
                         aria-label={"weather event start time"}
                         aria-required="true"
                         name="eventstarttime"
                         min="00:00"
                         max="23:59"
                         required
                         defaultValue={this.getTimeNow()}
                  />
                </div>

                <label htmlFor="initID">Daily Collection Number:</label>
                <input type="number" name="initID" placeholder="1"/>

                <p>Instrument:</p>
                <Select aria-label="Select an instrument"
                        aria-required="true"
                        onChange={this.isMobile}
                        options={options} value={selectedOption}/>
                {this.state.mobile && (
                  <div>
                    <input aria-label={"lattitude"}
                           aria-required="true"
                           type="number"
                           name="lat"
                           placeholder="lat" />
                    <input type="number"
                           aria-label={"longitude"}
                           aria-required="true"
                           name="long"
                           placeholder="long" />
                  </div>
                )}

                <input className="form-enter-data" value="GO!" type="submit" />
              </form>
            </div>
          )
          : this.state.mode === "collect"

            ? (<Collection
                  convertTime={this.convertTime}
                  saveData={this.saveData}
                  endCollection={this.handleEndCollection}
                  mobile={this.state.mobile}
                  eventID={this.state.eventID}
                  timeNow={this.getTimeNow()}
                  today={this.state.today}
                  snackbar={this.props.snackbar}
                  convertTime={this.convertTime}
                  handleSubmit={this.handleEventSummarySubmit}
                />)

            : this.state.mode === "summary"

              ? (<EventSummaryForm
                          convertTime={this.convertTime}
                          handleSubmit={this.handleEventSummarySubmit}
                          timeNow={this.getTimeNow()}
                          today={this.state.today}
                 />)
              : (<Summary eventOver={this.props.eventOver}
                          weatherEventData={this.state.weatherEventData}
                          collections={this.state.collections}
                          snackbar={this.props.snackbar}
                 />)
        }
      </div>
    )
  }
 }
