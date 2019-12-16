import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import store from '../../store/index';
import { addUser } from '../../store/actions/user';
import { addMessage } from '../../store/actions/message';
import { deleteMessage } from '../../store/actions/message';
import Infomessage from '../../components/InfoMessage';
import ButtonSubmit from '../../components/ButtonSubmit';
import FormField from '../../components/FormField';
import Avatar from './Avatar';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.OnClick = this.OnClick.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    axios
      .post('/api/registration', { firstName, lastName, email, password })
      .then(response => {
        if (response && response.status === 200) {
          store.dispatch(addUser(response.data));
          this.props.history.push('/profile');
        }
      })
      .catch(function(error) {
        if (error.response.status === 401) {
          store.dispatch(addMessage({ messageText: error.response.data }));
        } else {
          store.dispatch(
            addMessage({
              messageText: 'Something is wrang. Try again or contact technical support.',
            }),
          );
        }
      });
  }

  OnClick() {
    event.preventDefault();
    store.dispatch(deleteMessage());
  }

  render() {
    let infoMessage;
    let urlForRedirect = '/registration';

    if (_.isEmpty(this.props.message)) {
      infoMessage = null;
    } else {
      infoMessage = (
        <Infomessage
          text={this.props.message.messageText}
          urlForRedirect={urlForRedirect}
          OnClick={this.OnClick}
        />
      );
    }

    return (
      <div>
        <section className="hero is-success is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-grey">Registration</h3>
                <div className="box">
                  <Avatar/>
                  <form className="" onSubmit={this.handleSubmit}>
                    <FormField
                      type="text"
                      name="First name"
                      placeholder="First name"
                      onChange={this.handleChangeFirstName}
                      value={this.state.firstName}
                    />
                    <FormField
                      type="text"
                      name="Last name"
                      placeholder="Last name"
                      onChange={this.handleChangeLastName}
                      value={this.state.lastName}
                    />
                    <FormField
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChangeEmail}
                      value={this.state.email}
                    />
                    <FormField
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChangePassword}
                      value={this.state.password}
                    />
                    <ButtonSubmit value="Register" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {infoMessage}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps)(Registration);
