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
        const { pathname } = this.props.location;
        const isRedirectPathname = ['/login', '/home', '/registration'];
        if (!isRedirectPathname.includes(pathname)) {
          this.props.history.push('/home');
        }
      });
    }
  }

  render() {
    return (
      <div className="app">
        <NavBar />
        <Routers />
        {!isEmpty(this.props.message) && <Infomessage />}
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
  dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
