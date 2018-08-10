import React from 'react';

// TODO: pass form select option values as props?


// without stop, form will reset the app with a window refresh
const stop = (event) => (event.stopPropagation(), event.preventDefault());

/**
 * Instrument is a form for choosing the radar instrument.
 */
export default class Instrument extends React.Component {

  /**
   * handleSubmit stops default form event behavior and
   *  passes the instrument selection up to parent.
   */
  handleSubmit = (event) => {
    stop(event);
    const instrument = event.target.instrument.value;
    this.props.handleSubmit(instrument);

  }

  /**
   * renders the instrument select form
   * @return a form with select, options, and submit
   */
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
