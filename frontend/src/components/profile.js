import React, {useState, useEffect} from 'react';
import UserName from './userName';
import axios from 'axios';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   name: '',
    //   description: '',
    //   category: '',
    // }
    this.state = {
      value: [],
    }
  }

  componentDidMount() {
    axios.get('/api/things')
      .then((response) => {
        // const { name, description, category } = response.data;
        // this.setState({ name, description, category, });
        this.setState({ value: response.data })
      });
  }

  render() {
    const list = [];
    this.state.value.forEach((thing, index) => {
      list.push(
        <li key={thing.id}>{thing.name}, {thing.description}, {thing.category}</li>
      );
    });

    return (
      <div>
        <UserName />
        <ul>{list}</ul>
      </div>
    );
  }

}
