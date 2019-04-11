import React from 'react';
import axios from 'axios';

export default class AddThink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    axios.post('/api/addthink', {
      name: 'dress_3',
      description: 'pretty_3',
      category: 'clothes_3',
    })

      .then((response) => {
        this.setState({ value: response.data })
      });
  }

  render() {
    return (
      <div>
        <h2>Add think </h2>
        <h3>{this.state.value}</h3>
      </div>
    );
  }
}