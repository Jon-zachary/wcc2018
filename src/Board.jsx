import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import Eval from './Eval.jsx'
import MoveList from './MoveList.jsx';
import Info from './Info.jsx';
import GameHeader from './GameHeader.jsx';
import game1 from './game1';
import game2 from './game2';
import game3 from './game3';
import game4 from './game4';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: null,
      gameInfo: null,
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
    this.updateGame = this.updateGame.bind(this);
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
    }
    game.load_pgn(gameObj[pgnString]);
    const moves = game.history();
    const fen = new Chess().fen();
    this.setState({
      gameInfo: game.header(),
      game,
      moves,
      fen,
      currentMove: 0,
      isEval: false,
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


  render() {
    return (
      <div className="game-container">
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

        <div className = "board-container">
        <GameHeader
          gameInfo={this.state.gameInfo}
          />
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
          width={500}
          />
        </div>

        <Eval
        fen={this.state.fen}
        depth={this.state.evalDepth}
        isEval={this.state.isEval}
        handleSlide={this.handleSlide}
        getResult={this.getResult}
        handleMoveClick={this.handleMoveClick}
        currentMove={this.state.currentMove}
        moves={this.state.moves}
        />
      <Info
        gameInfo={this.state.gameInfo}
        />
      </div>
    );
  }
}

export default Board;
