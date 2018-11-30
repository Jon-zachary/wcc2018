import React from 'react';
import StyledMoves from './StyledMoves';

const MoveList = (props) => {

  const {gameInfo, currentMove, moves} = props;
  const result = (gameInfo) ? gameInfo.Result : '';
  return(
      <span>
        <StyledMoves
          varMoves={[]}
          mainMoves={moves}
          currentMove={currentMove}
          handleMoveClick={props.handleMoveClick}
          />
         {result}
       </span>
  )
}

export default MoveList;
