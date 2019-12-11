import React from 'react';
import './styles/components/App.scss';
import MainRouter from './scenes/MainRouter';
import NavBar from './scenes/navbar/Navbar';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <NavBar/>
        <MainRouter />
      </div>
    );
  }
}

export default App;