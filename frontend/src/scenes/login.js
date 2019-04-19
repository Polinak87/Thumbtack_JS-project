import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleClick() {
    event.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    axios.post('/api/login', { email, password })
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
                      <h3 className="title has-text-grey">Login</h3>
                      <div className="box">
                          <figure className="avatar">
                              <img src="https://placehold.it/128x128" />
                          </figure>
                          <form>
                              <div className="field">
                                  <div className="control">
                                      <input className="input is-large" type="email" placeholder="Your Email" onChange={this.handleChangeEmail} value={this.state.email} autoFocus="" />
                                  </div>
                              </div>
                              <div className="field">
                                  <div className="control">
                                      <input className="input is-large" type="password" onChange={this.handleChangePassword} value={this.state.password} placeholder="Your Password" />
                                  </div>
                              </div>
                              <button className="button is-block is-success is-large is-fullwidth" onClick={this.handleClick}>Login</button>
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
