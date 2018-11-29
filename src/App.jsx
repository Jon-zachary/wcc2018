import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';
import Board from './components/Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameNumber: 1,
    }
  }

  handleGameButton = (e) => {
  const gameNumber = +e.target.textContent.split(' ')[1];
   this.setState({
     gameNumber,
   });
  }

  render() {
    return (
      <div className="App">
        <Header
          handleButton={this.handleGameButton}
          />
        <Board
          gameNumber={this.state.gameNumber}
          handleGameChange={this.handleGameButton}
          />
      </div>
    );
  }
}

export default App;
