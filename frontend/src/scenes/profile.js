import React from 'react';
// import UserName from './userName';
import axios from 'axios';
import Card from '../components/card'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Map(),
    }
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    axios.get('/api/userthings')
      .then((response) => {
        var map = this.state.value;
        response.data.forEach(function(thing) {
          map.set(thing.id, thing)
        });
        this.setState({value: map});
        // console.log(this.state.value);
      });
  }

  updateData(id, data) {
    let { value } = this.state;
    let thing = value.get(id);
    thing.onMarket = data;
    value.set(id, thing);
    this.setState({ value });
    console.log(this.state.value);
  };

  render() {
    // let array = this.state.value.values();
    let list = [];
    for(let thing of this.state.value.values()) {
      list.push(
      <Card
        id={thing.id}
        name={thing.name}
        description={thing.description}
        category={thing.category}
        onMarket={thing.onMarket}
        updateData={this.updateData}
        key={thing.id} />
      )
    };

    return (
      <div>
        {/* <UserName /> */}
        <ul>{list}</ul>
      </div>
    );
  }
}
