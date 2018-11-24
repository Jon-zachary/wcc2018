import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import MoveList from './MoveList.jsx';
import Info from './Info.jsx';
import GameHeader from './GameHeader.jsx';
import Eval2 from './Eval2.jsx';
import Variation from './Variation'

import game1 from './game1';
import game2 from './game2';
import game3 from './game3';
import game4 from './game4';
import game5 from './game5';
import game6 from './game6';
import game7 from './game7';
import game8 from './game8';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: null,
      gameInfo: null,
      currentMove: 0,
      moves: [],
      varMoves: [],
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
    this.updateGame = this.updateGame.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  componentDidMount() {
    this.updateGame(this.props.gameNumber);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameNumber !== this.props.gameNumber) {
      this.updateGame(this.props.gameNumber);
    }
  }

  updateGame(gameNumber) {
    const game = new Chess();
    const pgnString = `game${gameNumber}`
    const gameObj = {
      game1,
      game2,
      game3,
      game4,
      game5,
      game6,
      game7,
      game8,
    }
    game.load_pgn(gameObj[pgnString]);
    const moves = game.history();
    const movesVerbose = game.history({verbose: true})
    const fen = new Chess().fen();
    this.setState({
      gameInfo: game.header(),
      game,
      moves,
      movesVerbose,
      fen,
      currentMove: 0,
      isEval: false,
      varMoves:[],
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
// refactor
  handleFinal(e) {
    const game = new Chess();
    const pgnString = `game${this.props.gameNumber}`
    const gameObj = {
      game1,
      game2,
      game3,
      game4,
      game5,
      game6,
      game7,
      game8,
    }
    game.load_pgn(gameObj[pgnString]);
    const fen = game.fen();
    this.setState({
      game,
      fen
    })
  }
// refactor
  getResult() {
    const moves = game1.split(" ");
    const result = moves[moves.length - 1];
    return result;
  }

  handleMoveClick(evt, index) {
    const game = new Chess();
    const moves = this.state.moves.slice(0, index);
    moves.forEach(move => game.move(move))
    const fen = game.fen()
    this.setState((prevState) => {
      return ({
      game,
      currentMove: index,
      fen,
    })
  })
}

handleDrop({sourceSquare, targetSquare, piece}) {
  const game = new Chess(this.state.fen);
  game.move({
    to: targetSquare,
    from: sourceSquare,
  });
  this.setState((prevState) => {
    return {
    fen: game.fen(),
    varMoves: [...prevState.varMoves,...game.history()],
    }
  })
}



  render() {
    return (
      <div className="game-container">
        <div className = 'column'>
        <Variation
          varMoves={this.state.varMoves}
          start={this.state.currentMove}
          />
        <MoveList
          moves={this.state.moves}
          handleMoveClick={this.handleMoveClick}
          getResult={this.getResult}
          currentMove={this.state.currentMove}
          title={"Move List"}
          start={0}
          showTitle={true}
          handleInc={this.handleInc}
          handleDec={this.handleDec}
          handleReset={this.handleReset}
          handleFinal={this.handleFinal}
          handleFlip={this.handleFlip}
        />
      </div>
        <div className = "board-container">
        <GameHeader
          gameInfo={this.state.gameInfo}
          />
        <Chessboard
          id={this.props.gameNumber}
          draggable={true}
          position={this.state.fen}
          orientation={this.state.orientation}
          getPostion={position => console.log(position)}
          undo={true}
          width={420}
          onDrop={this.handleDrop}
          />
        </div>
      <div className="column">
        <Eval2
          moves={this.state.moves}
          movesVerbose={this.state.movesVerbose}
          fen={this.state.fen}
          currentMove={this.state.currentMove}
          handleMoveClick={this.handleMoveClick}
          />
        <Info
          gameInfo={this.state.gameInfo}
          />
        </div>
      </div>
    );
  }
}

export default Board;
