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

// get icons we imported from material-ui for snackbars
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon
};

// suggested styles from material-ui for snackbars
// I chose to keep success and warning
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
    marginRight: '8px',
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
  /**
   * App state keeps track of whether an event is active, and
   * whether or not we want to see a snackbar. Likewise,
   * App state stores the snackbar message and variant (success -- green
   * is for signaling saved information, while warning -- amber/yellow
   * comes up for validation messages on the final submit page)
   */
  state = {
    weatherEvent: false,
    snackbarOpen: false,
    snackbarVariant: 'success',
    snackbarMessage: ''
  }

  /**
   * scrolls the window to the top of the page.
   */
  componentDidMount() {
    window.scrollTo(0,0);
  }

  /**
   * Opens a snackbar
   * @param snackbarVariant - a string, either "warning" or "success"
   * @param snackbarMessage - a string, what the message should say
   **/
  openSnackbar = (snackbarVariant, snackbarMessage) => {
   this.setState({ snackbarOpen: true, snackbarVariant, snackbarMessage });
  };


  /**
   * Closes a snackbar.
   * @param event - borrowed from material-ui
   * @param reason - borrowed from material-ui
   */
  closeSnackbar = (event, reason) => {
   this.setState({ snackbarOpen: false });
 };

  /**
   * Flips weatherEvent in state on if off, off if on.
   * @param thankyou - a string, optional message
   *   to be displayed when weatherEvent is false.
   */
  startEvent = (thankyou) => {
    this.setState({ weatherEvent: !this.state.weatherEvent, thankyou })
    window.scrollTo(0,0);
  }

  /**
   * Render the app. The GO button will set weatherEvent to
   * true and data collection can begin.
   * @return If weatherEvent is true, an Event will be rendered.
   * Otherwise, the GO button, and a thankyou message if it
   * exists.
   */
  render() {
    const { snackbarVariant } = this.state;
    const Icon = variantIcon[snackbarVariant];
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
            <br/>
          </div>
        )}

        {this.state.weatherEvent && (
          <Event eventOver={this.startEvent} snackbar={this.openSnackbar} />
        )}

        <Snackbar
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.closeSnackbar}

          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <SnackbarContent
            style={snackbarStyles[snackbarVariant]}
            message={<span id="message-id" style={snackbarStyles.message}>
                      <Icon style={snackbarStyles.icon, snackbarStyles.iconVariant}/>
                          {this.state.snackbarMessage}
                      </span>}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                style={snackbarStyles.close}
                onClick={this.closeSnackbar}
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
