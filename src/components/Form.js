import React from 'react';
import PropsTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import EventSummaryForm from './EventSummaryForm';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

// a json list of all the counties in Oklahoma.
// Required format for options in react-select component
const options = [
  { value: 'Alfalfa', label: 'Alfalfa' },
  { value: 'Atoka', label: 'Atoka' },
  { value: 'Beaver', label: 'Beaver' },
  { value: 'Beckham', label: 'Beckham' },
  { value: 'Blaine', label: 'Blaine' },
  { value: 'Bryan', label: 'Bryan' },
  { value: 'Caddo', label: 'Caddo' },
  { value: 'Canadian', label: 'Canadian' },
  { value: 'Carter', label: 'Carter' },
  { value: 'Cherokee', label: 'Cherokee' },
  { value: 'Choctaw', label: 'Choctaw' },
  { value: 'Cimarron', label: 'Cimarron' },
  { value: 'Cleveland', label: 'Cleveland' },
  { value: 'Coal', label: 'Coal' },
  { value: 'Comanche', label: 'Comanche' },
  { value: 'Cotton', label: 'Cotton' },
  { value: 'Craig', label: 'Craig' },
  { value: 'Creek', label: 'Creek' },
  { value: 'Custer', label: 'Custer' },
  { value: 'Delaware', label: 'Delaware' },
  { value: 'Dewey', label: 'Dewey' },
  { value: 'Ellis', label: 'Ellis' },
  { value: 'Garfield', label: 'Garfield' },
  { value: 'Garvin', label: 'Garvin' },
  { value: 'Grady', label: 'Grady' },
  { value: 'Grant', label: 'Grant' },
  { value: 'Greer', label: 'Greer' },
  { value: 'Harmon', label: 'Harmon' },
  { value: 'Harper', label: 'Harper' },
  { value: 'Haskell', label: 'Haskell' },
  { value: 'Hughes', label: 'Hughes' },
  { value: 'Jackson', label: 'Jackson' },
  { value: 'Jefferson', label: 'Jefferson' },
  { value: 'Johnston', label: 'Johnston' },
  { value: 'Kay', label: 'Kay' },
  { value: 'Kingfisher', label: 'Kingfisher' },
  { value: 'Kiowa', label: 'Kiowa' },
  { value: 'Latimer', label: 'Latimer' },
  { value: 'Le Flore', label: 'Le' },
  { value: 'Lincoln', label: 'Lincoln' },
  { value: 'Logan', label: 'Logan' },
  { value: 'Love', label: 'Love' },
  { value: 'Major', label: 'Major' },
  { value: 'Marshall', label: 'Marshall' },
  { value: 'Mayes', label: 'Mayes' },
  { value: 'McClain', label: 'McClain' },
  { value: 'McCurtain', label: 'McCurtain' },
  { value: 'McIntosh', label: 'McIntosh' },
  { value: 'Murray', label: 'Murray' },
  { value: 'Muskogee', label: 'Muskogee' },
  { value: 'Noble', label: 'Noble' },
  { value: 'Nowata', label: 'Nowata' },
  { value: 'Okfuskee', label: 'Okfuskee' },
  { value: 'Oklahoma', label: 'Oklahoma' },
  { value: 'Okmulgee', label: 'Okmulgee' },
  { value: 'Osage', label: 'Osage' },
  { value: 'Ottawa', label: 'Ottawa' },
  { value: 'Pawnee', label: 'Pawnee' },
  { value: 'Payne', label: 'Payne' },
  { value: 'Pittsburg', label: 'Pittsburg' },
  { value: 'Pontotoc', label: 'Pontotoc' },
  { value: 'Pottawatomie', label: 'Pottawatomie' },
  { value: 'Pushmataha', label: 'Pushmataha' },
  { value: 'Roger Mills', label: 'Roger' },
  { value: 'Rogers', label: 'Rogers' },
  { value: 'Seminole', label: 'Seminole' },
  { value: 'Sequoyah', label: 'Sequoyah' },
  { value: 'Stephens', label: 'Stephens' },
  { value: 'Texas', label: 'Texas' },
  { value: 'Tillman', label: 'Tillman' },
  { value: 'Tulsa', label: 'Tulsa' },
  { value: 'Wagoner', label: 'Wagoner' },
  { value: 'Washington', label: 'Washington' },
  { value: 'Washita', label: 'Washita' },
  { value: 'Woods', label: 'Woods' },
  { value: 'Woodward', label: 'Woodward' }
]

// prevent default form behavior so app doesn't refresh on submit
const stop = (event) => (event.stopPropagation(), event.preventDefault());

