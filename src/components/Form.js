import React from 'react';
import DayPickerInput from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import cx from 'classnames';

// TODO: handle submit
// TODO:

const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class Form extends React.Component {

  handleSubmit = (event) => {
    stop(event);

    let data = {
      startTime: event.target.startTime.value,
      locationLat: event.target.lat.value,
      locationLong: event.target.long.value,
      VCP: event.target.vcp.value,
      sectorStart: event.target.sectorStart.value,
      sectorEnd: event.target.sectorEnd.value,
      warningCounties: event.target.counties.value,
      warningText: event.target.warningText.value,
      reportText: event.target.reportText.value,
      remark: event.target.remark.value,
    }
    console.log(data)
  }

  render() {
    return (
      <div className={cx(this.props.className)}>
        <form onSubmit={this.handleSubmit}>
           <DayPickerInput />
           <input type="time" name="startTime" min="00:00" max="23:59" />

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

           <input type="submit" />
        </form>
      </div>
    )
  }
 }
