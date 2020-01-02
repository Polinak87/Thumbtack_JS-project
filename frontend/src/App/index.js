import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import '../styles/components/App.scss';
import Routers from './Routers';
import NavBar from './Navbar';
import Infomessage from './InfoMessage';
import { getCurrentUser } from '../store/actions/user';

class App extends React.Component {
  componentDidMount() {
    const { user, getCurrentUser } = this.props;
    if (isEmpty(user)) {
      getCurrentUser().catch(error => {
        const { location, history } = this.props;
        const { pathname } = location;
        const isRedirectPathname = ['/login', '/home', '/registration'];
        if (!isRedirectPathname.includes(pathname)) {
          history.push('/home');
        }
      });
    }
  }

  render() {
    const { message } = this.props;
    return (
      <div className="app">
        <NavBar />
        <Routers />
        {!isEmpty(message) && <Infomessage />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.main.message,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
