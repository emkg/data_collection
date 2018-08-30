import React from 'react';
import cx from 'classnames';
import moment from 'moment';

//TODO: editable data...
// have an option to pass props and have form autofilled with Data
// make sure that if in edit mode, that data overwrites correctly
//TODO: format dates/times with moment


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
  }


  componentWillUnmount() {
    for(let [key, val] of this.state.submitted) {
      this.props.saveData({...val, collectionEnd: new moment().utc().format()});
      //default end time is now since they didn't overwrite it
    }
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
    // clear fields we saved data from
    e.startTime.value = "";

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
          warningCounties: e.counties.value,
          warningText: e.warningText.value
        };
        //e.counties.value = ""; e.warningText.value = "";
        //this.props.saveData(warning);
        submitted.set(data.collectionType, warning);
        this.setState({ submitted });
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
    return (
      <div className={cx(this.props.className)}>
        <form onSubmit={this.handleSubmit}>
           <p>Start Time:</p>
           <div className="datetime-input">
              <input type="date" name="startDay" min="2018-01-01"
                      defaultValue={new Date().toJSON().slice(0,10)}/>
              <input type="time" name="startTime" min="00:00" max="23:59" required
                      defaultValue={new moment().utc().toJSON().slice(11,16)}/>
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
                <input type="text" name="counties" placeholder="counties..."  />
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
