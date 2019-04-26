import React from 'react';
import axios from 'axios';
import Card from '../profile/card'

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
      <div className="column is-one-quarter" key={thing.id}>
        <Card
          id={thing.id}
          name={thing.name}
          description={thing.description}
          category={thing.category} />
        </div>
    ));

    return (
      <div>
        <br/>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Market
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div>
            {/* <UserName /> */}
            <div className="columns is-multiline">
              {list}
            </div>
          </div>
        </section>
      </div>
    );
  }
}