import React from 'react';
import DayPickerInput from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import cx from 'classnames';

// TODO: handle submit
// TODO: pass data up to store

const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class Form extends React.Component {

  handleSubmit = (event) => {
    stop(event);
    const e = event.target;
    const data = {
      collectionID: this.props.collectionID,
      startDay: e.startDay.value,
      startTime: e.startTime.value
    }

    e.startTime.value = "";

    if(this.props.className === "mobileStart") {
        const location = {...data,
          locationLat: e.lat.value,
          locationLong: e.long.value
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

  render() {
    return (
      <div className={cx(this.props.className)}>
        <form onSubmit={this.handleSubmit}>
           <input type="date" name="startDay" min="2018-01-01"/>
           <input type="time" name="startTime" min="00:00" max="23:59" />
           <input type="datetime-local" />
           {this.props.className === "mobile" && (
             <div>
                <input type="number" name="lat" placeholder="lat"/>
                <input type="number" name="long" placeholder="long"/>
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
