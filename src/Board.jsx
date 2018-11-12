import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import game1 from './game1';
import game2 from './game2';
import game3 from './game3';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: null,
      currentMove: null,
      moves: this.getMovelist(this.props.gameNumber),
      positions: this.allPositions(),
      orientation: 'white',
    }
    this.handleInc = this.handleInc.bind(this);
    this.handleDec = this.handleDec.bind(this);
    this.handleFlip = this.handleFlip.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleFinal = this.handleFinal.bind(this);
  }

  componentDidMount() {
    console.log(this)
    const game = new Chess();
    const pgnString = `game${this.props.gameNumber}`
    const gameObj = {
      game1,
      game2,
      game3,
    }
    game.load_pgn(gameObj[pgnString]);
    // game.reset();
    this.setState({
      game,
    })
  }

  allPositions() {
    const game = new Chess();
    const moves = this.getMovelist(this.props.gameNumber);
    const positions = moves.map((move, i) => {
      game.move(move);
      return game.fen();
    })
    return positions;
  }

  getMovelist(gameNumber) {
    if(this.props.gameNumber === 1) {
    const dummyGame = new Chess();
    dummyGame.load_pgn(game1);
    return dummyGame.history();
    }
    if(this.props.gameNumber === 2) {
      const dummyGame = new Chess();
      dummyGame.load_pgn(game2);
      return dummyGame.history();
    }
    if(this.props.gameNumber === 3) {
      const dummyGame = new Chess();
      dummyGame.load_pgn(game3);
      return dummyGame.history();
    }
  }

  handleInc(e) {
    this.setState (state => {
      return (
        {currentMove: (state.currentMove !== null) ? state.currentMove + 1 : 0}
      )
    });
  }

  handleDec(e) {
    this.setState (state => {
      return (
        {currentMove: state.currentMove - 1}
      )
    });
  }


  handleFlip(e) {
    const side = (this.state.orientation === 'white') ? 'black' : 'white'
    this.setState({
      orientation: side,
    })
  }

  handleReset(e) {
    this.setState({
      currentMove: null,
    })
  }

  handleFinal(e) {
    this.setState({
      currentMove: this.state.positions.length - 1,
    })
  }

  getResult() {
    const moves = game1.split(" ");
    const result = moves[moves.length - 1];
    return result;
  }


  render() {
    const fen = (this.state.currentMove !== null) ? this.state.positions[this.state.currentMove] :
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    return (
      <div>
      <div className="Board">
        <div className="movelist">
          {this.state.moves.map((move, i , self) => {
            if(i % 2 === 0) {
            return (
              <span key={i}>
                <span>{Math.floor(i / 2) + 1}: </span><span className="link-button" onClick={(e) => this.setState({currentMove: i})}>{move}</span>
                <span>&nbsp;&nbsp;</span>
                <span className="link-button" onClick={(e) => this.setState({currentMove: i + 1})}>{self[i + 1]}</span>
              </span>
              )
            }

          })}
          <span>{this.getResult()}</span>
        </div>
        <div className = "board-container">
        <h1 className="game-header">Game {this.props.gameNumber}</h1>
        <Chessboard
          id={this.props.gameNumber}
          draggable={true}
          position={fen}
          boardStyle={{
            marginBottom: "5px",
          }}
          transitionDuration={0}
          orientation={this.state.orientation}
          getPostion={position => console.log(position)}
          undo={true}
          width={300}
          />
          <div className="button-wrapper">
            <button className="inc" onClick={this.handleInc}> + </button>
            <button className="dec" onClick={this.handleDec}> - </button>
            <button className="reset" onClick={this.handleReset}>Reset</button>
            <button className="flipBoard" onClick={this.handleFlip}>Flip</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Board;
