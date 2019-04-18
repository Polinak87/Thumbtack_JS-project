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
    let card = (id, name, description, category) => {
      return (
        <div>
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
              </figure>
            </div>
            <div className="card-content">          
              <div className="content">
                {name}
                <br/>
                {category}
                <br/>
                {description}
                <br/>
                <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
          <div>
            <input className="button is-block is-success is-large is-fullwidth" type="submit" value="Add to market"></input>
            <br/>
          </div>
        </div>
      );
    };

    const list = [];
    this.state.value.forEach((thing, index) => {
      list.push(
        card(thing.id, thing.name, thing.description, thing.category),
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
