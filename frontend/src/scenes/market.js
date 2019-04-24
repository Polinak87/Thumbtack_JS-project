import React from 'react';
import axios from 'axios';
import Card from '../components/card'

export default class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    }
  }

  componentDidMount() {
    axios.get('/api/things')
      .then((response) => {
        this.setState({ value: response.data })
      });
  }

  render() {
    const list = this.state.value.map((thing) => (
      <Card
        id={thing.id}
        name={thing.name}
        description={thing.description}
        category={thing.category}
        key={thing.id} />
    ));

    return (
      <div>
        <ul>{list}</ul>
      </div>
    );
  }
}
