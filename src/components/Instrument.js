import React from 'react';

// TODO: handle submit
// TODO: prevent defaults

const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class Instrument extends React.Component {

  handleSubmit = (event) => {
    stop(event);
    const instrument = event.target.instrument.value;
    console.log(instrument)
    this.props.handleSubmit(instrument);

  }

  render() {
    return (
      <div className="instrument">
        <form onSubmit={this.handleSubmit}>
          <select name="instrument">
            <option value="KOUN">KOUN</option>
            <option value="NOXP">NOXP</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    )
  }
 }
