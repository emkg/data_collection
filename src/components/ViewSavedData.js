import React from 'react';
import './css/ViewSavedData.css';
import TableCellWithClick from './TableCellWithClick';

const style = {
  "margin" : "10px 0px"
}

export default class ViewSavedData extends React.Component {
  state = {
    data: [
      {
        collector: "John Smith",
        collectorContact: "john.smith@email.com",
        eventDescr: "summaryyy remrk",
        eventEnd: "2018-10-10 22:36:00",
        eventID: "17256eb6-293f-4d1f-b7da-d2a976ab7450",
        eventStart: "2018-10-10 22:35:00",
        eventType: "nontornadic-supercell",
        instrument: "KOUN",
        radarSigs: "hail"
        },{
          collector: "John Smith",
          collectorContact: "john.smith@email.com",
          eventDescr: "summaryyy remrk",
          eventEnd: "2018-10-10 22:36:00",
          eventID: "17256eb6-293f-4d1f-b7da-d2a976ab7450",
          eventStart: "2018-10-10 22:35:00",
          eventType: "nontornadic-supercell",
          instrument: "KOUN",
          radarSigs: "hail"
    }]
  };

  componentDidMount() {
   fetch("./api/fetch.php")
      .then(response => response.json() )
      .then(data => this.prepareTable(data))
      .catch((error) => {
        console.error();
      });

    //  this.prepareTable(this.state.data);
  }

  prepareTable = (data) => {
    console.log(data);
    // try filter? for each might be better.
    const table = data.map(
      (row, i) => (row !== null && (
        <tr>
          <TableCellWithClick ID={row.eventID} handleClick={this.fetchRow} label={row.eventStart}  />
          <td>{row.instrument}</td>
          <td>{row.collector}</td>
          <td>{row.collectorContact}</td>
        </tr>
    )));

    this.setState({ table });
  }

  /**
   *
   */
  fetchRow = (eventID) => {
    fetch(`./api/fetchSpecific.php`, {
      method: "POST",
      mode: "same-origin",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: eventID
    }).then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong with the server response.")
      }
    }).then(data => this.prepareTable(data) )
    .catch((error) => {
      console.error(error);
    });

  }

  render() {
    const { table = [] } = this.state;
    return (
      <table>
        {table}
      </table>
    );
  }
}


/*

SELECT * FROM `vcp`
LEFT JOIN sector ON vcp.eventId = sector.eventId
LEFT JOIN rhi ON sector.eventId = rhi.eventId
LEFT JOIN report ON rhi.eventId = report.eventId
LEFT JOIN warning ON report.eventId = warning.eventId
LEFT JOIN remark ON warning.eventId = remark.eventId
LEFT JOIN location ON remark.eventId = location.eventId
WHERE vcp.eventId = 'fbe53d4d-fd38-42c6-b2a4-34f5fc3d5269'

<thead>
    <tr>
      <td>Date</td>
      <td>Instrument</td>
      <td>Collector</td>
      <td>Collector Email</td>
    </tr>
  </thead>
  <tbody>
    {tablebody}
  </tbody>

SELECT * FROM `vcp`
WHERE vcp.eventId = 'fbe53d4d-fd38-42c6-b2a4-34f5fc3d5269';
SELECT * FROM `sector`
WHERE eventId = 'fbe53d4d-fd38-42c6-b2a4-34f5fc3d5269';
SELECT * FROM `rhi`
WHERE eventId = 'fbe53d4d-fd38-42c6-b2a4-34f5fc3d5269';
SELECT * FROM `report`
WHERE eventId = 'fbe53d4d-fd38-42c6-b2a4-34f5fc3d5269';
SELECT * FROM `warning`
WHERE eventId = 'fbe53d4d-fd38-42c6-b2a4-34f5fc3d5269';
SELECT * FROM `remark`
WHERE eventId = 'fbe53d4d-fd38-42c6-b2a4-34f5fc3d5269';
SELECT * FROM `location`
WHERE eventId = 'fbe53d4d-fd38-42c6-b2a4-34f5fc3d5269';

*/
