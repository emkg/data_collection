import React from 'react';
import Event from './components/Event';
import BigYellowButton from './components/BigYellowButton';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import WarningIcon from '@material-ui/icons/Warning';

import './App.css';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon
};

const snackbarStyles = {
  success: {
    backgroundColor: green[600],
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    //marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
};



/**
 *  App houses the data collection mechanism and model
 *  for the Radar Operations.
 *
 */
export default class App extends React.Component {
  state = { weatherEvent: false, snackbarOpen: false }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  snackbar = () => {
   this.setState({ snackbarOpen: true });
  };

  handleClose = (event, reason) => {
   /*if (reason === 'clickaway') {
     return;
   }*/

   this.setState({ snackbarOpen: false });
 };


  /**
   * When startEvent is triggered, the weatherEvent in state
   *   is flipped on or off. A thankyou message can be supplied,
   *   which will be displayed when the event is flipped to false.
   */
  startEvent = (thankyou) => {
    this.setState({ weatherEvent: !this.state.weatherEvent, thankyou })
    window.scrollTo(0,0);
  }

  /**
   * Render the app.
   * @return In a weather event, an Event will be rendered.
   * Otherwise, we will see the GO button, and a thankyou message if it
   * exists.
   */
  render() {
    window.scrollTo(0,0);
    const variant = "success";
    const Icon = variantIcon[variant];
    return (
      <div className="app">
      <h1>Radar Operations Data Collection</h1>

      {!this.state.weatherEvent && (
        <div>
          {this.state.thankyou}
          <p>Press go to collect data
          when weather events are in progress.</p>
          <BigYellowButton
              handleButtonPress={this.startEvent}
              buttonText="GO" />
        </div>)}

        {this.state.weatherEvent && (<Event eventOver={this.startEvent} snackbar={this.snackbar} />)}

        <Snackbar
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}

          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <SnackbarContent
            style={snackbarStyles[variant]}
            message={<span id="message-id" style={snackbarStyles.message}>
                      <Icon style={snackbarStyles.icon, snackbarStyles.iconVariant}/>
                          Data Saved
                      </span>}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                style={snackbarStyles.close}
                onClick={this.handleClose}
              >
              <CloseIcon style={snackbarStyles.icon}/>
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}
