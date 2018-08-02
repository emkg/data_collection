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
    const { openTab } = this.state;
    return (
      <div className="collection">
        <div className="tab-container">
          <Tab tab="vcp" clicked={openTab === "vcp"} handleClick={this.handleClick} />
          <Tab tab="sector" clicked={openTab === "sector"} handleClick={this.handleClick} />
          <Tab tab="warning" clicked={openTab === "warning"} handleClick={this.handleClick} />
          <Tab tab="report" clicked={openTab === "report"} handleClick={this.handleClick} />
          <Tab tab="remark" clicked={openTab === "remark"} handleClick={this.handleClick} />
        </div>
        <Form className={this.state.openTab}/>
      </div>
    )
  }
}
