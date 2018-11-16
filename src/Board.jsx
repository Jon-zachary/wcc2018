import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import Eval from './Eval.jsx'
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
      worker: window['stockfish'],
      sfEval: 'evaluating position',
      evalDepth: 5,
    }
    this.handleInc = this.handleInc.bind(this);
    this.handleDec = this.handleDec.bind(this);
    this.handleFlip = this.handleFlip.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleFinal = this.handleFinal.bind(this);
    this.handleEval = this.handleEval.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.updateEval = this.updateEval.bind(this);
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

  updateEval(e) {
    this.setState({
      sfEval: e,
    })
  }

  handleEval(e) {
    this.setState({
      isEval: !this.state.isEval
    });
    // const game = new Chess();
    // const moves = this.state.moves.slice(0, this.state.currentMove);
    // moves.forEach(move => game.move(move))
    // const fen = game.fen();
    // const sf = this.state.worker;
    // sf.onmessage = (evt) => {
    //   if(evt.data.includes('pvSan')){
    //   const pvSan = evt.data.split("pvSan");
    //   console.log(pvSan);
    //   }
    // }
    // sf.postMessage(`position fen ${fen}`);
    // sf.postMessage(`go infinite`);
  }

  handleStop(e) {
    // sf.postMessage('stop');
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
    const sfEval = (this.state.isEval) ?
    <Eval fen={fen}
    sf={this.state.worker}
    updateEval={this.updateEval}
    sfEval={this.state.sfEval}
    depth={this.state.evalDepth}/> : "";
    return (
      <div>
      <div className="Board">
        <div className="movelist">
          {this.state.moves.map((move, i , self) => {
            const white = i + 1;
            const black = i + 2;
            const mvNum = Math.floor(i / 2) + 1
            if(i % 2 === 0) {
            return (
              <span key={i}>
                <span>{mvNum}: </span><span className="link-button" onClick={(evt) => this.handleMoveClick(evt,white)}>{move}</span>
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
        <input type="range" name="depth"
               max="25" min="5"step="1"
               defaultValue="5"
                >
        </input>
        <label for="depth">Eval Depth</label>
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
            <button className="eval" onClick={this.handleEval}>Eval</button>
            <button className="stop" onClick={this.handleStop}>Stop</button>
          </div>
          {sfEval}
        </div>
      </div>
    </div>
    );
  }
}

export default Board;
