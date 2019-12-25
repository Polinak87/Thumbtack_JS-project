import React from 'react';
import { connect } from 'react-redux';
import { registration } from '../../../store/actions/user';
import Button, { green, large } from '../../../components/Button';
import FormField from '../../../components/FormField';
import Avatar from '../Avatar';
import Column from '../../../components/Column';

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
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    const { registration } = this.props;
    registration(firstName, lastName, email, password, this.props);
    // делает переход даже в случае ошибки
    // .then(() => {
    //   this.props.history.push('/profile');
    // });
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
                  <form className="" name="RegistrationForm" onSubmit={this.handleSubmit}>
                    <FormField
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      onChange={this.onChange}
                      value={this.state.firstName}
                    />
                    <FormField
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      onChange={this.onChange}
                      value={this.state.lastName}
                    />
                    <FormField
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                    <FormField
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.onChange}
                      value={this.state.password}
                    />
                    <Button className={large + " " + green} type="submit" value="Register" />
                  </form>
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
  registration: (firstName, lastName, email, password, props) => dispatch(registration(firstName, lastName, email, password, props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
