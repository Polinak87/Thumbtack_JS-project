import React from 'react';
import './styles/components/App.scss';
import Routers from './Routers';
import NavBar from './scenes/navbar/Navbar';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <NavBar/>
        <Routers />
      </div>
    );
  }
}

export default App;