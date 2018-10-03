import React from 'react';


/**
 * BigYellowButton is a large "button" with a bold
 * style. With a drop shadow and transforms, this
 * component has a dramatic push down effect.
 * It requires a handleButtonPress function, and buttonText
 * props. It is keyboard/tab accessible.
 */
export default class BigYellowButton extends React.Component {

  /**
   * execute the buttonPress function passed
   *  as a prop
   */
  handleButtonPress = () => {
    this.props.handleButtonPress()
  }
  /**
   * @return a div wrapped around an anchor tag
   *
   */
  render() {
    return (
      <div className="big-yellow-button"
         onClick={this.handleButtonPress}><a href="javascript:;">{this.props.buttonText || "PRESS ME"}</a>
      </div>
    );

  }
}
