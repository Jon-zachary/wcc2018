import React, { Component } from 'react';
import CountDown from './CountDown.jsx';
import Header from './Header.jsx';
import './App.css';
import Board from './Board.jsx';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="App">
        <Header />
        <Board gameNumber={1}/>
        <Board gameNumber={2}/>
      </div>
    );
  }
}

export default App;
