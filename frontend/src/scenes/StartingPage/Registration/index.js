import React from 'react';
import { connect } from 'react-redux';
import { registration } from '../../../store/actions/user';
import { addMessage } from '../../../store/actions/main';
import Column from '../../../components/Columns/Column';
import ColumnsSentered from '../../../components/Columns/ColumnsSentered';
import Box from '../../../components/Box';
import Title2, { greyText } from '../../../components/Titles/Title2';
import Hero, { fullheight } from '../../../components/Hero';
import Avatar from '../Avatar';
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
    const { registration, addMessage, history } = this.props;
    registration(firstName, lastName, email, password)
      .then(() => {
        history.push('/add-new-thing');
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 401) {
          addMessage({ text: data });
        } else {
          addMessage({ text: 'Something is wrang. Try again or contact technical support.' });
        }
      });
  }

  render() {
    return (
      <ColumnsSentered>
        <Column>
          <Hero className={fullheight}>
            <Title2 className={greyText}>Registration</Title2>
            <Box>
              <Avatar />
              <RegistrationForm onChange={this.onChange} onSubmit={this.onSubmit} />
            </Box>
          </Hero>
        </Column>
      </ColumnsSentered>
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
