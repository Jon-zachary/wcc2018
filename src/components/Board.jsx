import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import MoveList from './MoveList';
import Info from './Info';
import GameHeader from './GameHeader';
import Eval from './Eval';
import Variation from './Variation'
import AllGames from '../games/AllGames'

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMovHidden:false,
      isInfoHidden: false,
      isVarHidden: false,
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
  }

  componentDidMount() {
    this.updateGame(this.props.gameNumber);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameNumber !== this.props.gameNumber) {
      this.updateGame(this.props.gameNumber);
    }
  }

  updateGame = (gameNumber) =>{
    const game = new Chess();
    const pgnString = AllGames[gameNumber - 1]
    game.load_pgn(pgnString);
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

  handleEval = (e) => {
    this.setState({
      isEval: !this.state.isEval,
    });
  }


 handleInc = (e) => {
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

  handleDec = (e) => {
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

  handleSlide = (e) => {
    this.setState({
      evalDepth: e.target.value,
    })
  }

  handleFlip = (e) => {
    const side = (this.state.orientation === 'white') ? 'black' : 'white'
    this.setState({
      orientation: side,
    })
  }

  handleReset = (e) => {
    const game = new Chess();
    const fen = game.fen();
    this.setState({
      game,
      currentMove: 0,
      fen,
    })
  }

  handleFinal = (e) => {
    const game = new Chess();
    const pgnString = AllGames[this.props.gameNumber - 1]
    game.load_pgn(pgnString);
    game.load_pgn(pgnString);
    const fen = game.fen();
    this.setState({
      game,
      fen
    })
  }

  handleMoveClick = (evt, index) => {
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

  handleDrop = ({sourceSquare, targetSquare, piece}) => {
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

  handleBackClick = () => {
    const currentMove = this.state.currentMove;
    const game = new Chess();
    const moves = this.state.moves.slice(0, currentMove);
    moves.forEach(move => game.move(move))
    const fen = game.fen()
    this.setState({
      fen,
      varMoves: []
    })
  }

  hideFrame = () => {
    this.setState((prevState) => {
      return {
        isVarHidden: !prevState.isVarHidden,
      }
    })
  }

  hideMovFrame = () => {
    this.setState((prevState) => {
      return {
        isMovHidden: !prevState.isMovHidden
      }
    })
  }

  hideInfoFrame = () => {
    this.setState((prevState) => {
      return {
        isInfoHidden: !prevState.isInfoHidden
      }
    })
  }

  render() {
    return (
      <div className="main-body-container">
        <div className = 'column'>
        <Variation
          varMoves={this.state.varMoves}
          start={this.state.currentMove}
          handleBack={this.handleBackClick}
          isVarHidden={this.state.isVarHidden}
          hideFrame={this.hideFrame}
          />
        <MoveList
          moves={this.state.moves}
          handleMoveClick={this.handleMoveClick}
          getResult={this.getResult}
          currentMove={this.state.currentMove}
          title={"Move List"}
          showTitle={true}
          gameInfo={this.state.gameInfo}
          hideMovFrame={this.hideMovFrame}
          isMovHidden={this.state.isMovHidden}
        />
      </div>
        <div className = "board-container">
        <GameHeader
          gameInfo={this.state.gameInfo}
        />
        <Chessboard
          id={this.props.gameNumber}
          draggable={true}
          transitionDuration={0}
          position={this.state.fen}
          orientation={this.state.orientation}
          undo={true}
          width={420}
          onDrop={this.handleDrop}
        />
      <div className = "board-buttons">
          <button onClick={this.handleReset}> Reset</button>
          <button onClick={this.handleDec}> Prev </button>
          <button onClick={this.handleInc}> Next </button>
          <button onClick={this.handleFinal}> Final </button>
          <button onClick={this.handleFlip}>Flip</button>
        </div>
        </div>
      <div className="column">
        <Eval
          moves={this.state.moves}
          varMoves={this.state.varMoves}
          fen={this.state.fen}
          currentMove={this.state.currentMove}
          handleMoveClick={this.handleMoveClick}
          />
        <Info
          gameInfo={this.state.gameInfo}
          hideInfoFrame={this.hideInfoFrame}
          isInfoHidden={this.state.isInfoHidden}
          />
        </div>
      </div>
    );
  }
}

export default Board;
