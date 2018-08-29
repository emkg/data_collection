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
      startDate: `${startDay}T${startTime}:00.00Z`,
      collectionType: this.props.className,
      dailyCollectionNumber: this.props.dailyCollectionNumber
    }

    // clear fields we saved data from
    e.startTime.value = "";

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
        this.props.saveData(location)
    } else if(this.props.className === "stationaryStart") {

    } else if(this.props.className === "vcp") {
        const vcp = {...data, VCP: e.vcp.value};
        this.props.saveData(vcp);
        e.vcp.value = ""
    } else if(this.props.className === "sector") {
        const sector = {...data,
          sectorStart: e.sectorStart.value,
          sectorEnd: e.sectorEnd.value
        };

        e.sectorStart.value = ""; e.sectorEnd.value = "";

        this.props.saveData(sector)
    } else if(this.props.className === "warning") {
        const warning = {...data,
          warningCounties: e.counties.value,
          warningText: e.warningText.value
        };

        e.counties.value = ""; e.warningText.value = "";

        this.props.saveData(warning)
    } else if(this.props.className === "report") {
        const report = {...data, reportText: e.reportText.value };
        e.reportText.value = "";
        this.props.saveData(report)
    } else {
        // remark
        const remark = {...data, remark: e.remark.value};
        e.remark.value = "";
        this.props.saveData(remark)
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
           Start Time:
           <div className="datetime-input">
              <input type="date" name="startDay" min="2018-01-01"
                      defaultValue={this.props.startDay || new Date().toJSON().slice(0,10)}/>
              <input type="time" name="startTime" min="00:00" max="23:59"
                      defaultValue={this.props.startTime || new moment().utc().toJSON().slice(11,16)}/>
            </div>
           {this.props.className === "loc" && (
             <div>
                Location Lattitude:
                <input type="number" name="lat" placeholder={this.props.lat}/>
                Location Longitude
                <input type="number" name="long" placeholder={this.props.long}/>
                Daily Collection ID:
                <input type="number" name="dcn" placeholder={this.props.dailyCollectionNumber}/>
             </div>
           )}

           {this.props.className === "vcp" && (
             <div>
                VCP:
                <input type="text" name="vcp" placeholder={this.props.vcp}/>
             </div>
           )}

           {this.props.className === "sector" && (
             <div>
                Start Sector (Left Edge):
                <input type="number" name="sectorStart" placeholder={this.props.sectorStart}/>
                End Sector (Right Edge):
                <input type="number" name="sectorEnd" placeholder={this.props.sectorEnd}/>
             </div>
           )}

           {this.props.className === "warning" && (
             <div>
                Warning Counties:
                <input type="text" name="counties" placeholder="counties..."  />
                Warning Text:
                <textarea name="warningText" cols="50" rows="10" placeholder={this.props.warningText}/>
             </div>
           )}

           {this.props.className === "report" && (
             <div>
                Report Text:
                <textarea name="reportText" cols="50" rows="10" placeholder={this.props.reportText}/>
             </div>
           )}

           {this.props.className === "remark" && (
             <div>
                Remarks:
                <textarea name="remark" cols="50" rows="10" placeholder={this.props.remarks}/>
             </div>
           )}

           <input type="submit" value="enter data" />
        </form>
      </div>
    )
  }
 }
