import React from 'react';
import axios from 'axios';
import ThingInfo from '../../../components/thingInfo';
import ButtonCancel from './buttonCancel';

export default class ApplicationOutbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Map(),
    }
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    axios.get('/api/applicationOutbox')
      .then((response) => {
        console.log(response.data);
        var map = this.state.value;
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        this.setState({ value: map });
      });
  }

  updateData(id, status) {
    let { value } = this.state;
    let application = value.get(id);
    application.status = status;
    value.set(id, application);
    this.setState({ value });
    console.log(this.state.value);
  };

  render() {

    let cardList = [];
    for (let application of this.state.value.values()) {
      const { id, ThingDesired, ThingOffered, status } = application;
      const button = () => {
        if(status == "pending") {
          return <ButtonCancel id={id} updateData={this.updateData}/>
        }
        return <></>
      }
      cardList.push(
        <div className="column is-one-third" key={id}>
          <div className="card" >
            <div className="card-content">
              <h6 className="title">
                Status of application: {status}
              </h6>
            </div>
            <footer className="card-footer">
              <div className="card-footer-item">
                <div className="card-is-full">
                  <p>Thing you want to have</p>
                  <br />
                  <ThingInfo
                    id={ThingDesired.id}
                    name={ThingDesired.name}
                    description={ThingDesired.description}
                    categoryName={ThingDesired.Category.name} />
                </div>
              </div>
              <div className="card-footer-item">
                <div className="card-is-full">
                  <p>Thing you want to change</p>
                  <br />
                  <ThingInfo
                    id={ThingOffered.id}
                    name={ThingOffered.name}
                    description={ThingOffered.description}
                    categoryName={ThingOffered.Category.name} />
                </div>
              </div>
            </footer>
            {button()}
          </div>
        </div>
      )
    };
    return (
      <div>
        <br />
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Your outbox applications
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="columns is-multiline">
            {cardList}
          </div>
        </section>
      </div >
    )
  }
}
