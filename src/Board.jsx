import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import Eval from './Eval.jsx'
import Slider from './Slider.jsx';
import MoveList from './MoveList.jsx';
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
      isEval: false,
      evalDepth: 5,
      fen: null,
    }
    this.handleInc = this.handleInc.bind(this);
    this.handleDec = this.handleDec.bind(this);
    this.handleFlip = this.handleFlip.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleFinal = this.handleFinal.bind(this);
    this.handleEval = this.handleEval.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
    this.handleMoveClick = this.handleMoveClick.bind(this);
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
    const fen = game.fen();
    this.setState({
      game,
      moves,
      fen,
    })
  }

  handleEval(e) {
    this.setState({
      isEval: !this.state.isEval,
    });
  }


 handleInc(e) {
    const currentMove = this.state.currentMove + 1;
    const game = new Chess();
    const moves = this.state.moves.slice(0, currentMove);
    moves.forEach(move => game.move(move))
    const fen = game.fen();
    this.setState({
      game,
      currentMove,
      fen,
    })
  }

  handleDec(e) {
    const currentMove = this.state.currentMove - 1;
    const game = new Chess();
    const moves = this.state.moves.slice(0, currentMove);
    moves.forEach(move => game.move(move))
    const fen = game.fen();
    this.setState({
      game,
      currentMove,
      fen,
    })
  }

  handleSlide(e) {
    this.setState({
      evalDepth: e.target.value,
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
    const fen = game.fen();
    this.setState({
      game,
      currentMove: 0,
      fen,
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
    const fen = game.fen();
    this.setState({
      game,
      fen
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
    const fen = game.fen()
    this.setState({
      game,
      currentMove: index,
      fen,
    })
  }


  render() {
    return (
      <div>
      <div className="Board">
        <MoveList
          moves={this.state.moves}
          handleMoveClick={this.handleMoveClick}
          getResult={this.getResult}
        />
        <Eval
        fen={this.state.fen}
        depth={this.state.evalDepth}
        isEval={this.state.isEval}
        />
        <div className = "board-container">
        <Slider
          min={5}
          max={25}
          step={1}
          onChange={this.handleSlide}
          val={this.state.evalDepth}
          />
        <h1 className="game-header">Game {this.props.gameNumber}</h1>
        <Chessboard
          id={this.props.gameNumber}
          draggable={true}
          position={this.state.fen}
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
            <button className="eval" onClick={this.handleEval}>Eval</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Board;
