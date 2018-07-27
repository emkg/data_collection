import React from 'react';
import DayPickerInput from 'react-day-picker';
import 'react-day-picker/lib/style.css';


export default class RadarSignatures extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={ () => (console.log("submitted!"))}>
          <div>
            <input type="checkbox" id="tornadic-supercell" name="feature" value="tornadic-supercell" checked />
            <label for="tornadic-supercell">Tornadic Supercell</label>
          </div>
          <div>
            <input type="checkbox" id="hail" name="feature" value="hail" />
            <label for="hail">Hail</label>
          </div>
          <div>
            <input type="checkbox" id="claws" name="feature" value="claws" />
            <label for="claws">Claws</label>
          </div>
        </form>
      </div>
    )
  }
 }
