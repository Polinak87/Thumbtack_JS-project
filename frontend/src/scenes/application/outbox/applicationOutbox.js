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
    const status = 'pending';
    const idAnswer = '1';
    const nameAnswer = 'summer dress';
    const descriptionAnswer = 'pretty'
    const categoryNameAnswer = 'dresses'
    const idAuthor = '2';
    const nameAuthor = 'little blouse';
    const descriptionAuthor = 'pretty';
    const categoryNameAuthor = 'blouses';

    return (
      <div>
      <br/>
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
          <div className="column is-one-quarter" key={idAnswer}>
            <div className="card">
              <div className="card-content">
                <h6 className="title">
                  Status of application: {status}
                </h6>
              </div>
              <footer className="card-footer">
                {/* <div className="card-image">
                <figure className="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                </figure>
              </div> */}
                <div className="card-footer-item">
                  <div className="card-is-full">
                    <p>Thing you want to have</p>
                    <br/>
                    <ThingInfo
                      id={idAnswer}
                      name={nameAnswer}
                      description={descriptionAnswer}
                      categoryName={categoryNameAnswer} />
                  </div>
                </div>
                <div className="card-footer-item">
                  <div className="card-is-full">
                    <p>Thing you want to change</p>
                    <br/>
                    <ThingInfo
                      id={idAuthor}
                      name={nameAuthor}
                      description={descriptionAuthor}
                      categoryName={categoryNameAuthor} />
                  </div>
                </div>
              </footer>
              <ButtonCancel />
            </div>
          </div>
        </div>
      </section>
      </div>
    )
  }
}
