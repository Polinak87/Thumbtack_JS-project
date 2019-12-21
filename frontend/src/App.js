import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import './styles/components/App.scss';
import Routers from './Routers';
import NavBar from './scenes/navbar';
import Infomessage from '../src/components/InfoMessage';
import { getCurrentUser } from './store/actions/user';

class App extends React.Component {

  componentDidMount() {
    const { user, getCurrentUser } = this.props;
    if (isEmpty(user)) {
      getCurrentUser();
    }
  }

  render() {
    return (
      <div className='app'>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);