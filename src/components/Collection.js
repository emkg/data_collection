import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
/*import Kickoff from './Kickoff';
import VCP from './VCP';
import Sector from './Sector';
import Remark from './Remark';
import Warning from './Warning';
import Report from './Report';*/
import Form from './Form';

// TODO: handle submit
// TODO: set up router
// TODO: set up logic for collection ID

export default class Collection extends React.Component {
  render () {
    return (
      <div>
        <Form />
      </div>
    )
  }
}
