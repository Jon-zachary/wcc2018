import React, { Component } from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import MoveList from './MoveList.jsx';
import Info from './Info.jsx';
import GameHeader from './GameHeader.jsx';
import Eval2 from './Eval2.jsx';
import Variation from './Variation'
import AllGames from './games/AllGames'

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    this.handleBackClick = this.handleBackClick.bind(this);
    this.hideFrame = this.hideFrame.bind(this);
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
    const pgnString = AllGames[this.props.gameNumber - 1]
    game.load_pgn(pgnString);
    game.load_pgn(pgnString);
    const fen = game.fen();
    this.setState({
      game,
      fen
    })
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

handleBackClick() {
  const currentMove = this.state.currentMove + 1;
  const game = new Chess();
  const moves = this.state.moves.slice(0, currentMove);
  moves.forEach(move => game.move(move))
  const fen = game.fen()
  this.setState({
    fen,
    varMoves: []
  })
}

hideFrame() {
  this.setState((prevState) => {
    return {
      isVarHidden: !prevState.isVarHidden,
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
          start={0}
          showTitle={true}
          handleInc={this.handleInc}
          handleDec={this.handleDec}
          handleReset={this.handleReset}
          handleFinal={this.handleFinal}
          handleFlip={this.handleFlip}
          gameInfo={this.state.gameInfo}
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
