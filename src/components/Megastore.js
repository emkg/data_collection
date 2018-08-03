import React from 'react';
import Event from './Event';

// TODO: come up with a better schema for the json
// TODO: add documentation
// TODO: store data as a cookie
// TODO: make a summary component
// TODO: save instrument Data

export default class Megastore extends React.Component {
  state = {};

  saveData = (data) => {
    this.setState( data )
  }

  render() {
    return (
      <Event saveData={this.saveData} />
    );
  }

}
