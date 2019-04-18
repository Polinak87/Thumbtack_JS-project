import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName:'',
      email: '',
      password: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeFirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleClick() {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    console.log(firstName, lastName, email, password);
    axios.post('/api/registration', { firstName, lastName, email, password })
      .then((response) => {
        console.log(response);
        // this.setState({ value: response.data })
      });
  }

  render() {
    return (
      <div>
        {/* <h3>{this.state.value}</h3> */}
        <section className="hero is-success is-fullheight">
          <div className="hero-body">
              <div className="container has-text-centered">
                  <div className="column is-4 is-offset-4">
                      <h3 className="title has-text-grey">Registration</h3>
                      <div className="box">
                          <figure className="avatar">
                              <img src="https://placehold.it/128x128" />
                          </figure>
                          <form>
                          <div className="field">
                                  <div className="control1">
                                      <input className="input is-large" type="text" onChange={this.handleChangeFirstName} value={this.state.firstName} placeholder="First name" />
                                  </div>
                              </div>
                              <div className="field">
                                  <div className="control2">
                                      <input className="input is-large" type="text" onChange={this.handleChangeLastName} value={this.state.lastName} placeholder="Last name" />
                                  </div>
                              </div>
                              <div className="field">
                                  <div className="control3">
                                      <input className="input is-large" type="email" placeholder="Email" onChange={this.handleChangeEmail} value={this.state.email} />
                                  </div>
                              </div>
                              <div className="field">
                                  <div className="control4">
                                      <input className="input is-large" type="password" onChange={this.handleChangePassword} value={this.state.password} placeholder="Password" />
                                  </div>
                              </div>
                              <button className="button is-block is-success is-large is-fullwidth" onClick={this.handleClick}>Register</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      </div>
    );
  }
}
