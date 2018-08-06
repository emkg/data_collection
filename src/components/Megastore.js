import React from 'react';
import Event from './Event';

// TODO: come up with a better schema for the json
// TODO: add documentation
// TODO: store data as a cookie
// TODO: make a summary component
// TODO: save instrument Data

export default class Megastore extends React.Component {
  state = { entries: [] };

  saveData = (data) => {
    const { entries } = this.state;
    entries.push(data);
    this.setState( { entries } )
  }

  render() {
    return (
      <Event saveData={this.saveData} />
    );
  }

}
