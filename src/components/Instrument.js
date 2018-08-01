import React from 'react';

// TODO: handle submit
// TODO: prevent defaults

const stop = (event) => (event.stopPropagation(), event.preventDefault());

export default class Instrument extends React.Component {

  handleSubmit = (event) => {
    stop(event);
    this.props.handleSubmit( "collect" );
    console.log("collect")
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select name="instrument">
            <option value="stationary">KOUN</option>
            <option value="mobile">NOXP</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    )
  }
 }