/**
 * Form is the master form where all the data is input.
 * Form renders only the fields needed based on the
 *  className prop.
 */
export default class Form extends React.Component {
  /**
   * state stores a Map of collection json objects and a
   * selectedOption string for the sake of the react-select Component
   * (especially important for the multi select option presented in Form)
   */
  state = {
    submitted: new Map(),
    selectedOption: null
  }

  /**
   * When Component unmounts, we need to save all of the data we
   * stored in this.state.submitted, the map of json objects
   * made by each collection "submit"
   */
  componentWillUnmount() {
    // we tack a collectionEnd property onto the end of each object in submitted Map
    // and we set that value to now ... this will likely be a problem based on the timing
    // of this operation
    for(let [key, val] of this.state.submitted) {
      this.props.saveData({...val, collectionEnd: new moment().utc().format()});
    }
  }

  /**
   * updates the array of options saved to state based on what is
   * chosen by the user on the react-select component
   * @param {Array<Object>} selectedOption - an array of json with label and value sent
   *   from react-select multi component
   */
  selectOnChange = (selectedOption) => {
    this.setState({ selectedOption })
  }

  /**
   * converts the array of json to a list in String format (what our DB requires)
   * @return {String} flat list / array to string
   */
  getSelectedCounties() {
    return this.state.selectedOption.map( option => ( option.value )).toString();
  }

  /**
   * handleSubmit collects the data from the
   *  form based on the className and sends it
   *  up to parent. Also clears form.
   * @param {event} event - the default event from the submit button
   */
  handleSubmit = (event) => {
    // prevent page refresh
    stop(event);
    // shorten this bc it will be repeated a lot
    const e = event.target;

    // we need start day and time for all collections
    const startDay = e.startDay.value;
    const startTime = e.startTime.value;

    // data we'll append to for each collection type
    const data = {
      eventID: this.props.eventID,
      collectionID: this.props.collectionID,
      collectionStart: this.props.convertTime(startDay, startTime), // combine for one utc time stamp
      collectionType: this.props.className,
      dailyCollectionNumber: this.props.dailyCollectionNumber
    }

    /* what we want is to add the type of the event
    // to the "submitted" map in state.
    // Let the start time of the new collection of the same type
    // that was previously saved be the end time for the older collection
    // of this type. There can only be one one collection of a kind
    // in the map, so we save it to Event as soon as we need to replace it.
    */
    let { submitted } = this.state;

    if(submitted.get(data.collectionType)) {
        submitted.get(data.collectionType).collectionEnd = data.collectionStart;
        this.props.saveData(submitted.get(data.collectionType))
    } // we have to save this collection or else we'll overwrite it

    // based on className, store specific fields in object and saveData.
    // not very DRY, is goal to condense this code if possible
    if(this.props.className === "loc") {
        const location = {...data,
          collectionID: this.props.handleNewLocation(e.dcn.value),
          dailyCollectionNumber: e.dcn.value,
          locationLat: e.lat.value,
          locationLong: e.long.value,
        };
        e.lat.value = ""; e.long.value = "";
        submitted.set(data.collectionType, location);
        this.setState({ submitted });
    } else if(this.props.className === "vcp") {
        const vcp = {...data, VCP: e.vcp.value};
        e.vcp.value = "";
        submitted.set(data.collectionType, vcp);
        this.setState({ submitted });
    } else if(this.props.className === "sector") {
        const sector = {...data,
          sectorStart: e.sectorStart.value,
          sectorEnd: e.sectorEnd.value
        };
        e.sectorStart.value = ""; e.sectorEnd.value = "";
        submitted.set(data.collectionType, sector);
        this.setState({ submitted });
    } else if (this.props.className === "rhi") {
        const rhi = {...data,
          rhiStart: e.rhiStart.value,
          rhiEnd: e.rhiEnd.value,
          azimuth: e.azimuth.value,
          rhiRemark: e.rhiRemark.value
        };
        submitted.set(data.collectionType, rhi);
        this.setState({ submitted });
    } else if(this.props.className === "warning") {
        const warning = {...data,
          warningType: e.warningType.value,
          warningCounties: this.getSelectedCounties(),
          warningText: e.warningText.value
        };
        e.warningType.value = "";
        e.warningText.value = "";
        submitted.set(data.collectionType, warning);
        this.setState({ submitted, selectedOption: null });
    } else if(this.props.className === "report") {
        const report = {...data, reportText: e.reportText.value };
        e.reportText.value = "";
        submitted.set(data.collectionType, report);
        this.setState({ submitted });
    } else {
        // remark
        const remark = {...data, remark: e.remark.value};
        e.remark.value = "";
        submitted.set(data.collectionType, remark);
        this.setState({ submitted });
    }
    // w00t: show a green snackbar that says 'Data saved!'
    this.props.snackbar('success', 'Data saved!');
  }

