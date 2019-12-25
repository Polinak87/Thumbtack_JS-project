import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../../store/actions/user';
import FormField from '../../../components/FormField';
import Button, { green, large } from '../../../components/Button';
import Avatar from '../Avatar';
import Column from '../../../components/Column';

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
    const { login } = this.props;
    login(email, password, this.props);
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
                  <form className="" name="LoginForm" onSubmit={this.handleSubmit}>
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
                    <Button className={large + " " + green} type="submit" value="Log in" />
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
  login: (email, password, props) => dispatch(login(email, password, props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
