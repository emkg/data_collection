import React from 'react';
import DayPickerInput from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import cx from 'classnames';

//TODO: editable data...
// have an option to pass props and have form autofilled with Data
// make sure that if in edit mode, that data overwrites correctly

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
    // data we always need
    const data = {
      collectionID: this.props.collectionID,
      startDay: e.startDay.value,
      startTime: e.startTime.value
    }

    // clear fields we saved data from
    e.startTime.value = "";

    // based on className, store certain fields in object
    // and saveData.
    if(this.props.className === "loc") {
        const location = {...data,
          collectionID: e.id.value,
          locationLat: e.lat.value,
          locationLong: e.long.value
        };
        e.lat.value = ""; e.long.value = "";
        this.props.handleLocationSubmit(location.collectionID);
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
              <input type="date" name="startDay" min="2018-01-01"/>
              <input type="time" name="startTime" min="00:00" max="23:59" />
            </div>
           {this.props.className === "loc" && (
             <div>
                <input type="number" name="lat" placeholder="lat"/>
                <input type="number" name="long" placeholder="long"/>
                <input type="number" name="newID" placeholder="Daily Collection Number"/>
             </div>
           )}

           {this.props.className === "vcp" && (
             <input type="text" name="vcp" placeholder="VCP"/>
           )}

           {this.props.className === "sector" && (
             <div>
                <input type="number" name="sectorStart" placeholder="start sector"/>
                <input type="number" name="sectorEnd" placeholder="end sector"/>
             </div>
           )}

           {this.props.className === "warning" && (
             <div>
                <input type="text" name="counties" placeholder="counties..."  />
                <textarea name="warningText" cols="50" rows="10" placeholder="Warning text"/>
             </div>
           )}

           {this.props.className === "report" && (
             <textarea name="reportText" cols="50" rows="10" placeholder="Report text"/>
           )}

           {this.props.className === "remark" && (
             <textarea name="remark" cols="50" rows="10" placeholder="remarks..."/>
           )}

           <input type="submit" value="enter data" />
        </form>
      </div>
    )
  }
 }
