import React, { Component } from 'react';
import CountDown from './CountDown.jsx';
import Header from './Header.jsx';
import './App.css';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="App">
        <Header />
        <CountDown />
      </div>
    );
  }
}

export default App;
