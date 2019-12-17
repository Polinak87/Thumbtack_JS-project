import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import store from '../../store/index';
import { addUser } from '../../store/actions/user';
import { addMessage } from '../../store/actions/message';
import FormField from '../../components/FormField';
import ButtonSubmit from '../../components/ButtonSubmit';
import Avatar from './Avatar';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    axios
      .post('/api/login', { email, password })
      .then(response => {
        if (response && response.status === 200) {
          store.dispatch(addUser(response.data));
          this.props.history.push('/profile');
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          store.dispatch(addMessage({ text: error.response.data }));
        } else {
          store.dispatch(addMessage({ text: 'Something is wrang. Try again or contact technical support.' }));
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
                  <Avatar />
                  <form className="" onSubmit={this.handleSubmit}>
                    <FormField
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                    <FormField
                      type="password"
                      name="password"
                      placeholder="Your Password"
                      onChange={this.onChange}
                      value={this.state.password}
                    />
                    <ButtonSubmit value="Log in" />
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

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps)(Login);
