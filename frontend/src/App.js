import React from 'react';
import './styles/components/App.scss';
import MainRouter from './scenes/MainRouter'

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <MainRouter />
      </div>
    );
  }
}

export default App;