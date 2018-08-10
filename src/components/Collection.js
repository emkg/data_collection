import React from 'react';
import Tab from './Tab';
import Form from './Form';

// TODO: break tab container into a new component with
// logic to control startng a new collection
// TODO:  push buttons should be a separate component too

/**
 * Collection renders the form where data is collected.
 */
export default class Collection extends React.Component {
  /**
   * string: openTab, Number collectionID
   */
  state = {
    openTab: "vcp",
    collectionID: 1,
  }

  /**
   * change the openTab in state on click
   */
  handleClick = (newTab) => {
    this.setState({ openTab: newTab })
  }

  /**
   * When location is updated for mobile radar,
   * we want to update the collection id. This
   * signals on all new entries that the location is updated.
   */
  handleLocationSubmit = (newID) => {
    this.setState({ collectionID: newID });
  }

  /**
   * stop ends the data collection.
   */
  stop = () => {
    this.props.endCollection();
  }

  /**
   * render the clickable tabs, Form, and a stop button.
   * @return a tab container full of Tabs, Form, and a pressable div
   * to end the data collection
   */
  render () {
    const { openTab } = this.state;
    return (
      <div className="collection">
        <div className="tab-container">
          {this.props.mobile &&
            (<Tab tab="loc" clicked={openTab === "loc"} handleClick={this.handleClick} />
          )}
          <Tab tab="vcp" clicked={openTab === "vcp"} handleClick={this.handleClick} />
          <Tab tab="sector" clicked={openTab === "sector"} handleClick={this.handleClick} />
          <Tab tab="warning" clicked={openTab === "warning"} handleClick={this.handleClick} />
          <Tab tab="report" clicked={openTab === "report"} handleClick={this.handleClick} />
          <Tab tab="remark" clicked={openTab === "remark"} handleClick={this.handleClick} />
        </div>
        <Form saveData={this.props.saveData}
              className={this.state.openTab}
              collectionID={this.state.collectionID}
              handleLocationSubmit={this.handleLocationSubmit}
        />
        <div className="new-collection"
             onClick={this.stop}>
            COLLECTION COMPLETE
        </div>
      </div>
    )
  }
}
