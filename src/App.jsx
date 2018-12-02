import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';
import Board from './components/Board';
import GameList from './components/GameList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameNumber: 1,
      isGameList: false,
    }
  }

  handleGameButton = (e) => {
  e.preventDefault();
  const gameNumber = +e.target.textContent.split(' ')[1];
   this.setState({
     isGameList: !this.state.isGameList,
     gameNumber,
   });
  }

  handleGameList = (e) => {
    console.log('clicked');
    this.setState({
      isGameList: !this.state.isGameList
    })
  }

  render() {
    return (
      <div className="App">
        <Header
          handleButton={this.handleGameButton}
          handleMenuClick={this.handleGameList}
          isGameList={this.state.isGameList}
          />
        <GameList
          handleButton={this.handleGameButton}
          isGameList={this.state.isGameList}
           />
        <Board
          gameNumber={this.state.gameNumber}
          handleGameChange={this.handleGameButton}
          />
        <div className={(this.state.isGameList) ? "page-mask" : ""}></div>
      </div>
    );
  }
}

export default App;
