import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import './styles/components/App.scss';
import Routers from './Routers';
import NavBar from './scenes/navbar/Navbar';
import Infomessage from '../src/components/InfoMessage';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <NavBar/>
        <Routers />
        {!isEmpty(this.props.message) &&
          <Infomessage/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.main.message,
});

export default connect(mapStateToProps)(App);