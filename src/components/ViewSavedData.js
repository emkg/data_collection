import React from 'react';
import './css/ViewSavedData.css';

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
      .then(data => this.setState({ data }) )
      .catch((error) => {
        console.error();
      });
  }

  render() {
    const { data = [] } = this.state;
    return (
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Date</td>
              <td>Instrument</td>
              <td>Collector</td>
              <td>Collector Email</td>
            </tr>
          </thead>
            <tbody>
            {data.map(
              (row, i) => (
                <tr>
                  <td>{i}</td>
                  <td>{row.eventStart}</td>
                  <td>{row.instrument}</td>
                  <td>{row.collector}</td>
                  <td>{row.collectorContact}</td>
                </tr>
            ))}
          </tbody>
        </table>
    );
  }
}


/*

*/
