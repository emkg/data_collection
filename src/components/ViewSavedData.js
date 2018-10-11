import React from 'react';

export default class ViewSavedData extends React.Component {

  componentDidMount() {
    fetch("./api/fetch.php")
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch((error) => {
        console.error(error);
      });

    })
  }

  render() {
    return (
      <div>
        {this.state.data && (<div> {this.state.data} </div> )}
      </div>
    );
  }
}
