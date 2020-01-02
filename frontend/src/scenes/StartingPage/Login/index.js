import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../../store/actions/user';
import Avatar from '../Avatar';
import Column from '../../../components/Column';
import { addMessage } from '../../../store/actions/main';
import LoginForm from './LoginForm';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const { login, addMessage } = this.props;

    login(email, password, this.props).then(() => {
      this.props.history.push('/profile');
    })
      .catch(function (error) {
        if (error.response.status === 401) {
          addMessage({ text: error.response.data });
        } else {
          addMessage({ text: 'Something is wrang. Try again or contact technical support.' });
        }
      });
  }

  render() {
    return (
      <div className="columns is-centered">
        <Column>
          <section className="hero is-success is-fullheight">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h3 className="title has-text-grey">Login</h3>
                <div className="box">
                  <Avatar />
                  <LoginForm onSubmit={this.onSubmit} onChange={this.onChange}/>
                </div>
              </div>
            </div>
          </section>
        </Column>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password, props) => dispatch(login(email, password, props)),
  addMessage: (text) => dispatch(addMessage(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
