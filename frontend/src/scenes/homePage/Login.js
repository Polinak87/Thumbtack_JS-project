import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import store from '../../store/index';
import { addUser } from '../../store/actions/user';
import { addMessage } from '../../store/actions/message';
import { deleteMessage } from '../../store/actions/message';
import Infomessage from '../../components/InfoMessage';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.OnClick = this.OnClick.bind(this);
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
        if (response && response.status === 200) {
          store.dispatch(addUser(response.data));
          this.props.history.push("/profile");
        }
      })
      .catch(function (error) {
        if(error.response.status === 401) {
          store.dispatch(addMessage({messageText: error.response.data}));
        } else {
          store.dispatch(addMessage({messageText: 'Something is wrang. Try again or contact technical support.'}));
        }
      });
  }

  OnClick() {
    event.preventDefault();
    store.dispatch(deleteMessage());
  }

  render() {

    let infoMessage;
    let urlForRedirect = '/login';

    if(_.isEmpty(this.props.message)) {
      infoMessage = null;
    } else {
      infoMessage = <Infomessage 
                      text={ this.props.message.messageText }
                      urlForRedirect={urlForRedirect}
                      OnClick={this.OnClick}/>
    }

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
        {infoMessage}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps)(Login);
