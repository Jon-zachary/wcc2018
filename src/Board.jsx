import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import game1 from './game1';
import game2 from './game2';
import game3 from './game3';
import game4 from './game4';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: null,
      currentMove: 0,
      moves: [],
      orientation: 'white',
    }
    this.handleInc = this.handleInc.bind(this);
    this.handleDec = this.handleDec.bind(this);
    this.handleFlip = this.handleFlip.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleFinal = this.handleFinal.bind(this);
    // this.handleMoveClick = this.handleMoveClick.bind(this);
  }

  componentDidMount() {
    const game = new Chess();
    const pgnString = `game${this.props.gameNumber}`
    const gameObj = {
      game1,
      game2,
      game3,
      game4,
    }
    game.load_pgn(gameObj[pgnString]);
    const moves = game.history();
    game.reset()
    this.setState({
      game,
      moves,
    })
  }


 handleInc(e) {
    const currentMove = this.state.currentMove + 1;
    const game = new Chess();
    const moves = this.state.moves.slice(0, currentMove);
    moves.forEach(move => game.move(move))
    this.setState({
      game,
      currentMove,
    })
  }

  handleDec(e) {
    const currentMove = this.state.currentMove - 1;
    const game = new Chess();
    const moves = this.state.moves.slice(0, currentMove);
    moves.forEach(move => game.move(move))
    this.setState({
      game,
      currentMove,
    })
  }


  handleFlip(e) {
    const side = (this.state.orientation === 'white') ? 'black' : 'white'
    this.setState({
      orientation: side,
    })
  }

  handleReset(e) {
    const game = new Chess();
    this.setState({
      game,
      currentMove: 0,
    })
  }

  handleFinal(e) {
    const game = new Chess();
    const pgnString = `game${this.props.gameNumber}`
    const gameObj = {
      game1,
      game2,
      game3,
      game4,
    }
    game.load_pgn(gameObj[pgnString]);
    this.setState({
      game
    })
  }

  getResult() {
    const moves = game1.split(" ");
    const result = moves[moves.length - 1];
    return result;
  }

  handleMoveClick(evt, index) {
    evt.target.classList.add('highlight')
    console.log(evt.target.classList)
    const game = new Chess();
    const moves = this.state.moves.slice(0, index);
    moves.forEach(move => game.move(move))
    this.setState({
      game,
      currentMove: index
    })
  }


  render() {
    const fen = (this.state.game) ? this.state.game.fen() : new Chess().fen();
    return (
      <div>
      <div className="Board">
        <div className="movelist">
          {this.state.moves.map((move, i , self) => {
            const white = i + 1;
            const black = i + 2;
            if(i % 2 === 0) {
            return (
              <span key={i}>
                <span>{Math.floor(i / 2) + 1}: </span><span className="link-button" onClick={(evt) => this.handleMoveClick(evt,white)}>{move}</span>
                <span>&nbsp;&nbsp;</span>
                <span className="link-button" onClick={(evt) => this.handleMoveClick(evt,black)}>{self[i + 1]}</span>
              </span>
              )
            }
            return undefined;
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
            <button className="final" onClick={this.handleFinal}>Final</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Board;
