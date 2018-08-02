import React from 'react';
/*import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Kickoff from './Kickoff';
import VCP from './VCP';
import Sector from './Sector';
import Remark from './Remark';
import Warning from './Warning';
import Report from './Report';*/
import Tab from './Tab';
import Form from './Form';


// TODO: handle submit
// TODO: set up router?
// TODO: set up logic for collection ID

export default class Collection extends React.Component {
  state = {
    openTab: "vcp"
  }

  handleClick = (newTab) => {
    this.setState({ openTab: newTab })
  }

  render () {
    return (
      <div className="collection">
        <div className="tab-container">
          <Tab tab="vcp" handleClick={this.handleClick} />
          <Tab tab="sector" handleClick={this.handleClick} />
          <Tab tab="warning" handleClick={this.handleClick} />
          <Tab tab="report" handleClick={this.handleClick} />
          <Tab tab="remark" handleClick={this.handleClick} />
        </div>
        <Form className={this.state.openTab}/>
      </div>
    )
  }
}
