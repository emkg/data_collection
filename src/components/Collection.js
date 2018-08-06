import React from 'react';
import Tab from './Tab';
import Form from './Form';


// TODO: handle submit
// TODO: set up logic for collection ID
// TODO: make sure mobile start kicks off when location reset
// TODO: break tab container into a new component with
// logic to control startng a new collection

export default class Collection extends React.Component {
  state = {
    openTab: "vcp"
  }

  handleClick = (newTab) => {
    this.setState({ openTab: newTab })
  }

  handleNewCollection = () => {
    this.props.handleSubmit();
  }

  render () {
    const { openTab } = this.state;
    return (
      <div className="collection">
        <div className="tab-container">
          <Tab tab="loc" clicked={openTab === "loc"} handleClick={this.handleClick} />
          <Tab tab="vcp" clicked={openTab === "vcp"} handleClick={this.handleClick} />
          <Tab tab="sector" clicked={openTab === "sector"} handleClick={this.handleClick} />
          <Tab tab="warning" clicked={openTab === "warning"} handleClick={this.handleClick} />
          <Tab tab="report" clicked={openTab === "report"} handleClick={this.handleClick} />
          <Tab tab="remark" clicked={openTab === "remark"} handleClick={this.handleClick} />
        </div>
        <Form saveData={this.props.saveData}
              className={this.state.openTab}
              collectionID={this.props.collectionID}/>
        <div className="new-collection" onClick={this.handleNewCollection}>COLLECTION COMPLETE</div>
      </div>
    )
  }
}
