import React from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx'

const Board = (props) => {
  const {fen, gameNumber, handleDec, handleInc, getLegalMoves, onDrop,
    handleExitVariation} = props;
  return (
    <div>
    <Chessboard
      id={gameNumber}
      position={fen}
      transitionDuration={0}
      width={400}
      undo={true}
      onSquareClick={getLegalMoves}
      onDrop={onDrop}
      />
    <div className="button-wrapper">
    <button onClick={handleInc}> + </button>
    <button onClick={handleDec}> - </button>
    <button onClick={handleExitVariation}> Back to Mainline</button>
    </div>
    </div>
  )
}

export default Board;
