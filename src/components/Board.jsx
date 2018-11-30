import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import MoveList from './MoveList';
import Info from './Info';
import GameHeader from './GameHeader';
import Eval from './Eval';
import Variation from './Variation';
import InfoCard from './InfoCard';
import AllGames from '../games/AllGames';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMovHidden:false,
      isInfoHidden: false,
      isVarHidden: false,
      isEvalHidden: false,
      game: null,
      gameInfo: null,
      currentMove: 0,
      moves: [],
      varMoves: [],
      orientation: 'white',
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
    const fen = new Chess().fen();
    this.setState({
      gameInfo: game.header(),
      game,
      moves,
      fen,
      currentMove: 0,
      varMoves:[],
    })
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

  // TODO: add support vor variation and eval panes
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

  hideVarFrame = () => {
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

  hideEvalFrame = (e) => {
    this.setState({
      isEvalHidden: !this.state.isEvalHidden,
    });
  }

  render() {
    return (
      <div className="main-body-container">
        <div className ="column-1">
        <InfoCard
          title={"Variation"}
          isHidden={this.state.isVarHidden}
          content={
            <Variation
            varMoves={this.state.varMoves}
            start={this.state.currentMove}
            />
          }
          buttonFunctions={{
            'hide': this.hideVarFrame,
            'Back to Main': this.handleBackClick
          }}
          />
        <InfoCard
          title={"Move List"}
          isHidden={this.state.isMovHidden}
          content={
        <MoveList
          moves={this.state.moves}
          handleMoveClick={this.handleMoveClick}
          getResult={this.getResult}
          currentMove={this.state.currentMove}
          gameInfo={this.state.gameInfo}
        />
      }
        buttonFunctions={{
          hide: this.hideMovFrame
        }}
      />

      </div>
        <div className="column-2">
        <div className="board-container">
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
        </div>
      <div className="column-3">
        <InfoCard
          title={"Evaluation"}
          isHidden={this.state.isEvalHidden}
          buttonFunctions={{
            'hide': this.hideEvalFrame,
          }}
          content={
            <Eval
            moves={this.state.moves}
            varMoves={this.state.varMoves}
            fen={this.state.fen}
            currentMove={this.state.currentMove}
            />
        }
          />
        <InfoCard
          title={"Game Information"}
          content={
            <Info
              gameInfo={this.state.gameInfo}
            />
          }
          isHidden={this.state.isInfoHidden}
          buttonFunctions={{
            'hide': this.hideInfoFrame
          }}
        />
        </div>
      </div>
    );
  }
}

export default Board;
