import React from 'react';

export default class Instrument extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={ () => (console.log("submitted!"))}>
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
