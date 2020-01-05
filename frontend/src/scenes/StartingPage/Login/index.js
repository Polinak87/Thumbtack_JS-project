import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../../store/actions/user';
import { addMessage } from '../../../store/actions/main';
import Column from '../../../components/Columns/Column';
import ColumnsSentered from '../../../components/Columns/ColumnsSentered';
import Box from '../../../components/Box';
import Title2, {greyText} from '../../../components/Titles/Title2';
import Hero, { fullheight } from '../../../components/Hero';
import Avatar from '../../../components/Avatar';
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
    const { login, addMessage, history } = this.props;

    login(email, password).then(() => {
      history.push('/profile');
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
          <Title2 className={greyText}>Login</Title2>
            <Box>
              <Avatar />
              <LoginForm onSubmit={this.onSubmit} onChange={this.onChange} />
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
  login: (email, password, props) => dispatch(login(email, password, props)),
  addMessage: (text) => dispatch(addMessage(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
