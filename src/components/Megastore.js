import React from 'react';
import Event from './Event';

export default class Megastore extends React.Component {
  state = {};

  saveData = (data) => {
    const newData = {...this.state, data}
    this.setState({ newData })

    console.log("new data: " + newData);
    console.log("new state: " + this.state );

  }

  render() {
    return (
      <Event saveData={this.saveData} />
    );
  }

}
