import React from 'react';
import Tab from './Tab';
import Form from './Form';
import uuidv4 from 'uuid/v4';

/**
 * Collection renders the data collection forms.
 */
export default class Collection extends React.Component {
  /**
   * state stores the open tab string, a dailyCollectionNumber number,
   * and a unique collectionID string generated by uuidv4
   */
  state = {
    openTab: "vcp",
    dailyCollectionNumber: 1,
    collectionID: uuidv4()
  }

  /**
   * change the openTab in state on click
   * @param newTab - String name of the tab to open
   */
  handleClick = (newTab) => {
    this.setState({ openTab: newTab })
  }

  /**
   * When location is updated for mobile radar,
   * we want to update the collection id. This
   * signals on all new entries that the location is updated.
   * @param dcn - Number, the dailyCollectionNumber of the collection
   * which is updated elsewhere
   * @return collectionID, a new uuidv4 string
   */
  getNewCollectionID = (dcn) => {
    const collectionID = uuidv4();
    const dailyCollectionNumber = dcn;
    this.setState({ collectionID, dailyCollectionNumber });
    return collectionID;
  }

  /**
   * stop ends the data collection in the parent container
   */
  stop = () => {
    this.props.endCollection();
  }

  /**
   * render the clickable tabs, Form, and a stop button.
   * @return a tab container full of Tabs above a Form component
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
              <Tab tab="rhi" clicked={openTab === "rhi"} handleClick={this.handleClick} />
              <Tab tab="remark" clicked={openTab === "remark"} handleClick={this.handleClick} />
              <Tab tab="eventEnd" clicked={openTab === "eventEnd"} handleClick={this.handleClick} />
            </div>
          )}
          {!this.props.mobile && (
            <div className="tab-container">
              <Tab tab="vcp" clicked={openTab === "vcp"} handleClick={this.handleClick} />
              <Tab tab="sector" clicked={openTab === "sector"} handleClick={this.handleClick} />
              <Tab tab="rhi" clicked={openTab === "rhi"} handleClick={this.handleClick} />
              <Tab tab="warning" clicked={openTab === "warning"} handleClick={this.handleClick} />
              <Tab tab="report" clicked={openTab === "report"} handleClick={this.handleClick} />
              <Tab tab="remark" clicked={openTab === "remark"} handleClick={this.handleClick} />
              <Tab tab="eventEnd" clicked={openTab === "eventEnd"} handleClick={this.handleClick} />
            </div>
          )}
        <Form convertTime={this.props.convertTime}
              saveData={this.props.saveData}
              className={this.state.openTab}
              dailyCollectionNumber={this.state.dailyCollectionNumber}
              collectionID={this.state.collectionID}
              handleNewLocation={this.getNewCollectionID}
              eventID={this.props.eventID}
              timeNow={this.props.timeNow}
              today={this.props.today}
              snackbar={this.props.snackbar}
              convertTime={this.props.convertTime}
              handleSubmit={this.props.handleSubmit}
        />
      </div>
    )
  }
}
