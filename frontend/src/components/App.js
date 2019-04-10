import React from 'react';
// import '../styles/components/App.css';

// import UserName from './UserName';
// import Thing from './things';

import MainRouter from './router'

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


