import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';

const style = {
  "margin" : "10px 0px"
}

export default class ViewSavedData extends React.Component {
  state = {
    data: [{
        collector: "John Smith",
        collectorContact: "john.smith@email.com",
        eventDescr: "summaryyy remrk",
        eventEnd: "2018-10-10 22:36:00",
        eventID: "17256eb6-293f-4d1f-b7da-d2a976ab7450",
        eventStart: "2018-10-10 22:35:00",
        eventType: "nontornadic-supercell",
        instrument: "KOUN",
        radarSigs: "hail"
      }
    ]
  };

  componentDidMount() {
    fetch("./api/fetch.php")
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div style={style}>
        <Paper>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Instrument</TableCell>
              <TableCell>Collector</TableCell>
              <TableCell>Collector Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(
              (row) => {(
                <TableRow key={row.eventID}>
                  <TableCell component="th" scope="row">
                    {row.eventStart}
                  </TableCell>
                  <TableCell>
                    {row.instrument}
                  </TableCell>
                  <TableCell>
                    {row.collector}
                  </TableCell>
                  <TableCell>
                    {row.collectorContact}
                  </TableCell>
                </TableRow>
            )})}
          </TableBody>
        </Paper>
      </div>
    );
  }
}
