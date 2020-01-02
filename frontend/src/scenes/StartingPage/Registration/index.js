import React from 'react';
import { connect } from 'react-redux';
import { registration } from '../../../store/actions/user';
import { addMessage } from '../../../store/actions/main';
import Avatar from '../Avatar';
import Column from '../../../components/Column';
import RegistrationForm from './RegistrationForm';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
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
    const { firstName, lastName, email, password } = this.state;
    const { registration, addMessage } = this.props;
    registration(firstName, lastName, email, password, this.props)
      .then(() => {
        this.props.history.push('/add-new-thing');
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
                <h3 className="title has-text-grey">Registration</h3>
                <div className="box">
                  <Avatar />
                  <RegistrationForm onChange={this.onChange} onSubmit={this.onSubmit}/>
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
  registration: (firstName, lastName, email, password, props) =>
    dispatch(registration(firstName, lastName, email, password, props)),
  addMessage: (text) => dispatch(addMessage(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