  /**
   * renders the form elements based on className prop (based on openTab from Collection)
   * @return {jsx} only the fields appropriate for the className
   */
  render() {
    const { selectedOption } = this.state;
    if(this.props.className !== "eventEnd") {
      return (
        <div className={cx(this.props.className)}>
          <form onSubmit={this.handleSubmit}>
             <p>{`Start Time for ${this.props.className}`}</p>
             <div className="datetime-input">
                <input type="date"
                       aria-label={"weather event start day"}
                       aria-required="true"
                       name="startDay"
                       min="2018-01-01"
                       defaultValue={this.props.today}
                />
                <input type="time"
                       aria-label={`start time for ${this.props.className}`}
                       aria-required="true"
                       name="startTime"
                       min="00:00"
                       max="23:59"
                       required
                       defaultValue={this.props.timeNow}
                />
              </div>
             {this.props.className === "loc" && (
               <div>
                  <label htmlFor="">Location Lattitude:</label>
                  <input type="number" name="lat" step=".01"/>
                  <label htmlFor="">Location Longitude</label>
                  <input type="number" name="long" step=".01"/>
                  <label htmlFor="">Daily Collection ID:</label>
                  <input type="number" name="dcn" />
               </div>
             )}

             {this.props.className === "vcp" && (
               <div>
                  <label htmlFor="vcp">VCP:</label>
                  <input type="text" name="vcp" />
               </div>
             )}

             {this.props.className === "sector" && (
               <div>
                  <label htmlFor="sectorStart">Start Sector (Left Edge):</label>
                  <input type="number" name="sectorStart" step=".01"/>
                  <label htmlFor="sectorEnd">End Sector (Right Edge):</label>
                  <input type="number" name="sectorEnd" step=".01"/>
               </div>
             )}

             {this.props.className === "rhi" && (
               <div>
                  <label htmlFor="rhiStart">Start Edge (Bottom):</label>
                  <input type="number" name="rhiStart" step=".01"/>
                  <label htmlFor="rhiEnd">End Edge (Top):</label>
                  <input type="number" name="rhiEnd" step=".01"/>
                  <label htmlFor="azimuth">Azimuth:</label>
                  <input type="text" name="azimuth" />
                  <label htmlFor="rhiRemark">Remarks:</label>
                  <textarea  cols="20" rows="10" name="rhiRemark" />
               </div>
             )}

             {this.props.className === "warning" && (
               <div>
                 <div className="external-link">
                   <a href="https://www.weather.gov"
                      target="_blank"
                      rel="noopener noreferrer">
                     {"Lookup Warnings"}
                   </a>
                 </div>
                 <label htmlFor="warningType">Warning Type:</label>
                 <input name="warningType" type="text" placeholder="tornado? severe thunderstorm?" />
                  <p>Warning Counties:</p>
                  <Select aria-label="select counties for warning"
                          aria-required="true"
                          options={options}
                          isMulti={true}
                          onChange={this.selectOnChange} value={selectedOption}
                  />
                  <br/>
                  <br/>
                  <label htmlFor="warningText">Warning Text:</label>
                  <textarea name="warningText" cols="50" rows="10" placeholder={this.props.warningText}/>
               </div>
             )}

             {this.props.className === "report" && (
               <div>
                  <div className="external-link">
                    <a href="https://www.spc.noaa.gov/climo/reports/today.html"
                       target="_blank"
                       rel="noopener noreferrer">
                      {"Search Today's Reports"}
                    </a>
                  </div>
                  <label htmlFor="reportText">Report Text:</label>
                  <textarea name="reportText" cols="50" rows="10" placeholder={this.props.reportText}/>
               </div>
             )}

             {this.props.className === "remark" && (
               <div>
                  <label htmlFor="remark">Remarks:</label>
                  <textarea name="remark" cols="50" rows="10" placeholder={this.props.remarks}/>
               </div>
             )}

              <Button variant="contained" size="small" type="submit" aria-label="Save Data" aria-required="true">
                <SaveIcon  /> Save
              </Button>

          </form>
        </div>
      )
    } else {
      return(
        <EventSummaryForm
            convertTime={this.props.convertTime}
            handleSubmit={this.props.handleSubmit}
            timeNow={this.props.timeNow}
            today={this.props.today}
        />
      )
    }
  }
 }

 Form.propTypes = {
   
 }
