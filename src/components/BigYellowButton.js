import React from 'react';

export default class BigYellowButton extends React.Component {

  handleButtonPress = () => {
    this.props.handleButtonPress()
  }

  render() {
    return (
      <div className="big-yellow-button"
         onClick={this.handleButtonPress}><a href="#">{this.props.buttonText}</a>
      </div>
    );

  }
}
