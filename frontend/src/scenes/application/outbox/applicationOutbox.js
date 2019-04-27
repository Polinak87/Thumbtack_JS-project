import React from 'react';
import axios from 'axios';

export default class ApplicationOutbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Map(),
    }
  }

  componentDidMount() {
    axios.get('/api/applicationOutbox')
      .then((response) => {
        console.log(response.data);
        // var map = this.state.value;
        // response.data.forEach(function (thing) {
        //   map.set(thing.id, thing)
        // });
        // this.setState({ value: map });
      });
  }

  render() {
    return (
      <div>
        <input className="button is-block is-success is-large is-fullwidth" onClick={this.handleClickChoose} type="submit" value="Choose"></input>
      </div>
    )
  }
}
