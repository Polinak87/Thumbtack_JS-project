import React from 'react';
import axios from 'axios';
import store from '../../store/index';
import { addUser } from '../../store/actions/user';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    axios.post('/api/login', { email, password })
      .then((response) => {
        console.log(response);
        if (response && response.status === 200) {
          store.dispatch(addUser(response.data));
          this.props.history.push("/profile");
        }
      });
  }

  render() {
    return (
      <div>
        <section className="hero is-success is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-grey">Login</h3>
                <div className="box">
                  <figure className="avatar">
                    <img src="https://placehold.it/128x128" />
                  </figure>
                  <form className="" onSubmit={this.handleSubmit}>
                    <div className="field">
                      <div className="control">
                        <input className="input is-large" type="email" placeholder="Your Email" required autoFocus onChange={this.handleChangeEmail} value={this.state.email} />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input className="input is-large" type="password" placeholder="Your Password" required onChange={this.handleChangePassword} value={this.state.password} />
                      </div>
                    </div>
                    <input className="button is-block is-success is-large is-fullwidth" type="submit" value="Log in"/>
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