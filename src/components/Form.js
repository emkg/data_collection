import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import Select from 'react-select';

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

// TODO: accessibility


// prevent default form behavior so app doesn't refresh on submit
const stop = (event) => (event.stopPropagation(), event.preventDefault());

/**
 * Form is the master form where all the data is input.
 * Form renders only the fields needed based on the
 *  className prop.
 */
export default class Form extends React.Component {
  state = {
    submitted: new Map(),
    selectedOption: null
  }


  componentWillUnmount() {
    for(let [key, val] of this.state.submitted) {
      this.props.saveData({...val, collectionEnd: new moment().utc().format()});
      //default end time is now since they didn't overwrite it
    }
  }

  selectOnChange = (selectedOption) => {
    this.setState({ selectedOption })
    // this is an array of options in json with label and value
  }

  getSelectedCounties() {
    return this.state.selectedOption.map( option => ( option.value )).toString();
  }

  /**
   * handleSubmit collects the data from the
   *  form based on the className and sends it
   *  up to parent. Also clears form.
   */
  handleSubmit = (event) => {
    stop(event);  // do not let app refresh here
    const e = event.target;
    const startDay = e.startDay.value;
    const startTime = e.startTime.value;
    // data we always need
    const data = {
      eventID: this.props.eventID,
      collectionID: this.props.collectionID,
      collectionStart: this.props.convertTime(startDay, startTime),
      collectionType: this.props.className,
      dailyCollectionNumber: this.props.dailyCollectionNumber
    }

    // what we want is to add the type of the event
    // to submitted with the submitted map
    // the start time of the new event of the same type
    // as one previously saved needs to be the end time
    // for the last event of that type
    let { submitted } = this.state;

    if(submitted.get(data.collectionType)) {
        submitted.get(data.collectionType).collectionEnd = data.collectionStart;
        this.props.saveData(submitted.get(data.collectionType))
    } // we have to submit this collection or else we'll overwrite it

    // based on className, store certain fields in object
    // and saveData.
    if(this.props.className === "loc") {
        const location = {...data,
          collectionID: this.props.handleNewLocation(e.dcn.value),
          dailyCollectionNumber: e.dcn.value,
          locationLat: e.lat.value,
          locationLong: e.long.value,
        };
        e.lat.value = ""; e.long.value = "";
        //this.props.saveData(location)
        submitted.set(data.collectionType, location);
        this.setState({ submitted });
    } else if(this.props.className === "vcp") {
        const vcp = {...data, VCP: e.vcp.value};
        e.vcp.value = "";
        //this.props.saveData(vcp);
        submitted.set(data.collectionType, vcp);
        this.setState({ submitted });
    } else if(this.props.className === "sector") {
        const sector = {...data,
          sectorStart: e.sectorStart.value,
          sectorEnd: e.sectorEnd.value
        };
        e.sectorStart.value = ""; e.sectorEnd.value = "";
        //this.props.saveData(sector);
        submitted.set(data.collectionType, sector);
        this.setState({ submitted });
    } else if(this.props.className === "warning") {
        const warning = {...data,
          warningCounties: this.getSelectedCounties(),
          warningText: e.warningText.value
        };
        e.warningText.value = "";
        //this.props.saveData(warning);
        submitted.set(data.collectionType, warning);
        this.setState({ submitted, selectedOption: null });
    } else if(this.props.className === "report") {
        const report = {...data, reportText: e.reportText.value };
        e.reportText.value = "";
        //this.props.saveData(report);
        submitted.set(data.collectionType, report);
        this.setState({ submitted });
    } else {
        // remark
        const remark = {...data, remark: e.remark.value};
        e.remark.value = "";
        //this.props.saveData(remark);
        submitted.set(data.collectionType, remark);
        this.setState({ submitted });
    }

  }

  /**
   * renders the form elements based on className prop.
   * @return only the fields appropriate for the className
   */
  render() {
    const { selectedOption } = this.state;

    return (
      <div className={cx(this.props.className)}>
        <form onSubmit={this.handleSubmit}>
           <p>Start Time:</p>
           <div className="datetime-input">
              <input type="date" name="startDay" min="2018-01-01"
                      defaultValue={this.props.today}/>
              <input type="time" name="startTime" min="00:00" max="23:59" required
                      defaultValue={this.props.timeNow}/>
            </div>
           {this.props.className === "loc" && (
             <div>
                <p>Location Lattitude:</p>
                <input type="number" name="lat" />
                <p>Location Longitude</p>
                <input type="number" name="long" />
                <p>Daily Collection ID:</p>
                <input type="number" name="dcn" />
             </div>
           )}

           {this.props.className === "vcp" && (
             <div>
                <p>VCP:</p>
                <input type="text" name="vcp" />
             </div>
           )}

           {this.props.className === "sector" && (
             <div>
                <p>Start Sector (Left Edge):</p>
                <input type="number" name="sectorStart" placeholder={this.props.sectorStart}/>
                <p>End Sector (Right Edge):</p>
                <input type="number" name="sectorEnd" placeholder={this.props.sectorEnd}/>
             </div>
           )}

           {this.props.className === "warning" && (
             <div>
                <p>Warning Counties:</p>
                <Select options={options} isMulti={true} onChange={this.selectOnChange} value={selectedOption}  />
                <p>Warning Text:</p>
                <textarea name="warningText" cols="50" rows="10" placeholder={this.props.warningText}/>
             </div>
           )}

           {this.props.className === "report" && (
             <div>
                <p>Report Text:</p>
                <textarea name="reportText" cols="50" rows="10" placeholder={this.props.reportText}/>
             </div>
           )}

           {this.props.className === "remark" && (
             <div>
                <p>Remarks:</p>
                <textarea name="remark" cols="50" rows="10" placeholder={this.props.remarks}/>
             </div>
           )}

           <input className="form-enter-data" type="submit" value="enter data" />
        </form>
      </div>
    )
  }
 }
