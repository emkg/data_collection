import React from 'react';
import Tab from './Tab';
import BigYellowButton from './BigYellowButton';
import Form from './Form';
import uuidv4 from 'uuid/v4';


 // TODO: think of location collection as a collection...

/**
 * Collection renders the form where data is collected.
 */
export default class Collection extends React.Component {
  /**
   * string: openTab, Number collectionID
   */
  state = {
    openTab: "vcp",
    dailyCollectionNumber: 1,
    collectionID: uuidv4()
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
  getNewCollectionID = (dcn) => {
    const collectionID = uuidv4();
    const dailyCollectionNumber = dcn;
    this.setState({ collectionID, dailyCollectionNumber });
    return collectionID;
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
          {this.props.mobile && (
            <div className="tab-container">
              <Tab tab="loc" clicked={openTab === "loc"} handleClick={this.handleClick} />
              <Tab tab="vcp" clicked={openTab === "vcp"} handleClick={this.handleClick} />
              <Tab tab="sector" clicked={openTab === "sector"} handleClick={this.handleClick} />
              <Tab tab="remark" clicked={openTab === "remark"} handleClick={this.handleClick} />
            </div>
          )}
          {!this.props.mobile && (
            <div className="tab-container">
              <Tab tab="vcp" clicked={openTab === "vcp"} handleClick={this.handleClick} />
              <Tab tab="sector" clicked={openTab === "sector"} handleClick={this.handleClick} />
              <Tab tab="warning" clicked={openTab === "warning"} handleClick={this.handleClick} />
              <Tab tab="report" clicked={openTab === "report"} handleClick={this.handleClick} />
              <Tab tab="remark" clicked={openTab === "remark"} handleClick={this.handleClick} />
            </div>
          )}
        <Form convertTime={this.props.convertTime}
              saveData={this.props.saveData}
              className={this.state.openTab}
              dailyCollectionNumber={this.state.dailyCollectionNumber}
              collectionID={this.state.collectionID}
              handleNewLocation={this.getNewCollectionID}
              eventID={this.props.eventID}
        />
        <BigYellowButton
            handleButtonPress={this.stop}
            buttonText="COLLECTION COMPLETE" />
      </div>
    )
  }
}
