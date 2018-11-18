import React, { Component } from 'react';
// import CountDown from './CountDown.jsx';
import Header from './Header.jsx';
import './App.css';
import Board from './Board.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiView: true,
      gameNumber: 1
    }
    this.handleGameButton = this.handleGameButton.bind(this);
  }

  handleGameButton(e) {
    const gameNumber = +e.target.textContent.split(' ')[1];
    const multiView = !this.state.multiView
    this.setState({
      multiView,
      gameNumber,
    });
  }

  render() {
    const singleView = <Board gameNumber={this.state.gameNumber} />
    const multiView =
    <div className="multi-board">
      <Board gameNumber={1} />
      <Board gameNumber={2} />
      <Board gameNumber={3} />
      <Board gameNumber={4} />
    </div>
    const view = singleView
    return (
      <div className="App">
        <Header
          handleButton={this.handleGameButton}
          />
        {view}
      </div>
    );
  }
}

export default App;
